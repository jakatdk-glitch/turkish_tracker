import { StyleSheet } from 'react-native';

import { Text, View, usePalette } from '@/components/Themed';
import SpeakButton from '@/components/SpeakButton';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';
import type { Exercise } from '@/logic/course';
import { describeExercise } from '@/logic/exerciseSummary';

/**
 * «Работа над ошибками»: список заданий, где пользователь ошибся, с правильным
 * ответом и пояснением. Помогает закрепить именно слабые места.
 */
export default function MistakeRecap({ items }: { items: Exercise[] }) {
  const palette = usePalette();
  if (items.length === 0) return null;

  return (
    <View style={[styles.card, { backgroundColor: palette.surface }]}>
      <Text style={styles.title}>📝 Над чем поработать</Text>
      {items.map((ex, i) => {
        const d = describeExercise(ex);
        return (
          <View
            key={i}
            style={[styles.row, i > 0 && { borderTopColor: palette.track, borderTopWidth: 1 }]}
            lightColor="transparent"
            darkColor="transparent">
            <Text style={[styles.prompt, { color: palette.textMuted }]}>{d.prompt}</Text>
            <View style={styles.answerRow} lightColor="transparent" darkColor="transparent">
              <Text style={styles.answer}>{d.answer}</Text>
              <SpeakButton text={d.answer} size="sm" />
            </View>
            {d.explain ? (
              <Text style={[styles.explain, { color: palette.textMuted }]}>{d.explain}</Text>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    gap: Spacing.sm,
  },
  title: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
  row: {
    paddingTop: Spacing.sm,
    gap: 2,
  },
  prompt: {
    fontSize: FontSize.body,
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  answer: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
  explain: {
    fontSize: FontSize.caption,
    lineHeight: 18,
  },
});
