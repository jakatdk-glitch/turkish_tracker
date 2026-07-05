import { useMemo, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { Text, View, usePalette } from '@/components/Themed';
import SpeakButton from '@/components/SpeakButton';
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

export default function ChoiceExercise({
  prompt,
  promptIsTurkish,
  options,
  correct,
  explain,
  onResult,
}: {
  prompt: string;
  promptIsTurkish: boolean;
  options: string[];
  correct: number;
  explain?: string;
  onResult: (correct: boolean) => void;
}) {
  const palette = usePalette();
  // Показываем варианты в случайном порядке, чтобы не заучивалась позиция ответа.
  const order = useMemo(() => shuffle(options.map((_, i) => i)), [options]);
  const [chosen, setChosen] = useState<number | null>(null);
  const answered = chosen !== null;
  const isCorrect = chosen === correct;

  function choose(index: number) {
    if (answered) return;
    setChosen(index);
  }

  return (
    <View style={styles.container} lightColor="transparent" darkColor="transparent">
      <View style={styles.promptRow} lightColor="transparent" darkColor="transparent">
        <Text style={styles.prompt}>{prompt}</Text>
        {promptIsTurkish && <SpeakButton text={prompt} />}
      </View>

      <View style={styles.options} lightColor="transparent" darkColor="transparent">
        {order.map((i) => {
          const option = options[i];
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
              onPress={() => choose(i)}>
              <Text
                style={[
                  styles.optionText,
                  (showCorrect || showWrong) && { color: palette.onPrimary, fontWeight: '700' },
                ]}>
                {option}
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
  promptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  prompt: {
    flex: 1,
    fontSize: FontSize.heading,
    fontWeight: '700',
  },
  speak: {
    fontSize: FontSize.heading,
  },
  options: {
    gap: Spacing.sm,
  },
  option: {
    padding: Spacing.lg,
    borderRadius: Radius.md,
  },
  optionText: {
    fontSize: FontSize.medium,
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
