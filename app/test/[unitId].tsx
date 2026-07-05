import { useRef, useState } from 'react';
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
import type { Exercise, UnitContent } from '@/logic/course';
import {
  completeUnitWithRewards,
  TEST_PASS_THRESHOLD,
  type SessionRewards,
} from '@/logic/unitCompletion';
import { getCompletedUnits } from '@/db/queries';

const TEST_SIZE = 8;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Тест — либо свой набор заданий юнита, либо выборка из практики.
// Карточки с самооценкой в тест не попадают: тесту нужны проверяемые ответы.
function buildTestQueue(content: UnitContent): Exercise[] {
  if (content.test.length > 0) return shuffle(content.test);
  const pool = content.exercises.filter((e) => e.type !== 'flashcard');
  return shuffle(pool).slice(0, TEST_SIZE);
}

interface TestResult {
  passed: boolean;
  pct: number;
  rewards: SessionRewards | null;
}

export default function TestScreen() {
  const { unitId } = useLocalSearchParams<{ unitId: string }>();
  const palette = usePalette();

  const meta = COURSE.flatMap((m) => m.units).find((u) => u.id === unitId);
  const content = unitId ? getUnitContent(unitId) : null;

  const [queue, setQueue] = useState<Exercise[]>(() => (content ? buildTestQueue(content) : []));
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [missed, setMissed] = useState<Exercise[]>([]);
  const [result, setResult] = useState<TestResult | null>(null);
  const startedAt = useRef(Date.now());

  async function handleResult(correct: boolean) {
    const newCorrect = correctCount + (correct ? 1 : 0);
    setCorrectCount(newCorrect);
    if (!correct) setMissed((prev) => [...prev, queue[index]]);

    if (index + 1 < queue.length) {
      setIndex(index + 1);
      return;
    }

    const pct = Math.round((newCorrect / queue.length) * 100);
    const passed = pct >= TEST_PASS_THRESHOLD;
    if (!passed) {
      setResult({ passed, pct, rewards: null });
      return;
    }

    const completed = await getCompletedUnits();
    const alreadyDone = completed.some((r) => r.unit_id === unitId);
    const durationMinutes = Math.round((Date.now() - startedAt.current) / 60000);
    const rewards = alreadyDone
      ? null
      : await completeUnitWithRewards(unitId!, { durationMinutes, testScore: pct });
    setResult({ passed, pct, rewards });
  }

  function retry() {
    if (!content) return;
    setQueue(buildTestQueue(content));
    setIndex(0);
    setCorrectCount(0);
    setMissed([]);
    setResult(null);
    startedAt.current = Date.now();
  }

  if (!content || queue.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.resultTitle}>Для этого юнита пока нет теста</Text>
      </View>
    );
  }

  if (result) {
    if (result.passed) {
      return (
        <ScrollView contentContainerStyle={styles.summaryScroll}>
          <Confetti />
          {result.rewards && result.rewards.newlyUnlockedTitles.length > 0 ? (
            <AppLottie
              source={require('@/assets/lottie/achievement.json')}
              fallbackEmoji="🏆"
              size={140}
              loop={false}
            />
          ) : (
            <AppLottie
              source={require('@/assets/lottie/success.json')}
              fallbackEmoji="🎉"
              size={140}
              loop={false}
            />
          )}
          <Text style={styles.resultTitle}>Тест сдан: {result.pct}%</Text>
          {result.rewards ? (
            <Text style={[styles.resultLine, { color: palette.textMuted }]}>
              +{result.rewards.xpEarned} XP · следующий юнит открыт
            </Text>
          ) : (
            <Text style={[styles.resultLine, { color: palette.textMuted }]}>
              Юнит был пройден раньше — отличная тренировка!
            </Text>
          )}
          {result.rewards && result.rewards.newlyUnlockedTitles.length > 0 && (
            <Text style={[styles.resultLine, { color: palette.textMuted }]}>
              🏆 Новое достижение: {result.rewards.newlyUnlockedTitles.join(', ')}
            </Text>
          )}
          <Pressable
            style={[styles.primaryBtn, { backgroundColor: palette.primary }]}
            onPress={() => router.dismissTo('/')}>
            <Text style={[styles.primaryBtnText, { color: palette.onPrimary }]}>К пути</Text>
          </Pressable>
          <MistakeRecap items={missed} />
        </ScrollView>
      );
    }
    return (
      <ScrollView contentContainerStyle={styles.summaryScroll}>
        <Text style={styles.resultEmoji}>😅</Text>
        <Text style={styles.resultTitle}>{result.pct}% — почти!</Text>
        <Text style={[styles.resultLine, { color: palette.textMuted }]}>
          Для зачёта нужно {TEST_PASS_THRESHOLD}% и больше. Загляни в теорию и попробуй ещё раз.
        </Text>
        <Pressable
          style={[styles.primaryBtn, { backgroundColor: palette.primary }]}
          onPress={retry}>
          <Text style={[styles.primaryBtnText, { color: palette.onPrimary }]}>
            Попробовать ещё раз
          </Text>
        </Pressable>
        <Pressable
          style={[styles.secondaryBtn, { borderColor: palette.primary }]}
          onPress={() => router.back()}>
          <Text style={[styles.secondaryBtnText, { color: palette.primary }]}>
            Повторить теорию
          </Text>
        </Pressable>
        <MistakeRecap items={missed} />
      </ScrollView>
    );
  }

  const progress = index / queue.length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header} lightColor="transparent" darkColor="transparent">
        <Text style={[styles.headerTitle, { color: palette.textMuted }]}>
          Тест · {meta?.title ?? ''}
        </Text>
        <Text style={[styles.headerCount, { color: palette.textMuted }]}>
          {index + 1} / {queue.length}
        </Text>
      </View>
      <View style={[styles.progressTrack, { backgroundColor: palette.track }]}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.round(progress * 100)}%`, backgroundColor: palette.warning },
          ]}
        />
      </View>

      <ExerciseView key={index} exercise={queue[index]} onResult={handleResult} hideExplain />
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
  resultEmoji: {
    fontSize: 48,
  },
  resultTitle: {
    fontSize: FontSize.title,
    fontWeight: '700',
    textAlign: 'center',
  },
  resultLine: {
    fontSize: FontSize.body,
    textAlign: 'center',
    lineHeight: 21,
  },
  primaryBtn: {
    marginTop: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
    borderRadius: Radius.lg,
  },
  primaryBtnText: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
  secondaryBtn: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxl,
    borderRadius: Radius.lg,
    borderWidth: 2,
  },
  secondaryBtnText: {
    fontSize: FontSize.medium,
    fontWeight: '600',
  },
});
