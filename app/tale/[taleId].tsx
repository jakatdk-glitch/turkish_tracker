import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { Text, View, usePalette } from '@/components/Themed';
import SpeakButton from '@/components/SpeakButton';
import WordXrayModal from '@/components/WordXray';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';
import { findTale } from '@/data/tales';
import { addReviewWord, markTaleRead } from '@/db/queries';
import { speakTurkish, stopSpeaking } from '@/logic/tts';
import { cleanToken } from '@/logic/wordXray';
import { todayStr } from '@/logic/streak';

export default function TaleScreen() {
  const { taleId } = useLocalSearchParams<{ taleId: string }>();
  const palette = usePalette();
  const tale = taleId ? findTale(taleId) : undefined;

  const [showTranslation, setShowTranslation] = useState(true);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [reading, setReading] = useState(false);
  const [added, setAdded] = useState(false);
  const [xrayWord, setXrayWord] = useState<string | null>(null);
  const cancelled = useRef(false);

  useEffect(() => {
    if (taleId) markTaleRead(taleId, todayStr());
  }, [taleId]);

  // Останавливаем озвучку при уходе с экрана.
  useEffect(() => {
    cancelled.current = false;
    return () => {
      cancelled.current = true;
      stopSpeaking();
    };
  }, []);

  const readAll = useCallback(() => {
    if (!tale) return;
    setReading(true);
    let i = 0;
    const speakNext = () => {
      if (cancelled.current || i >= tale.sentences.length) {
        setReading(false);
        setActiveIdx(-1);
        return;
      }
      setActiveIdx(i);
      speakTurkish(tale.sentences[i].tr, 0.9, () => {
        i += 1;
        speakNext();
      });
    };
    speakNext();
  }, [tale]);

  function stopReading() {
    stopSpeaking();
    setReading(false);
    setActiveIdx(-1);
  }

  async function addWordsToReview() {
    if (!tale) return;
    const today = todayStr();
    for (const w of tale.vocab) {
      await addReviewWord(w.tr, w.ru, today);
    }
    setAdded(true);
  }

  if (!tale) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Сказка не найдена</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {tale.emoji} {tale.title}
      </Text>
      <View style={styles.controls} lightColor="transparent" darkColor="transparent">
        <Text style={[styles.difficulty, { color: palette.textMuted }]}>
          {'⭐'.repeat(tale.difficulty)}
        </Text>
        <View style={styles.translationToggle} lightColor="transparent" darkColor="transparent">
          <Text style={[styles.toggleLabel, { color: palette.textMuted }]}>Перевод</Text>
          <Switch
            value={showTranslation}
            onValueChange={setShowTranslation}
            trackColor={{ true: palette.primary }}
          />
        </View>
      </View>

      <Text style={[styles.readHint, { color: palette.textMuted }]}>
        Нажми на любое слово — 🔬 рентген разберёт его на морфемы. Кнопка 🔊 озвучит
        предложение, кнопка ниже — всю сказку.
      </Text>

      <View style={styles.sentences} lightColor="transparent" darkColor="transparent">
        {tale.sentences.map((s, i) => (
          <View
            key={i}
            style={[
              styles.sentence,
              { backgroundColor: palette.surface },
              activeIdx === i && { borderColor: palette.primary, borderWidth: 2 },
            ]}
            lightColor="transparent"
            darkColor="transparent">
            <View style={styles.sentenceRow} lightColor="transparent" darkColor="transparent">
              <Text style={styles.sentenceTr}>
                {s.tr.split(' ').map((w, wi, arr) => (
                  <Text
                    key={wi}
                    suppressHighlighting
                    onPress={() => {
                      if (cleanToken(w)) setXrayWord(w);
                    }}>
                    {w + (wi < arr.length - 1 ? ' ' : '')}
                  </Text>
                ))}
              </Text>
              <SpeakButton text={s.tr} size="sm" />
            </View>
            {showTranslation && (
              <Text style={[styles.sentenceRu, { color: palette.textMuted }]}>{s.ru}</Text>
            )}
          </View>
        ))}
      </View>

      <Pressable
        style={[styles.readBtn, { backgroundColor: reading ? palette.surface : palette.primary }]}
        onPress={reading ? stopReading : readAll}>
        <Text
          style={[styles.readBtnText, { color: reading ? palette.text : palette.onPrimary }]}>
          {reading ? '⏸ Остановить' : '▶ Прослушать всю сказку'}
        </Text>
      </Pressable>

      <View style={[styles.vocabCard, { backgroundColor: palette.surface }]}>
        <Text style={styles.vocabTitle}>Слова из сказки</Text>
        {tale.vocab.map((w) => (
          <View key={w.tr} style={styles.vocabRow} lightColor="transparent" darkColor="transparent">
            <SpeakButton text={w.tr} size="sm" />
            <Text style={styles.vocabTr}>{w.tr}</Text>
            <Text style={[styles.vocabRu, { color: palette.textMuted }]}>{w.ru}</Text>
          </View>
        ))}
        {added ? (
          <View style={[styles.addedBadge, { borderColor: palette.success }]}>
            <Text style={[styles.addedText, { color: palette.success }]}>
              ✅ Добавлено в повторение
            </Text>
          </View>
        ) : (
          <Pressable
            style={[styles.addBtn, { backgroundColor: palette.primary }]}
            onPress={addWordsToReview}>
            <Text style={[styles.addBtnText, { color: palette.onPrimary }]}>
              Добавить слова в повторение
            </Text>
          </Pressable>
        )}
      </View>

      <WordXrayModal word={xrayWord} onClose={() => setXrayWord(null)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
  },
  title: {
    fontSize: FontSize.title,
    fontWeight: '700',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  difficulty: {
    fontSize: FontSize.body,
  },
  translationToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  toggleLabel: {
    fontSize: FontSize.body,
  },
  readHint: {
    fontSize: FontSize.caption,
    lineHeight: 18,
  },
  readBtn: {
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    alignItems: 'center',
  },
  readBtnText: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
  sentences: {
    gap: Spacing.sm,
  },
  sentence: {
    padding: Spacing.lg,
    borderRadius: Radius.md,
    gap: Spacing.xs,
  },
  sentenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  sentenceTr: {
    flex: 1,
    fontSize: FontSize.medium,
    fontWeight: '600',
    lineHeight: 23,
  },
  sentenceRu: {
    fontSize: FontSize.body,
    lineHeight: 20,
  },
  vocabCard: {
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    gap: Spacing.md,
  },
  vocabTitle: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
  vocabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  vocabTr: {
    flex: 1,
    fontSize: FontSize.medium,
    fontWeight: '600',
  },
  vocabRu: {
    flex: 1,
    fontSize: FontSize.body,
  },
  addBtn: {
    marginTop: Spacing.xs,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    alignItems: 'center',
  },
  addBtnText: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
  addedBadge: {
    marginTop: Spacing.xs,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  addedText: {
    fontSize: FontSize.medium,
    fontWeight: '600',
  },
});
