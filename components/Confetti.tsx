import { useEffect, useMemo, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { usePalette } from '@/components/Themed';

const PIECE_COUNT = 42;
// Максимум задержки (700) + длительности (3500) с запасом.
const LIFETIME_MS = 4500;

function Piece({ color, fallHeight }: { color: string; fallHeight: number }) {
  const progress = useSharedValue(0);
  const cfg = useMemo(
    () => ({
      left: Math.random() * 100,
      drift: (Math.random() - 0.5) * 120,
      rotate: (Math.random() - 0.5) * 720,
      width: 8 + Math.random() * 6,
      delay: Math.random() * 700,
      duration: 2000 + Math.random() * 1500,
    }),
    []
  );

  useEffect(() => {
    progress.value = withDelay(
      cfg.delay,
      withTiming(1, { duration: cfg.duration, easing: Easing.in(Easing.quad) })
    );
  }, [cfg, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: progress.value * fallHeight },
      { translateX: progress.value * cfg.drift },
      { rotate: `${progress.value * cfg.rotate}deg` },
    ],
    opacity: progress.value < 0.8 ? 1 : Math.max(0, (1 - progress.value) / 0.2),
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: -16,
          left: `${cfg.left}%`,
          width: cfg.width,
          height: cfg.width * 0.6,
          borderRadius: 2,
          backgroundColor: color,
        },
        animatedStyle,
      ]}
    />
  );
}

/** Одноразовый салют из конфетти на весь контейнер. Рендерить поверх контента. */
export default function Confetti() {
  const palette = usePalette();
  const fallHeight = Dimensions.get('window').height + 32;
  const colors = [palette.primary, palette.success, palette.warning, palette.danger, palette.info];
  const [done, setDone] = useState(false);

  // Отыгравшие кусочки убираем, чтобы оверлей не висел поверх прокручиваемого экрана.
  useEffect(() => {
    const t = setTimeout(() => setDone(true), LIFETIME_MS);
    return () => clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <View style={[StyleSheet.absoluteFill, styles.overlay]}>
      {Array.from({ length: PIECE_COUNT }, (_, i) => (
        <Piece key={i} color={colors[i % colors.length]} fallHeight={fallHeight} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    pointerEvents: 'none',
  },
});
