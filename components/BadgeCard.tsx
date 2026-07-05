import { StyleSheet } from 'react-native';

import { Text, View, usePalette } from '@/components/Themed';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';

export default function BadgeCard({
  title,
  description,
  unlocked,
}: {
  title: string;
  description: string;
  unlocked: boolean;
}) {
  const palette = usePalette();

  return (
    <View
      style={[styles.container, { backgroundColor: palette.surface }, !unlocked && styles.locked]}>
      <Text style={styles.emoji}>{unlocked ? '🏆' : '🔒'}</Text>
      <View style={styles.textBlock} lightColor="transparent" darkColor="transparent">
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.description, { color: palette.textMuted }]}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.md,
  },
  locked: {
    opacity: 0.6,
  },
  emoji: {
    fontSize: 28,
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontWeight: '600',
    fontSize: FontSize.body,
  },
  description: {
    fontSize: FontSize.caption,
  },
});
