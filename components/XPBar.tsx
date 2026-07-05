import { StyleSheet } from 'react-native';

import { getLevelInfo } from '@/logic/xp';
import { Text, View, usePalette } from '@/components/Themed';
import { FontSize } from '@/constants/Tokens';

export default function XPBar({ totalXp }: { totalXp: number }) {
  const palette = usePalette();
  const { level, xpIntoLevel, xpForNextLevel, progress } = getLevelInfo(totalXp);

  return (
    <View style={styles.container}>
      <View style={styles.header} lightColor="transparent" darkColor="transparent">
        <Text style={styles.level}>Уровень {level}</Text>
        <Text style={[styles.xpText, { color: palette.textMuted }]}>
          {xpIntoLevel} / {xpForNextLevel} XP
        </Text>
      </View>
      <View style={[styles.track, { backgroundColor: palette.track }]}>
        <View
          style={[
            styles.fill,
            { width: `${Math.round(progress * 100)}%`, backgroundColor: palette.primary },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  level: {
    fontWeight: '600',
  },
  xpText: {
    fontSize: FontSize.caption,
  },
  track: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 5,
  },
});
