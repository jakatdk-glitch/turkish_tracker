import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';

import { Text, View, usePalette } from '@/components/Themed';
import MorphExercise from '@/components/exercises/MorphExercise';
import SpeakButton from '@/components/SpeakButton';
import { XrayContent } from '@/components/WordXray';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';
import {
  buildWord,
  generateChallenge,
  MORPH_ROOTS,
  type CaseKey,
  type MorphChallenge,
  type MorphKind,
  type PersonKey,
} from '@/logic/morphology';

const PERSON_OPTIONS: { key: PersonKey | null; label: string }[] = [
  { key: null, label: '—' },
  { key: '1sg', label: 'мой' },
  { key: '2sg', label: 'твой' },
  { key: '3sg', label: 'его/её' },
  { key: '1pl', label: 'наш' },
  { key: '2pl', label: 'ваш' },
  { key: '3pl', label: 'их' },
];

const CASE_OPTIONS: { key: CaseKey | null; label: string }[] = [
  { key: null, label: '—' },
  { key: 'loc', label: 'где?' },
  { key: 'dat', label: 'куда?' },
  { key: 'abl', label: 'откуда?' },
  { key: 'acc', label: 'кого? что?' },
  { key: 'gen', label: 'чей?' },
];

/**
 * Лаборатория слов: живой конструктор турецкой морфологии.
 * Выбираешь корень и суффиксы — слово собирается по правилам гармонии
 * гласных на глазах, с переводом и заметками о чередованиях.
 */
