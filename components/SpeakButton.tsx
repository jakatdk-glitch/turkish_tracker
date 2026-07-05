import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { Text, usePalette } from '@/components/Themed';
import { speakTurkish } from '@/logic/tts';

/**
 * Кнопка озвучки турецкого текста. Оформлена как явно нажимаемый кружок
 * (обводка + мягкая заливка цвета primary), чтобы пользователь понимал:
 * на неё можно нажать.
 */
export default function SpeakButton({
  text,
  rate,
  size = 'md',
  style,
}: {
  text: string;
  rate?: number;
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
}) {
  const palette = usePalette();
  const dim = size === 'sm' ? 32 : 40;

  return (
    <Pressable
      hitSlop={8}
      onPress={() => speakTurkish(text, rate)}
      style={({ pressed }) => [
        styles.button,
        {
          width: dim,
          height: dim,
          borderRadius: dim / 2,
          borderColor: palette.primary,
          backgroundColor: palette.surface,
          opacity: pressed ? 0.55 : 1,
        },
        style,
      ]}>
      <Text style={{ fontSize: size === 'sm' ? 15 : 18 }}>🔊</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
});
