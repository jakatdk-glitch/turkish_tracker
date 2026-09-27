import { useCallback, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet } from 'react-native';
import { router, useFocusEffect } from 'expo-router';

import { Text, View, usePalette } from '@/components/Themed';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';
import { COURSE } from '@/data/course/manifest';
import { computeUnitStatuses, type UnitStatus } from '@/logic/course';
import { getCompletedUnits, getProfile, type Profile } from '@/db/queries';
import { getLevelInfo } from '@/logic/xp';
import SpeakButton from '@/components/SpeakButton';
import AppLottie from '@/components/AppLottie';
import { getProverbOfTheDay } from '@/data/proverbs';
import { todayStr } from '@/logic/streak';

export default function LearnScreen() {
  const palette = usePalette();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [statuses, setStatuses] = useState<Map<string, UnitStatus> | null>(null);
  const [expanded, setExpanded] = useState<Set<string> | null>(null);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        const [p, completed] = await Promise.all([getProfile(), getCompletedUnits()]);
        if (cancelled) return;
        const st = computeUnitStatuses(COURSE, new Set(completed.map((u) => u.unit_id)));
        setProfile(p);
        setStatuses(st);
        // Автораскрытие модуля с текущим юнитом (только при первой загрузке).
        const currentId = COURSE.flatMap((m) => m.units).find((u) => st.get(u.id) === 'available')?.id;
        const moduleId = COURSE.find((m) => m.units.some((u) => u.id === currentId))?.id;
        setExpanded((prev) => prev ?? new Set(moduleId ? [moduleId] : []));
      })();
      return () => {
        cancelled = true;
      };
    }, [])
  );

  if (!profile || !statuses || !expanded) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  const allUnits = COURSE.flatMap((m) => m.units);
  const currentUnit = allUnits.find((u) => statuses.get(u.id) === 'available');
  const doneCount = allUnits.filter((u) => statuses.get(u.id) === 'done').length;
  const { level } = getLevelInfo(profile.total_xp);
  const currentIndex = currentUnit ? allUnits.findIndex((u) => u.id === currentUnit.id) : -1;

  function toggleModule(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.statsRow} lightColor="transparent" darkColor="transparent">
        <View style={styles.streakChip} lightColor="transparent" darkColor="transparent">
          <AppLottie
            source={require('@/assets/lottie/streak.json')}
            fallbackEmoji="🔥"
            size={28}
          />
          <Text style={styles.statChip}>{profile.current_streak}</Text>
        </View>
        <Text style={styles.statChip}>⭐ Ур. {level}</Text>
        <Text style={[styles.statChip, { color: palette.textMuted }]}>
          {doneCount}/{allUnits.length} юнитов
        </Text>
      </View>

      <ProverbOfTheDay />

      <Pressable
        style={[styles.labCard, { backgroundColor: palette.surface }]}
        onPress={() => router.push('/word-lab')}>
        <Text style={styles.labEmoji}>🧪</Text>
        <View style={styles.labText} lightColor="transparent" darkColor="transparent">
          <Text style={styles.labTitle}>Лаборатория слов</Text>
          <Text style={[styles.labDesc, { color: palette.textMuted }]}>
            собери слово как конструктор — гармония сама подставит суффиксы
          </Text>
        </View>
        <Text style={[styles.labChevron, { color: palette.textMuted }]}>›</Text>
      </Pressable>

      {currentUnit ? (
        <Pressable
          style={[styles.continueCard, { backgroundColor: palette.primary }]}
          onPress={() => router.push(`/unit/${currentUnit.id}`)}>
          <View style={styles.continueText} lightColor="transparent" darkColor="transparent">
            <Text style={[styles.continueLabel, { color: palette.onPrimary }]}>
              Продолжить обучение
            </Text>
            <Text style={[styles.continueTitle, { color: palette.onPrimary }]}>
              {currentUnit.emoji} {currentUnit.title}
            </Text>
            <Text style={[styles.continueSub, { color: palette.onPrimary }]}>
              Юнит {currentIndex + 1} из {allUnits.length}
            </Text>
          </View>
          <View style={styles.playCircle} lightColor="transparent" darkColor="transparent">
            <Text style={[styles.playIcon, { color: palette.primary }]}>▶</Text>
          </View>
        </Pressable>
      ) : (
        <View style={[styles.continueCard, { backgroundColor: palette.success }]}>
          <View style={styles.continueText} lightColor="transparent" darkColor="transparent">
            <Text style={[styles.continueTitle, { color: palette.onPrimary }]}>
              🎉 Курс пройден!
            </Text>
            <Text style={[styles.continueSub, { color: palette.onPrimary }]}>
              Загляни в «Повторение», чтобы закрепить слова.
            </Text>
          </View>
        </View>
      )}

      {COURSE.map((module) => {
        const isOpen = expanded.has(module.id);
        const total = module.units.length;
        const done = module.units.filter((u) => statuses.get(u.id) === 'done').length;
        const ratio = total > 0 ? done / total : 0;
        return (
          <View key={module.id} style={styles.module} lightColor="transparent" darkColor="transparent">
            <Pressable
              style={[styles.moduleHeader, { backgroundColor: palette.surface }]}
              onPress={() => toggleModule(module.id)}>
              <View style={styles.moduleHeaderText} lightColor="transparent" darkColor="transparent">
                <Text style={styles.moduleTitle}>{module.title}</Text>
                <View style={[styles.moduleTrack, { backgroundColor: palette.track }]}>
                  <View
                    style={[
                      styles.moduleFill,
                      {
                        width: `${Math.round(ratio * 100)}%`,
                        backgroundColor: ratio >= 1 ? palette.success : palette.primary,
                      },
                    ]}
                  />
                </View>
              </View>
              <Text style={[styles.moduleCount, { color: palette.textMuted }]}>
                {done}/{total}
              </Text>
              <Text style={[styles.chevron, { color: palette.textMuted }]}>
                {isOpen ? '▾' : '▸'}
              </Text>
            </Pressable>

            {isOpen &&
              module.units.map((unit) => {
                const status = statuses.get(unit.id) ?? 'locked';
                return (
                  <Pressable
                    key={unit.id}
                    disabled={status === 'locked'}
                    style={[
                      styles.unitRow,
                      { backgroundColor: palette.surface },
                      status === 'available' && { borderWidth: 2, borderColor: palette.primary },
                      status === 'locked' && styles.unitLocked,
                    ]}
                    onPress={() => router.push(`/unit/${unit.id}`)}>
                    <Text style={styles.unitEmoji}>{unit.emoji}</Text>
                    <Text style={styles.unitTitle}>{unit.title}</Text>
                    <Text style={styles.unitStatus}>
                      {status === 'done' ? '✅' : status === 'available' ? '▶️' : '🔒'}
                    </Text>
                  </Pressable>
                );
              })}
          </View>
        );
      })}
    </ScrollView>
  );
}

