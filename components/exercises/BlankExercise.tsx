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

// Делит предложение по маркеру пропуска ___ на «до» и «после».
function splitBlank(sentence: string): [string, string] {
  const i = sentence.indexOf('___');
  if (i === -1) return [sentence, ''];
  return [sentence.slice(0, i), sentence.slice(i + 3)];
}

export default function BlankExercise({
  sentence,
  ru,
  options,
  correct,
  explain,
  onResult,
}: {
  sentence: string;
  ru: string;
  options: string[];
  correct: number;
  explain?: string;
  onResult: (correct: boolean) => void;
}) {
  const palette = usePalette();
  const order = useMemo(() => shuffle(options.map((_, i) => i)), [options]);
  const [chosen, setChosen] = useState<number | null>(null);
  const answered = chosen !== null;
  const isCorrect = chosen === correct;

  const [before, after] = splitBlank(sentence);
  const fill = answered ? options[chosen] : '___';

  return (
    <View style={styles.container} lightColor="transparent" darkColor="transparent">
      <Text style={[styles.ru, { color: palette.textMuted }]}>{ru}</Text>

      <View style={[styles.sentenceBox, { backgroundColor: palette.surface }]}>
        <Text style={styles.sentence}>
          {before}
          <Text
            style={[
              styles.blank,
              {
                color: answered ? palette.onPrimary : palette.primary,
                backgroundColor: answered
                  ? isCorrect
                    ? palette.success
                    : palette.danger
                  : 'transparent',
              },
            ]}>
            {fill}
          </Text>
          {after}
        </Text>
      </View>

      <View style={styles.options} lightColor="transparent" darkColor="transparent">
        {order.map((i) => {
          const showCorrect = answered && i === correct;
          const showWrong = answered && i === chosen && !isCorrect;
          return (
            <Pressable
              key={i}
              disabled={answered}
              style={[
                styles.option,
                { backgroundColor: palette.surface },
                showCorrect && { backgroundColor: palette.success },
                showWrong && { backgroundColor: palette.danger },
              ]}
              onPress={() => setChosen(i)}>
              <Text
                style={[
                  styles.optionText,
                  (showCorrect || showWrong) && { color: palette.onPrimary, fontWeight: '700' },
                ]}>
                {options[i]}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {answered && (
        <FeedbackCard
          correct={isCorrect}
          correctText={options[correct]}
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
    fontSize: FontSize.body,
  },
  sentenceBox: {
    padding: Spacing.xl,
    borderRadius: Radius.md,
    alignItems: 'center',
  },
  sentence: {
    fontSize: FontSize.heading,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 30,
  },
  blank: {
    fontWeight: '700',
    borderRadius: Radius.sm,
    paddingHorizontal: 6,
  },
  options: {
    gap: Spacing.sm,
  },
  option: {
    padding: Spacing.lg,
    borderRadius: Radius.md,
    alignItems: 'center',
  },
  optionText: {
    fontSize: FontSize.medium,
    fontWeight: '600',
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
