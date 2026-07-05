import { StyleSheet } from 'react-native';

import { Text } from '@/components/Themed';
import type { AppLottieProps } from './AppLottie';

/**
 * Веб-версия: lottie-react-native капризен в Expo web, поэтому здесь просто
 * показываем эмодзи-запаску. Нативный модуль на вебе не импортируется вообще.
 */
export default function AppLottie({ size = 160, fallbackEmoji = '✨' }: AppLottieProps) {
  return (
    <Text style={[styles.emoji, { fontSize: size * 0.5, lineHeight: size }]}>{fallbackEmoji}</Text>
  );
}

const styles = StyleSheet.create({
  emoji: {
    textAlign: 'center',
  },
});
