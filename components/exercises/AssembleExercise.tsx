import { useMemo, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { Text, View, usePalette } from '@/components/Themed';
import FeedbackCard from '@/components/exercises/FeedbackCard';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function AssembleExercise({
  ru,
  words,
  correct,
  explain,
  onResult,
}: {
  ru: string;
  words: string[];
  correct: string;
  explain?: string;
  onResult: (correct: boolean) => void;
}) {
  const palette = usePalette();
  // Работаем с индексами банка: слово может повторяться (İt iti itti…).
  const bank = useMemo(() => shuffle(words.map((w, i) => ({ w, i }))), [words]);
  const [selected, setSelected] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);

  const usedIds = new Set(selected);
  const answer = selected.map((id) => words[id]).join(' ');
  const isCorrect = answer.trim() === correct.trim();
  const allPlaced = selected.length === words.length;

  function pick(id: number) {
    if (checked) return;
    setSelected((s) => [...s, id]);
  }

  function unpick(pos: number) {
    if (checked) return;
    setSelected((s) => s.filter((_, i) => i !== pos));
  }

  return (
    <View style={styles.container} lightColor="transparent" darkColor="transparent">
      <Text style={styles.ru}>{ru}</Text>

      {/* Строка ответа */}
      <View
        style={[
          styles.answerBox,
          {
            borderColor: checked ? (isCorrect ? palette.success : palette.danger) : palette.track,
          },
        ]}>
        {selected.length === 0 ? (
          <Text style={[styles.answerPlaceholder, { color: palette.textMuted }]}>
            нажимай слова по порядку
          </Text>
        ) : (
          <View style={styles.chips} lightColor="transparent" darkColor="transparent">
            {selected.map((id, pos) => (
              <Pressable
                key={`${id}-${pos}`}
                style={[styles.chip, { backgroundColor: palette.primary }]}
                onPress={() => unpick(pos)}>
                <Text style={[styles.chipText, { color: palette.onPrimary }]}>{words[id]}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* Банк слов */}
      <View style={styles.chips} lightColor="transparent" darkColor="transparent">
        {bank.map(({ w, i }) => {
          const used = usedIds.has(i);
          return (
            <Pressable
              key={i}
              disabled={used || checked}
              style={[
                styles.chip,
                { backgroundColor: palette.surface },
                used && styles.chipUsed,
              ]}
              onPress={() => pick(i)}>
              <Text style={styles.chipText}>{w}</Text>
            </Pressable>
          );
        })}
      </View>

      {!checked ? (
        <Pressable
          style={[
            styles.actionBtn,
            { backgroundColor: allPlaced ? palette.primary : palette.track },
          ]}
          disabled={!allPlaced}
          onPress={() => setChecked(true)}>
          <Text style={[styles.actionBtnText, { color: palette.onPrimary }]}>Проверить</Text>
        </Pressable>
      ) : (
        <FeedbackCard
          correct={isCorrect}
          correctText={correct}
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
  ru: {
    fontSize: FontSize.heading,
    fontWeight: '700',
  },
  answerBox: {
    minHeight: 64,
    borderRadius: Radius.md,
    borderWidth: 2,
    borderStyle: 'dashed',
    padding: Spacing.md,
    justifyContent: 'center',
  },
  answerPlaceholder: {
    fontSize: FontSize.body,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  chip: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.sm,
  },
  chipUsed: {
    opacity: 0.3,
  },
  chipText: {
    fontSize: FontSize.medium,
    fontWeight: '600',
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
  feedback: {
    padding: Spacing.lg,
    borderRadius: Radius.md,
    borderLeftWidth: 3,
    gap: Spacing.sm,
  },
  feedbackTitle: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
  feedbackExplain: {
    fontSize: FontSize.body,
    lineHeight: 20,
  },
  nextBtn: {
    marginTop: Spacing.xs,
    paddingVertical: Spacing.md,
    borderRadius: Radius.sm,
    alignItems: 'center',
  },
  nextBtnText: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
});
