import { useMemo, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { Text, View, usePalette } from '@/components/Themed';
import FeedbackCard from '@/components/exercises/FeedbackCard';
import SpeakButton from '@/components/SpeakButton';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * «Собери слово»: к корню по порядку крепятся суффиксы-морфемы.
 * Дистракторы — те же суффиксы с нарушенной гармонией гласных,
 * поэтому упражнение тренирует именно механику языка, а не память.
 */
export default function MorphExercise({
  ru,
  rootText,
  rootRu,
  suffixes,
  distractors,
  explain,
  onResult,
}: {
  ru: string;
  rootText: string;
  rootRu: string;
  suffixes: string[];
  distractors: string[];
  explain?: string;
  onResult: (correct: boolean) => void;
}) {
  const palette = usePalette();
  // Банк индексов: суффикс может повторяться (evlerinde → …), поэтому не по строкам.
  const all = useMemo(() => [...suffixes, ...distractors], [suffixes, distractors]);
  const bank = useMemo(() => shuffle(all.map((s, i) => ({ s, i }))), [all]);
  const [selected, setSelected] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);

  const usedIds = new Set(selected);
  const answer = selected.map((id) => all[id]).join('');
  const correctWord = rootText + suffixes.join('');
  const isCorrect = answer === suffixes.join('');
  const canCheck = selected.length === suffixes.length;

  function pick(id: number) {
    if (checked || selected.length >= suffixes.length) return;
    setSelected((s) => [...s, id]);
  }

  function unpick(pos: number) {
    if (checked) return;
    setSelected((s) => s.filter((_, i) => i !== pos));
  }

  return (
    <View style={styles.container} lightColor="transparent" darkColor="transparent">
      <Text style={[styles.task, { color: palette.textMuted }]}>Собери слово из морфем</Text>
      <Text style={styles.ru}>{ru}</Text>

      {/* Живое слово: корень + выбранные суффиксы */}
      <View
        style={[
          styles.wordBox,
          {
            borderColor: checked ? (isCorrect ? palette.success : palette.danger) : palette.track,
          },
        ]}>
        <Text style={styles.word}>
          <Text style={styles.wordRoot}>{rootText}</Text>
          {selected.map((id, pos) => (
            <Text key={`${id}-${pos}`} style={[styles.wordSuffix, { color: palette.primary }]}>
              {all[id]}
            </Text>
          ))}
          {selected.length < suffixes.length && (
            <Text style={[styles.wordGap, { color: palette.textMuted }]}>
              {'·'.repeat(suffixes.length - selected.length)}
            </Text>
          )}
        </Text>
        {checked && <SpeakButton text={correctWord} size="sm" />}
      </View>

      {/* Выбранные морфемы: корень закреплён, суффиксы снимаются нажатием */}
      <View style={styles.chips} lightColor="transparent" darkColor="transparent">
        <View style={[styles.chip, styles.rootChip, { borderColor: palette.track }]}>
          <Text style={styles.chipText}>{rootText}</Text>
          <Text style={[styles.chipGloss, { color: palette.textMuted }]}>{rootRu}</Text>
        </View>
        {selected.map((id, pos) => (
          <Pressable
            key={`${id}-${pos}`}
            style={[styles.chip, { backgroundColor: palette.primary }]}
            onPress={() => unpick(pos)}>
            <Text style={[styles.chipText, { color: palette.onPrimary }]}>-{all[id]}</Text>
          </Pressable>
        ))}
      </View>

      {/* Банк суффиксов */}
      <View style={styles.chips} lightColor="transparent" darkColor="transparent">
        {bank.map(({ s, i }) => {
          const used = usedIds.has(i);
          return (
            <Pressable
              key={i}
              disabled={used || checked}
              style={[styles.chip, { backgroundColor: palette.surface }, used && styles.chipUsed]}
              onPress={() => pick(i)}>
              <Text style={styles.chipText}>-{s}</Text>
            </Pressable>
          );
        })}
      </View>

      {!checked ? (
        <Pressable
          style={[
            styles.actionBtn,
            { backgroundColor: canCheck ? palette.primary : palette.track },
          ]}
          disabled={!canCheck}
          onPress={() => setChecked(true)}>
          <Text style={[styles.actionBtnText, { color: palette.onPrimary }]}>Проверить</Text>
        </Pressable>
      ) : (
        <FeedbackCard
          correct={isCorrect}
          correctText={correctWord}
          explain={explain}
          onNext={() => onResult(isCorrect)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.lg,
  },
  task: {
    fontSize: FontSize.small,
    fontWeight: '600',
  },
  ru: {
    fontSize: FontSize.heading,
    fontWeight: '700',
  },
  wordBox: {
    minHeight: 64,
    borderRadius: Radius.md,
    borderWidth: 2,
    borderStyle: 'dashed',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  word: {
    fontSize: FontSize.word,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  wordRoot: {
    fontWeight: '700',
  },
  wordSuffix: {
    fontWeight: '700',
  },
  wordGap: {
    letterSpacing: 3,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  chip: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.sm,
    alignItems: 'center',
  },
  rootChip: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
  },
  chipUsed: {
    opacity: 0.3,
  },
  chipText: {
    fontSize: FontSize.medium,
    fontWeight: '600',
  },
  chipGloss: {
    fontSize: FontSize.caption,
  },
  actionBtn: {
    paddingVertical: Spacing.lg,
    borderRadius: Radius.md,
    alignItems: 'center',
  },
  actionBtnText: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
});