function ProverbOfTheDay() {
  const palette = usePalette();
  const [expanded, setExpanded] = useState(false);
  const proverb = getProverbOfTheDay(todayStr());

  return (
    <Pressable
      style={[styles.proverbCard, { borderColor: palette.primary }]}
      onPress={() => setExpanded((e) => !e)}>
      <View style={styles.proverbHeader} lightColor="transparent" darkColor="transparent">
        <Text style={[styles.proverbLabel, { color: palette.primary }]}>🧿 Пословица дня</Text>
        <SpeakButton text={proverb.tr} size="sm" />
      </View>
      <Text style={styles.proverbTr}>{proverb.tr}</Text>
      {expanded ? (
        <View lightColor="transparent" darkColor="transparent">
          <Text style={[styles.proverbMeaning, { color: palette.textMuted }]}>
            {proverb.meaning}
          </Text>
          {proverb.ru_equivalent && (
            <Text style={[styles.proverbEquivalent, { color: palette.primary }]}>
              ≈ {proverb.ru_equivalent}
            </Text>
          )}
        </View>
      ) : (
        <Text style={[styles.proverbHint, { color: palette.textMuted }]}>
          нажмите, чтобы раскрыть смысл
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  proverbCard: {
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    gap: Spacing.xs,
  },
  proverbHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  proverbLabel: {
    fontSize: FontSize.caption,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  proverbTr: {
    fontSize: FontSize.medium,
    fontWeight: '700',
    lineHeight: 22,
  },
  proverbHint: {
    fontSize: FontSize.caption,
    fontStyle: 'italic',
  },
  proverbMeaning: {
    fontSize: FontSize.body,
    lineHeight: 20,
    marginTop: Spacing.xs,
  },
  proverbEquivalent: {
    fontSize: FontSize.body,
    fontWeight: '600',
    marginTop: Spacing.xs,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
  },
  labEmoji: {
    fontSize: 28,
  },
  labText: {
    flex: 1,
    gap: 2,
  },
  labTitle: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
  labDesc: {
    fontSize: FontSize.caption,
  },
  labChevron: {
    fontSize: FontSize.title,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.lg,
    alignItems: 'center',
  },
  streakChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statChip: {
    fontSize: FontSize.medium,
    fontWeight: '600',
  },
  continueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.xl,
    borderRadius: Radius.xl,
    gap: Spacing.md,
  },
  continueText: {
    flex: 1,
    gap: 2,
  },
  continueLabel: {
    fontSize: FontSize.caption,
    fontWeight: '700',
    opacity: 0.85,
    textTransform: 'uppercase',
  },
  continueTitle: {
    fontSize: FontSize.large,
    fontWeight: '700',
  },
  continueSub: {
    fontSize: FontSize.small,
    opacity: 0.85,
  },
  playCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    fontSize: 20,
    marginLeft: 3,
  },
  module: {
    gap: Spacing.sm,
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    gap: Spacing.md,
  },
  moduleHeaderText: {
    flex: 1,
    gap: 6,
  },
  moduleTitle: {
    fontSize: FontSize.small,
    fontWeight: '700',
  },
  moduleTrack: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  moduleFill: {
    height: '100%',
    borderRadius: 2,
  },
  moduleCount: {
    fontSize: FontSize.caption,
    fontWeight: '600',
  },
  chevron: {
    fontSize: FontSize.medium,
  },
  unitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    gap: Spacing.md,
  },
  unitLocked: {
    opacity: 0.5,
  },
  unitEmoji: {
    fontSize: 22,
  },
  unitTitle: {
    flex: 1,
    fontSize: FontSize.medium,
    fontWeight: '600',
  },
  unitStatus: {
    fontSize: FontSize.medium,
  },
});
