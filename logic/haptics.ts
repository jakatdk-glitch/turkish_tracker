import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

// Тактильный отклик на ответы. На web не поддерживается — тихо игнорируем.
// Ошибки воспроизведения (нет вибромотора и т.п.) не должны ломать сценарий.
const isSupported = Platform.OS !== 'web';

export function hapticCorrect(): void {
  if (!isSupported) return;
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
}

export function hapticWrong(): void {
  if (!isSupported) return;
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
}
