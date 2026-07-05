import { useCallback, useRef } from 'react';
import LottieView from 'lottie-react-native';
import { useFocusEffect } from 'expo-router';
import type { StyleProp, ViewStyle } from 'react-native';

export interface AppLottieProps {
  /** Источник анимации: require('@/assets/lottie/xxx.json'). */
  source: unknown;
  size?: number;
  loop?: boolean;
  autoPlay?: boolean;
  /** Эмодзи-запасной вариант — используется только веб-версией. */
  fallbackEmoji?: string;
  style?: StyleProp<ViewStyle>;
}

export default function AppLottie({
  source,
  size = 160,
  loop = true,
  autoPlay = true,
  style,
}: AppLottieProps) {
  const ref = useRef<LottieView>(null);

  // В expo-router экраны вкладок остаются смонтированными, поэтому зацикленная
  // анимация продолжала бы крутиться даже на невидимом экране и грузить GPU.
  // Играем только пока экран в фокусе, при уходе — ставим на паузу.
  useFocusEffect(
    useCallback(() => {
      if (autoPlay) ref.current?.play();
      return () => ref.current?.pause();
    }, [autoPlay])
  );

  return (
    <LottieView
      ref={ref}
      source={source as never}
      autoPlay={false}
      loop={loop}
      style={[{ width: size, height: size }, style]}
    />
  );
}
