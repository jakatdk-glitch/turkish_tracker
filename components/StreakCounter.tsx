import { StyleSheet } from 'react-native';

import { Text, View, usePalette } from '@/components/Themed';
import { FontSize, Spacing } from '@/constants/Tokens';

export default function StreakCounter({ streak, broken }: { streak: number; broken: boolean }) {
  const palette = usePalette();

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{broken ? '💔' : '🔥'}</Text>
      <View style={styles.textBlock}>
        <Text style={styles.count}>{streak}</Text>
        <Text style={[styles.label, { color: palette.textMuted }]}>
          {streak === 1 ? 'день подряд' : 'дней подряд'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  emoji: {
    fontSize: 36,
  },
  textBlock: {
    justifyContent: 'center',
  },
  count: {
    fontSize: FontSize.display,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  label: {
    fontSize: FontSize.small,
  },
});
