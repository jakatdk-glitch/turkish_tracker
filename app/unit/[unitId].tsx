import { useCallback, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet } from 'react-native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';

import { Text, View, usePalette } from '@/components/Themed';
import Confetti from '@/components/Confetti';
import AppLottie from '@/components/AppLottie';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';
import { COURSE } from '@/data/course/manifest';
import { getUnitContent } from '@/data/course/units';
import type { TheoryBlock } from '@/logic/course';
import { getCompletedUnits } from '@/db/queries';
import { completeUnitWithRewards, UNIT_XP } from '@/logic/unitCompletion';
import SpeakButton from '@/components/SpeakButton';

export default function UnitScreen() {
  const { unitId } = useLocalSearchParams<{ unitId: string }>();
  const palette = usePalette();
  const [alreadyDone, setAlreadyDone] = useState<boolean | null>(null);
  const [justCompleted, setJustCompleted] = useState(false);
  const [saving, setSaving] = useState(false);

  const meta = COURSE.flatMap((m) => m.units).find((u) => u.id === unitId);
  const content = unitId ? getUnitContent(unitId) : null;

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      getCompletedUnits().then((rows) => {
        if (!cancelled) setAlreadyDone(rows.some((r) => r.unit_id === unitId));
      });
      return () => {
        cancelled = true;
      };
    }, [unitId])
  );

  async function handleComplete() {
    if (!unitId) return;
    setSaving(true);
    await completeUnitWithRewards(unitId, { durationMinutes: 10 });
    setSaving(false);
    setJustCompleted(true);
  }

  if (!meta) {
    return (
      <View style={styles.center}>
        <Text>Юнит не найден</Text>
      </View>
    );
  }

  if (alreadyDone === null) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (justCompleted) {
    return (
      <View style={styles.center}>
        <Confetti />
        <AppLottie source={require('@/assets/lottie/success.json')} fallbackEmoji="🎉" size={140} loop={false} />
        <Text style={styles.doneTitle}>Юнит пройден!</Text>
        <Text style={[styles.doneLine, { color: palette.textMuted }]}>
          +{UNIT_XP} XP · следующий юнит открыт
        </Text>
        <Pressable
          style={[styles.completeBtn, { backgroundColor: palette.primary }]}
          onPress={() => router.back()}>
          <Text style={[styles.completeBtnText, { color: palette.onPrimary }]}>К пути</Text>
        </Pressable>
      </View>
    );
  }

  if (!content) {
    return (
      <View style={styles.center}>
        <Text style={styles.doneEmoji}>{meta.emoji}</Text>
        <Text style={styles.doneTitle}>{meta.title}</Text>
        <Text style={[styles.doneLine, { color: palette.textMuted }]}>
          Контент юнита в разработке — появится в следующем обновлении.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {meta.emoji} {content.title}
      </Text>

      {content.theory.map((block, i) => (
        <TheoryBlockView key={i} block={block} />
      ))}

      <Text style={styles.sectionTitle}>Словарь юнита</Text>
      <View style={[styles.vocabCard, { backgroundColor: palette.surface }]}>
        {content.vocab.map((item) => (
          <View
            key={item.tr}
            style={styles.vocabRow}
            lightColor="transparent"
            darkColor="transparent">
            <SpeakButton text={item.tr} size="sm" />
            <Text style={styles.vocabTr}>{item.tr}</Text>
            <Text style={[styles.vocabRu, { color: palette.textMuted }]}>{item.ru}</Text>
          </View>
        ))}
      </View>

      {content.exercises.length > 0 ? (
        <>
          {alreadyDone && (
            <View style={[styles.completeBtn, { backgroundColor: palette.surface }]}>
              <Text style={styles.completeBtnText}>✅ Юнит уже пройден</Text>
            </View>
          )}
          <Pressable
            style={[styles.completeBtn, { backgroundColor: palette.primary }]}
            onPress={() => router.push(`/practice/${unitId}`)}>
            <Text style={[styles.completeBtnText, { color: palette.onPrimary }]}>
              {alreadyDone ? 'Повторить практику' : 'Начать практику'}
            </Text>
          </Pressable>
          {!alreadyDone && (
            <Pressable
              style={[styles.testBtn, { borderColor: palette.primary }]}
              onPress={() => router.push(`/test/${unitId}`)}>
              <Text style={[styles.testBtnText, { color: palette.primary }]}>
                Сразу к тесту
              </Text>
            </Pressable>
          )}
        </>
      ) : alreadyDone ? (
        <View style={[styles.completeBtn, { backgroundColor: palette.surface }]}>
          <Text style={styles.completeBtnText}>✅ Юнит уже пройден</Text>
        </View>
      ) : (
        <Pressable
          style={[styles.completeBtn, { backgroundColor: palette.primary }]}
          disabled={saving}
          onPress={handleComplete}>
          <Text style={[styles.completeBtnText, { color: palette.onPrimary }]}>
            {saving ? 'Сохранение…' : 'Завершить юнит'}
          </Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

function TheoryBlockView({ block }: { block: TheoryBlock }) {
  const palette = usePalette();

  switch (block.type) {
    case 'text':
      return <Text style={styles.paragraph}>{block.text}</Text>;
    case 'tip':
      return (
        <View style={[styles.tip, { backgroundColor: palette.surface, borderColor: palette.warning }]}>
          <Text style={styles.paragraph}>💡 {block.text}</Text>
        </View>
      );
    case 'table':
      return (
        <View style={[styles.table, { backgroundColor: palette.surface }]}>
          {block.title && <Text style={styles.tableTitle}>{block.title}</Text>}
          <View style={styles.tableRow} lightColor="transparent" darkColor="transparent">
            {block.headers.map((h) => (
              <Text key={h} style={[styles.tableHeader, { color: palette.textMuted }]}>
                {h}
              </Text>
            ))}
          </View>
          {block.rows.map((row, i) => (
            <View key={i} style={styles.tableRow} lightColor="transparent" darkColor="transparent">
              {row.map((cell, j) => (
                <Text key={j} style={j === 0 ? styles.tableCellBold : styles.tableCell}>
                  {cell}
                </Text>
              ))}
            </View>
          ))}
        </View>
      );
    case 'examples':
      return (
        <View style={[styles.table, { backgroundColor: palette.surface }]}>
          {block.title && <Text style={styles.tableTitle}>{block.title}</Text>}
          {block.items.map((item) => (
            <View
              key={item.tr}
              style={styles.exampleRow}
              lightColor="transparent"
              darkColor="transparent">
              <SpeakButton text={item.tr} size="sm" />
              <Text style={styles.vocabTr}>{item.tr}</Text>
              <Text style={[styles.vocabRu, { color: palette.textMuted }]}>{item.ru}</Text>
            </View>
          ))}
        </View>
      );
  }
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
  title: {
    fontSize: FontSize.title,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: FontSize.heading,
    fontWeight: '700',
    marginTop: Spacing.sm,
  },
  paragraph: {
    fontSize: FontSize.body,
    lineHeight: 22,
  },
  tip: {
    padding: Spacing.lg,
    borderRadius: Radius.md,
    borderLeftWidth: 3,
  },
  table: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  tableTitle: {
    fontWeight: '700',
    fontSize: FontSize.medium,
    marginBottom: Spacing.xs,
  },
  tableRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  tableHeader: {
    flex: 1,
    fontSize: FontSize.caption,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  tableCell: {
    flex: 1,
    fontSize: FontSize.body,
  },
  tableCellBold: {
    flex: 1,
    fontSize: FontSize.body,
    fontWeight: '700',
  },
  exampleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  vocabCard: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  vocabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  vocabSpeak: {
    fontSize: FontSize.medium,
  },
  vocabTr: {
    flex: 1,
    fontSize: FontSize.medium,
    fontWeight: '600',
  },
  vocabRu: {
    flex: 1,
    fontSize: FontSize.body,
  },
  doneEmoji: {
    fontSize: 48,
  },
  doneTitle: {
    fontSize: FontSize.title,
    fontWeight: '700',
  },
  doneLine: {
    fontSize: FontSize.body,
    textAlign: 'center',
  },
  completeBtn: {
    marginTop: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
    borderRadius: Radius.lg,
    alignItems: 'center',
  },
  completeBtnText: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
  testBtn: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxl,
    borderRadius: Radius.lg,
    borderWidth: 2,
    alignItems: 'center',
  },
  testBtnText: {
    fontSize: FontSize.medium,
    fontWeight: '600',
  },
});
