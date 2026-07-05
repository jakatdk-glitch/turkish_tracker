import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { Text, View, usePalette } from '@/components/Themed';
import SpeakButton from '@/components/SpeakButton';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';
import type { Proverb } from '@/data/proverbs';

export default function ProverbCard({
  proverb,
  isFavorite,
  onToggleFavorite,
  startExpanded = false,
}: {
  proverb: Proverb;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  startExpanded?: boolean;
}) {
  const palette = usePalette();
  const [expanded, setExpanded] = useState(startExpanded);

  return (
    <Pressable
      style={[styles.card, { backgroundColor: palette.surface }]}
      onPress={() => setExpanded((e) => !e)}>
      <View style={styles.header} lightColor="transparent" darkColor="transparent">
        <Text style={styles.tr}>{proverb.tr}</Text>
        <View style={styles.actions} lightColor="transparent" darkColor="transparent">
          <SpeakButton text={proverb.tr} size="sm" />
          <Pressable hitSlop={8} onPress={() => onToggleFavorite(proverb.id)}>
            <Text style={styles.icon}>{isFavorite ? '⭐' : '☆'}</Text>
          </Pressable>
        </View>
      </View>

      {expanded ? (
        <View style={styles.body} lightColor="transparent" darkColor="transparent">
          <Text style={[styles.label, { color: palette.textMuted }]}>Дословно</Text>
          <Text style={styles.value}>{proverb.literal}</Text>
          <Text style={[styles.label, { color: palette.textMuted }]}>Смысл</Text>
          <Text style={styles.value}>{proverb.meaning}</Text>
          {proverb.ru_equivalent && (
            <>
              <Text style={[styles.label, { color: palette.textMuted }]}>Русский аналог</Text>
              <Text style={[styles.value, styles.equivalent, { color: palette.primary }]}>
                {proverb.ru_equivalent}
              </Text>
            </>
          )}
        </View>
      ) : (
        <Text style={[styles.tapHint, { color: palette.textMuted }]}>
          нажмите, чтобы раскрыть смысл
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.lg,
    borderRadius: Radius.md,
    gap: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  tr: {
    flex: 1,
    fontSize: FontSize.medium,
    fontWeight: '700',
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  icon: {
    fontSize: FontSize.heading,
  },
  tapHint: {
    fontSize: FontSize.caption,
    fontStyle: 'italic',
  },
  body: {
    gap: 2,
  },
  label: {
    fontSize: FontSize.caption,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: Spacing.sm,
  },
  value: {
    fontSize: FontSize.body,
    lineHeight: 20,
  },
  equivalent: {
    fontWeight: '600',
  },
});
