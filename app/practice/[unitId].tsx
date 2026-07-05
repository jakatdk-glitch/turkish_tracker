import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { Text, View, usePalette } from '@/components/Themed';
import Confetti from '@/components/Confetti';
import AppLottie from '@/components/AppLottie';
import ExerciseView from '@/components/exercises/ExerciseView';
import MistakeRecap from '@/components/MistakeRecap';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';
import { COURSE } from '@/data/course/manifest';
import { getUnitContent } from '@/data/course/units';
import type { Exercise } from '@/logic/course';
import { grantPracticeRewards, type SessionRewards } from '@/logic/unitCompletion';
import { getCompletedUnits } from '@/db/queries';

export default function PracticeScreen() {
  const { unitId } = useLocalSearchParams<{ unitId: string }>();
  const palette = usePalette();

  const meta = COURSE.flatMap((m) => m.units).find((u) => u.id === unitId);
  const content = unitId ? getUnitContent(unitId) : null;

  const [queue, setQueue] = useState<Exercise[]>(() => content?.exercises ?? []);
  const [index, setIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [missed, setMissed] = useState<Exercise[]>([]);
  const [summary, setSummary] = useState<SessionRewards | null>(null);
  const [unitDone, setUnitDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const startedAt = useRef(Date.now());

  const current = index < queue.length ? queue[index] : null;
  const progress = queue.length > 0 ? index / queue.length : 0;

  const title = useMemo(() => meta?.title ?? 'Практика', [meta]);

  async function handleResult(correct: boolean) {
    if (!correct) {
      setMistakes((m) => m + 1);
      // Ошибочное упражнение возвращается в конец очереди
      setQueue((q) => (current ? [...q, current] : q));
      // Собираем для «работы над ошибками» — без дублей при повторной ошибке.
      if (current) setMissed((prev) => (prev.includes(current) ? prev : [...prev, current]));
    }
    const nextIndex = index + 1;
    if (nextIndex < queue.length + (correct ? 0 : 1)) {
      setIndex(nextIndex);
      return;
    }
    await finish();
  }

  async function finish() {
    if (!unitId || saving) return;
    setSaving(true);
    const completed = await getCompletedUnits();
    setUnitDone(completed.some((r) => r.unit_id === unitId));
    const durationMinutes = Math.round((Date.now() - startedAt.current) / 60000);
    const result = await grantPracticeRewards(durationMinutes);
    setSaving(false);
    setSummary(result);
  }

  if (!content || content.exercises.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.summaryTitle}>Здесь пока нет упражнений</Text>
      </View>
    );
  }

  if (summary) {
    return (
      <ScrollView contentContainerStyle={styles.summaryScroll}>
        <Confetti />
        <AppLottie source={require('@/assets/lottie/success.json')} fallbackEmoji="🎉" size={140} loop={false} />
        <Text style={styles.summaryTitle}>Практика пройдена!</Text>
        <Text style={[styles.summaryLine, { color: palette.textMuted }]}>
          +{summary.xpEarned} XP
          {mistakes > 0
            ? ` · ${mistakes} ${mistakes === 1 ? 'ошибка' : mistakes < 5 ? 'ошибки' : 'ошибок'}`
            : ' · без ошибок!'}
        </Text>
        {summary.newlyUnlockedTitles.length > 0 && (
          <Text style={[styles.summaryLine, { color: palette.textMuted }]}>
            🏆 Новое достижение: {summary.newlyUnlockedTitles.join(', ')}
          </Text>
        )}
        {unitDone ? (
          <Pressable
            style={[styles.doneBtn, { backgroundColor: palette.primary }]}
            onPress={() => router.dismissTo('/')}>
            <Text style={[styles.doneBtnText, { color: palette.onPrimary }]}>К пути</Text>
          </Pressable>
        ) : (
          <>
            <Text style={[styles.summaryLine, { color: palette.textMuted }]}>
              Теперь закрепи результат тестом — он откроет следующий юнит.
            </Text>
            <Pressable
              style={[styles.doneBtn, { backgroundColor: palette.primary }]}
              onPress={() => router.replace(`/test/${unitId}`)}>
              <Text style={[styles.doneBtnText, { color: palette.onPrimary }]}>Пройти тест</Text>
            </Pressable>
            <Pressable
              style={[styles.laterBtn, { borderColor: palette.primary }]}
              onPress={() => router.dismissTo('/')}>
              <Text style={[styles.laterBtnText, { color: palette.primary }]}>Позже</Text>
            </Pressable>
          </>
        )}
        <MistakeRecap items={missed} />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header} lightColor="transparent" darkColor="transparent">
        <Text style={[styles.headerTitle, { color: palette.textMuted }]}>{title}</Text>
        <Text style={[styles.headerCount, { color: palette.textMuted }]}>
          {Math.min(index + 1, queue.length)} / {queue.length}
        </Text>
      </View>
      <View style={[styles.progressTrack, { backgroundColor: palette.track }]}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.round(progress * 100)}%`, backgroundColor: palette.primary },
          ]}
        />
      </View>

      {current && <ExerciseView key={index} exercise={current} onResult={handleResult} />}
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
    gap: Spacing.sm,
  },
  summaryScroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
    gap: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSize.small,
    fontWeight: '600',
  },
  headerCount: {
    fontSize: FontSize.small,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  summaryEmoji: {
    fontSize: 48,
  },
  summaryTitle: {
    fontSize: FontSize.title,
    fontWeight: '700',
  },
  summaryLine: {
    fontSize: FontSize.body,
    textAlign: 'center',
  },
  doneBtn: {
    marginTop: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
    borderRadius: Radius.lg,
  },
  doneBtnText: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
  laterBtn: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxl,
    borderRadius: Radius.lg,
    borderWidth: 2,
  },
  laterBtnText: {
    fontSize: FontSize.medium,
    fontWeight: '600',
  },
});
