import { useCallback, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { router, useFocusEffect } from 'expo-router';

import { Text, View, usePalette } from '@/components/Themed';
import AppLottie from '@/components/AppLottie';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';
import { countDueCards, countReviewedCards } from '@/db/queries';
import { todayStr } from '@/logic/streak';

export default function ReviewScreen() {
  const palette = usePalette();
  const [dueCount, setDueCount] = useState<number | null>(null);
  const [learnedCount, setLearnedCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        const [due, learned] = await Promise.all([
          countDueCards(todayStr()),
          countReviewedCards(),
        ]);
        if (cancelled) return;
        setDueCount(due);
        setLearnedCount(learned);
      })();
      return () => {
        cancelled = true;
      };
    }, [])
  );

  if (dueCount === null) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Повторение</Text>
      <Text style={[styles.subtitle, { color: palette.textMuted }]}>
        Слова из пройденных юнитов возвращаются по умному расписанию — как раз
        перед тем, как ты их забудешь.
      </Text>

      <View style={[styles.card, { backgroundColor: palette.surface }]}>
        {dueCount > 0 ? (
          <>
            <Text style={styles.dueCount}>{dueCount}</Text>
            <Text style={[styles.dueLabel, { color: palette.textMuted }]}>
              {dueCount === 1 ? 'слово ждёт' : 'слов ждут'} повторения
            </Text>
            <Pressable
              style={[styles.reviewBtn, { backgroundColor: palette.primary }]}
              onPress={() => router.push('/session/review')}>
              <Text style={[styles.reviewBtnText, { color: palette.onPrimary }]}>
                Повторить сейчас
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <AppLottie
              source={require('@/assets/lottie/empty.json')}
              fallbackEmoji="🎉"
              size={120}
              loop={false}
            />
            <Text style={[styles.dueLabel, { color: palette.textMuted }]}>
              На сегодня всё повторено! Загляни завтра или пройди новый юнит.
            </Text>
          </>
        )}
      </View>

      <View style={[styles.card, { backgroundColor: palette.surface }]}>
        <Text style={styles.learnedCount}>{learnedCount}</Text>
        <Text style={[styles.dueLabel, { color: palette.textMuted }]}>слов уже изучено</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: FontSize.title,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: FontSize.body,
    lineHeight: 21,
  },
  card: {
    padding: Spacing.xxl,
    borderRadius: Radius.lg,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  dueCount: {
    fontSize: 44,
    fontWeight: '700',
    lineHeight: 52,
  },
  learnedCount: {
    fontSize: FontSize.display,
    fontWeight: '700',
  },
  dueLabel: {
    fontSize: FontSize.body,
    textAlign: 'center',
  },
  reviewBtn: {
    marginTop: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
    borderRadius: Radius.lg,
  },
  reviewBtnText: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
});