export default function WordLabScreen() {
  const palette = usePalette();
  const [mode, setMode] = useState<'lab' | 'quiz'>('lab');

  // Песочница
  const [rootIndex, setRootIndex] = useState(0);
  const [plural, setPlural] = useState(false);
  const [possessive, setPossessive] = useState<PersonKey | null>('1sg');
  const [grammarCase, setGrammarCase] = useState<CaseKey | null>('loc');

  // Тренажёр
  const [challenge, setChallenge] = useState<MorphChallenge | null>(null);
  const [quizKey, setQuizKey] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // Рентген произвольного слова
  const [xrayInput, setXrayInput] = useState('');

  const root = MORPH_ROOTS[rootIndex];
  const built = useMemo(
    () => buildWord(root, { plural, possessive, grammarCase }),
    [root, plural, possessive, grammarCase]
  );

  const kindColor = (kind: MorphKind): string => {
    switch (kind) {
      case 'root':
        return palette.text;
      case 'plural':
        return palette.success;
      case 'possessive':
        return palette.info;
      case 'case':
        return palette.warning;
    }
  };

  function startQuiz() {
    setScore({ correct: 0, total: 0 });
    setChallenge(generateChallenge());
    setQuizKey((k) => k + 1);
    setMode('quiz');
  }

  function onQuizResult(ok: boolean) {
    setScore((s) => ({ correct: s.correct + (ok ? 1 : 0), total: s.total + 1 }));
    setChallenge(generateChallenge());
    setQuizKey((k) => k + 1);
  }

  if (mode === 'quiz' && challenge) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.quizHeader} lightColor="transparent" darkColor="transparent">
          <Text style={[styles.quizScore, { color: palette.textMuted }]}>
            ⚡ Верно: {score.correct} из {score.total}
          </Text>
          <Pressable onPress={() => setMode('lab')} hitSlop={8}>
            <Text style={[styles.quizExit, { color: palette.primary }]}>Завершить</Text>
          </Pressable>
        </View>
        <MorphExercise
          key={quizKey}
          ru={challenge.ru}
          rootText={challenge.rootText}
          rootRu={challenge.rootRu}
          suffixes={challenge.suffixes}
          distractors={challenge.distractors}
          explain={challenge.explain}
          onResult={onQuizResult}
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.intro, { color: palette.textMuted }]}>
        Турецкое слово — конструктор: корень + цепочка суффиксов. Собери своё и
        посмотри, как гармония гласных подстраивает каждую деталь.
      </Text>

      {/* Корень */}
      <Text style={[styles.groupLabel, { color: palette.textMuted }]}>Корень</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.chipRow} lightColor="transparent" darkColor="transparent">
          {MORPH_ROOTS.map((r, i) => {
            const active = i === rootIndex;
            return (
              <Pressable
                key={r.tr}
                style={[
                  styles.chip,
                  { backgroundColor: active ? palette.primary : palette.surface },
                ]}
                onPress={() => setRootIndex(i)}>
                <Text
                  style={[styles.chipText, active && { color: palette.onPrimary }]}>
                  {r.tr}
                </Text>
                <Text
                  style={[
                    styles.chipSub,
                    { color: active ? palette.onPrimary : palette.textMuted },
                  ]}>
                  {r.sg.nom}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Суффиксы */}
      <Text style={[styles.groupLabel, { color: palette.textMuted }]}>
        Мн. число <Text style={{ color: palette.success }}>●</Text>
      </Text>
      <View style={styles.chipRow} lightColor="transparent" darkColor="transparent">
        {[false, true].map((v) => {
          const active = plural === v;
          return (
            <Pressable
              key={String(v)}
              style={[
                styles.chip,
                { backgroundColor: active ? palette.primary : palette.surface },
              ]}
              onPress={() => setPlural(v)}>
              <Text style={[styles.chipText, active && { color: palette.onPrimary }]}>
                {v ? 'несколько' : 'один'}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={[styles.groupLabel, { color: palette.textMuted }]}>
        Чей? <Text style={{ color: palette.info }}>●</Text>
      </Text>
      <View style={styles.chipRow} lightColor="transparent" darkColor="transparent">
        {PERSON_OPTIONS.map((opt) => {
          const active = possessive === opt.key;
          return (
            <Pressable
              key={opt.label}
              style={[
                styles.chip,
                { backgroundColor: active ? palette.primary : palette.surface },
              ]}
              onPress={() => setPossessive(opt.key)}>
              <Text style={[styles.chipText, active && { color: palette.onPrimary }]}>
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={[styles.groupLabel, { color: palette.textMuted }]}>
        Падеж <Text style={{ color: palette.warning }}>●</Text>
      </Text>
      <View style={styles.chipRow} lightColor="transparent" darkColor="transparent">
        {CASE_OPTIONS.map((opt) => {
          const active = grammarCase === opt.key;
          return (
            <Pressable
              key={opt.label}
              style={[
                styles.chip,
                { backgroundColor: active ? palette.primary : palette.surface },
              ]}
              onPress={() => setGrammarCase(opt.key)}>
              <Text style={[styles.chipText, active && { color: palette.onPrimary }]}>
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Результат */}
      <View style={[styles.resultCard, { backgroundColor: palette.surface }]}>
        <View style={styles.wordRow} lightColor="transparent" darkColor="transparent">
          <Text style={styles.word}>
            {built.parts.map((p, i) => (
              <Text key={i} style={{ color: kindColor(p.kind) }}>
                {p.text}
              </Text>
            ))}
          </Text>
          <SpeakButton text={built.surface} />
        </View>
        <Text style={[styles.ru, { color: palette.textMuted }]}>{built.ru}</Text>

        <View style={styles.partsRow} lightColor="transparent" darkColor="transparent">
          {built.parts.map((p, i) => (
            <View
              key={i}
              style={[styles.partChip, { borderColor: kindColor(p.kind) }]}
              lightColor="transparent"
              darkColor="transparent">
              <Text style={[styles.partText, { color: kindColor(p.kind) }]}>
                {i === 0 ? p.text : `-${p.text}`}
              </Text>
              <Text style={[styles.partGloss, { color: palette.textMuted }]}>{p.gloss}</Text>
            </View>
          ))}
        </View>

        {built.notes.length > 0 && (
          <View
            style={[styles.notes, { borderTopColor: palette.track }]}
            lightColor="transparent"
            darkColor="transparent">
            {built.notes.map((n, i) => (
              <Text key={i} style={[styles.noteText, { color: palette.textMuted }]}>
                <Text style={[styles.noteTitle, { color: palette.primary }]}>{n.title}: </Text>
                {n.text}
              </Text>
            ))}
          </View>
        )}
      </View>

      <Pressable
        style={[styles.quizBtn, { backgroundColor: palette.primary }]}
        onPress={startQuiz}>
        <Text style={[styles.quizBtnText, { color: palette.onPrimary }]}>
          ⚡ Проверь себя
        </Text>
        <Text style={[styles.quizBtnSub, { color: palette.onPrimary }]}>
          бесконечный тренажёр: собери слово по переводу
        </Text>
      </Pressable>

      {/* Рентген: разбор любого введённого слова */}
      <Text style={[styles.groupLabel, { color: palette.textMuted }]}>🔬 Рентген слова</Text>
      <Text style={[styles.intro, { color: palette.textMuted }]}>
        Увидел слово на вывеске или в сообщении? Введи его — рентген разрежет на морфемы.
      </Text>
      <TextInput
        value={xrayInput}
        onChangeText={setXrayInput}
        placeholder="например: evlerimden, kitabımı, İstanbul’da"
        placeholderTextColor={palette.textMuted}
        autoCapitalize="none"
        autoCorrect={false}
        style={[styles.xrayInput, { backgroundColor: palette.surface, color: palette.text }]}
      />
      {xrayInput.trim().length > 1 && (
        <View style={[styles.resultCard, styles.xrayCard, { backgroundColor: palette.surface }]}>
          <XrayContent word={xrayInput.trim()} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.xl,
    gap: Spacing.md,
    paddingBottom: Spacing.xxl * 2,
  },
  intro: {
    fontSize: FontSize.body,
    lineHeight: 21,
  },
  groupLabel: {
    fontSize: FontSize.small,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: Spacing.xs,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  chip: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.sm,
    alignItems: 'center',
    minWidth: 56,
  },
  chipText: {
    fontSize: FontSize.body,
    fontWeight: '600',
  },
  chipSub: {
    fontSize: FontSize.caption,
  },
  resultCard: {
    marginTop: Spacing.md,
    padding: Spacing.xl,
    borderRadius: Radius.lg,
    gap: Spacing.md,
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  word: {
    flex: 1,
    fontSize: FontSize.display,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  ru: {
    fontSize: FontSize.medium,
  },
  partsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  partChip: {
    borderWidth: 1.5,
    borderRadius: Radius.sm,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
  },
  partText: {
    fontSize: FontSize.body,
    fontWeight: '700',
  },
  partGloss: {
    fontSize: FontSize.caption,
  },
  notes: {
    borderTopWidth: 1,
    paddingTop: Spacing.md,
    gap: Spacing.sm,
  },
  noteText: {
    fontSize: FontSize.small,
    lineHeight: 19,
  },
  noteTitle: {
    fontWeight: '700',
  },
  quizBtn: {
    marginTop: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    alignItems: 'center',
    gap: 2,
  },
  quizBtnText: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
  quizBtnSub: {
    fontSize: FontSize.caption,
    opacity: 0.85,
  },
  xrayInput: {
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: FontSize.medium,
  },
  xrayCard: {
    marginTop: 0,
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quizScore: {
    fontSize: FontSize.small,
    fontWeight: '600',
  },
  quizExit: {
    fontSize: FontSize.body,
    fontWeight: '600',
  },
});
