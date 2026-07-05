import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { Text, View, usePalette } from '@/components/Themed';
import Flashcard from '@/components/Flashcard';
import Confetti from '@/components/Confetti';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';
import {
  countReviewedCards,
  createSession,
  getDueCards,
  insertReview,
  getLessonById,
  getProfile,
  getSessionCount,
  listAchievements,
  listCardsByLesson,
  unlockAchievement,
  updateCardReview,
  updateProfile,
  type Card,
  type Lesson,
} from '@/db/queries';
import { ACHIEVEMENT_DEFS } from '@/db/schema';
import { calculateSessionXp } from '@/logic/xp';
import { applySessionToStreak, todayStr } from '@/logic/streak';
import { getNewlyUnlockedKeys } from '@/logic/achievements';
import { scheduleNextReview, type Grade } from '@/logic/spacedRepetition';

const SESSION_TARGET_MINUTES = 20;

function formatDays(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'день';
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return 'дня';
  return 'дней';
}

interface SummaryData {
  xpEarned: number;
  currentStreak: number;
  newlyUnlockedTitles: string[];
}

export default function SessionScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const palette = usePalette();
  // Спецмаршрут /session/review — повторение due-карточек из всех уроков.
  const isReview = lessonId === 'review';

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [cards, setCards] = useState<Card[] | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [finishing, setFinishing] = useState(false);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    if (isReview) {
      getDueCards(todayStr()).then(setCards);
      return;
    }
    const id = Number(lessonId);
    Promise.all([getLessonById(id), listCardsByLesson(id)]).then(([l, c]) => {
      setLesson(l);
      setCards(c);
    });
  }, [lessonId, isReview]);

  useEffect(() => {
    if (summary) return;
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startedAt.current) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [summary]);

  async function handleGrade(grade: Grade) {
    if (!cards || cards.length === 0) return;
    // В повторении каждая карточка показывается один раз, в уроке — по кругу.
    const card = isReview ? cards[cardIndex] : cards[cardIndex % cards.length];
    if (!card) return;
    const result = scheduleNextReview(
      { ease_factor: card.ease_factor, interval_days: card.interval_days, repetitions: card.repetitions },
      grade
    );
    await updateCardReview(card.id, result);
    await insertReview({ date: todayStr(), card_id: card.id, grade });
    setCards((prev) =>
      prev ? prev.map((c) => (c.id === card.id ? { ...c, ...result } : c)) : prev
    );
    setCardIndex((i) => i + 1);
  }

  async function handleFinish() {
    setFinishing(true);
    const durationMinutes = Math.max(1, Math.round(elapsedSeconds / 60));
    const xpEarned = calculateSessionXp(durationMinutes);
    const today = todayStr();

    await createSession({
      date: today,
      duration_minutes: durationMinutes,
      xp_earned: xpEarned,
      lesson_id: isReview ? null : lesson?.id ?? null,
    });

    const profile = await getProfile();
    const streakState = applySessionToStreak(
      {
        current_streak: profile.current_streak,
        longest_streak: profile.longest_streak,
        last_session_date: profile.last_session_date,
      },
      today
    );
    await updateProfile({ ...streakState, total_xp: profile.total_xp + xpEarned });

    const [sessionCount, reviewedCardCount, achievements] = await Promise.all([
      getSessionCount(),
      countReviewedCards(),
      listAchievements(),
    ]);
    const alreadyUnlocked = new Set(
      achievements.filter((a) => a.unlocked_at !== null).map((a) => a.key)
    );
    const newlyUnlockedKeys = getNewlyUnlockedKeys(
      { currentStreak: streakState.current_streak, reviewedCardCount, sessionCount },
      alreadyUnlocked
    );
    for (const key of newlyUnlockedKeys) {
      await unlockAchievement(key, today);
    }

    setSummary({
      xpEarned,
      currentStreak: streakState.current_streak,
      newlyUnlockedTitles: ACHIEVEMENT_DEFS.filter((a) => newlyUnlockedKeys.includes(a.key)).map(
        (a) => a.title
      ),
    });
    setFinishing(false);
  }

  if (!cards || (!isReview && !lesson)) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (summary) {
    return (
      <View style={styles.center}>
        <Confetti />
        <Text style={styles.summaryEmoji}>🎉</Text>
        <Text style={styles.summaryTitle}>Сессия завершена!</Text>
        <Text style={styles.summaryLine}>+{summary.xpEarned} XP</Text>
        <Text style={styles.summaryLine}>
          Стрик: {summary.currentStreak} {formatDays(summary.currentStreak)}
        </Text>
        {summary.newlyUnlockedTitles.length > 0 && (
          <Text style={styles.summaryLine}>
            Новое достижение: {summary.newlyUnlockedTitles.join(', ')}
          </Text>
        )}
        <Pressable
          style={[styles.finishBtn, { backgroundColor: palette.primary }]}
          onPress={() => router.replace('/')}>
          <Text style={[styles.finishBtnText, { color: palette.onPrimary }]}>Готово</Text>
        </Pressable>
      </View>
    );
  }

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const timeLabel = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const currentCard =
    cards.length === 0
      ? null
      : isReview
        ? cards[cardIndex] ?? null
        : cards[cardIndex % cards.length];
  const remaining = Math.max(0, cards.length - cardIndex);

  return (
    <View style={styles.container}>
      <View style={styles.header} lightColor="transparent" darkColor="transparent">
        <Text style={styles.lessonTitle}>{isReview ? 'Повторение' : lesson!.title}</Text>
        <Text style={[styles.timer, { color: palette.textMuted }]}>
          {isReview
            ? `${timeLabel} · осталось слов: ${remaining}`
            : `${timeLabel} / ${SESSION_TARGET_MINUTES}:00`}
        </Text>
      </View>

      {currentCard ? (
        <Flashcard
          // Remount на каждой карточке сбрасывает переворот и состояние.
          key={`${cardIndex}-${currentCard.id}`}
          prompt={currentCard.reversed ? currentCard.back : currentCard.front}
          answer={currentCard.reversed ? currentCard.front : currentCard.back}
          turkishText={currentCard.front}
          speakOnlyWhenRevealed={!!currentCard.reversed}
          onGrade={handleGrade}
        />
      ) : (
        <Text style={styles.summaryLine}>
          {isReview
            ? cards.length > 0
              ? 'Все слова на сегодня повторены 🎉'
              : 'На сегодня нет слов для повторения.'
            : 'В этом уроке пока нет карточек.'}
        </Text>
      )}

      <Pressable
        style={[styles.finishBtn, { backgroundColor: palette.primary }]}
        disabled={finishing}
        onPress={handleFinish}>
        <Text style={[styles.finishBtnText, { color: palette.onPrimary }]}>
          {finishing ? 'Сохранение…' : 'Завершить сессию'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.xl,
    gap: Spacing.xxl,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    padding: Spacing.xl,
  },
  header: {
    gap: Spacing.xs,
  },
  lessonTitle: {
    fontSize: FontSize.heading,
    fontWeight: '700',
  },
  timer: {
    fontSize: FontSize.label,
  },
  finishBtn: {
    marginTop: 'auto',
    paddingVertical: Spacing.lg,
    borderRadius: Radius.lg,
    alignItems: 'center',
  },
  finishBtnText: {
    fontSize: FontSize.medium,
    fontWeight: '700',
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
    opacity: 0.8,
  },
});
