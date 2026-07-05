import { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Switch } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { format, subDays } from 'date-fns';
import { ru } from 'date-fns/locale';

import { Text, View, usePalette } from '@/components/Themed';
import HeatmapCalendar from '@/components/HeatmapCalendar';
import XPBar from '@/components/XPBar';
import BadgeCard from '@/components/BadgeCard';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';
import { isSoundEnabled, setSoundEnabled } from '@/logic/sound';
import { ACHIEVEMENT_DEFS } from '@/db/schema';
import {
  countReviewedCards,
  getAccuracyByDay,
  getAllSessions,
  getProfile,
  getSessionCount,
  listAchievements,
  type DayAccuracy,
  type Profile,
} from '@/db/queries';

const ACCURACY_DAYS = 7;

interface Stats {
  profile: Profile;
  activeDates: Set<string>;
  sessionCount: number;
  reviewedCardCount: number;
  accuracyByDate: Map<string, DayAccuracy>;
  unlockedKeys: Set<string>;
}

export default function ProfileScreen() {
  const palette = usePalette();
  const [stats, setStats] = useState<Stats | null>(null);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  function toggleSound(on: boolean) {
    setSoundOn(on);
    setSoundEnabled(on);
  }

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        const since = format(subDays(new Date(), ACCURACY_DAYS - 1), 'yyyy-MM-dd');
        const [profile, sessions, sessionCount, reviewedCardCount, accuracy, achievements] =
          await Promise.all([
            getProfile(),
            getAllSessions(),
            getSessionCount(),
            countReviewedCards(),
            getAccuracyByDay(since),
            listAchievements(),
          ]);
        if (cancelled) return;
        setStats({
          profile,
          activeDates: new Set(sessions.map((s) => s.date)),
          sessionCount,
          reviewedCardCount,
          accuracyByDate: new Map(accuracy.map((a) => [a.date, a])),
          unlockedKeys: new Set(
            achievements.filter((a) => a.unlocked_at !== null).map((a) => a.key)
          ),
        });
      })();
      return () => {
        cancelled = true;
      };
    }, [])
  );

  if (!stats) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.card, { backgroundColor: palette.surface }]}>
        <XPBar totalXp={stats.profile.total_xp} />
      </View>

      <View style={styles.statsRow}>
        <StatBox label="Стрик" value={`🔥 ${stats.profile.current_streak}`} />
        <StatBox label="Лучший стрик" value={String(stats.profile.longest_streak)} />
      </View>
      <View style={styles.statsRow}>
        <StatBox label="Сессий" value={String(stats.sessionCount)} />
        <StatBox label="Слов изучено" value={String(stats.reviewedCardCount)} />
      </View>

      <View style={[styles.card, { backgroundColor: palette.surface }]}>
        <Text style={[styles.cardLabel, { color: palette.textMuted }]}>
          Активность за последние 16 недель
        </Text>
        <HeatmapCalendar activeDates={stats.activeDates} />
      </View>

      <AccuracyCard accuracyByDate={stats.accuracyByDate} />

      <Text style={styles.sectionTitle}>Настройки</Text>
      <View style={[styles.settingRow, { backgroundColor: palette.surface }]}>
        <Text style={styles.settingLabel}>🔊 Звук ответов</Text>
        <Switch
          value={soundOn}
          onValueChange={toggleSound}
          trackColor={{ true: palette.primary }}
        />
      </View>

      <Text style={styles.sectionTitle}>Достижения</Text>
      <View style={styles.badges} lightColor="transparent" darkColor="transparent">
        {ACHIEVEMENT_DEFS.map((a) => (
          <BadgeCard
            key={a.key}
            title={a.title}
            description={a.description}
            unlocked={stats.unlockedKeys.has(a.key)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  const palette = usePalette();

  return (
    <View style={[styles.statBox, { backgroundColor: palette.surface }]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={[styles.statLabel, { color: palette.textMuted }]}>{label}</Text>
    </View>
  );
}

function AccuracyCard({ accuracyByDate }: { accuracyByDate: Map<string, DayAccuracy> }) {
  const palette = usePalette();
  const today = new Date();

  const days = Array.from({ length: ACCURACY_DAYS }, (_, i) => {
    const date = subDays(today, ACCURACY_DAYS - 1 - i);
    const row = accuracyByDate.get(format(date, 'yyyy-MM-dd'));
    return {
      key: format(date, 'yyyy-MM-dd'),
      label: format(date, 'EEEEEE', { locale: ru }),
      total: row?.total ?? 0,
      failed: row?.failed ?? 0,
    };
  });

  const totalReviews = days.reduce((sum, d) => sum + d.total, 0);
  const totalFailed = days.reduce((sum, d) => sum + d.failed, 0);
  const overallPct = totalReviews > 0 ? Math.round((1 - totalFailed / totalReviews) * 100) : null;

  return (
    <View style={[styles.card, { backgroundColor: palette.surface }]}>
      <View style={styles.accuracyHeader} lightColor="transparent" darkColor="transparent">
        <Text style={[styles.cardLabel, { color: palette.textMuted }]}>
          Точность за {ACCURACY_DAYS} дней
        </Text>
        <Text style={[styles.cardLabel, { color: palette.textMuted }]}>
          {overallPct === null ? 'нет повторений' : `${overallPct}% · ${totalReviews} повт.`}
        </Text>
      </View>
      <View style={styles.accuracyBars} lightColor="transparent" darkColor="transparent">
        {days.map((day) => {
          const pct = day.total > 0 ? 1 - day.failed / day.total : 0;
          return (
            <View
              key={day.key}
              style={styles.accuracyCol}
              lightColor="transparent"
              darkColor="transparent">
              <View style={[styles.accuracyTrack, { backgroundColor: palette.track }]}>
                {day.total > 0 && (
                  <View
                    style={[
                      styles.accuracyFill,
                      {
                        height: `${Math.max(8, Math.round(pct * 100))}%`,
                        backgroundColor: pct >= 0.5 ? palette.success : palette.danger,
                      },
                    ]}
                  />
                )}
              </View>
              <Text style={[styles.accuracyLabel, { color: palette.textMuted }]}>{day.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
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
  },
  card: {
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    gap: Spacing.md,
  },
  cardLabel: {
    fontSize: FontSize.small,
  },
  sectionTitle: {
    fontSize: FontSize.heading,
    fontWeight: '700',
    marginTop: Spacing.sm,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderRadius: Radius.lg,
  },
  settingLabel: {
    fontSize: FontSize.medium,
    fontWeight: '600',
  },
  badges: {
    gap: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  statBox: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statValue: {
    fontSize: FontSize.stat,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: FontSize.caption,
  },
  accuracyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accuracyBars: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'flex-end',
  },
  accuracyCol: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  accuracyTrack: {
    width: '100%',
    height: 48,
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  accuracyFill: {
    width: '100%',
    borderRadius: 4,
  },
  accuracyLabel: {
    fontSize: FontSize.caption,
  },
});
