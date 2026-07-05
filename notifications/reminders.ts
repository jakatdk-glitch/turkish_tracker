import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

const REMINDER_ID = 'streak-reminder';
const REMINDER_HOUR = 20;
const CHANNEL_ID = 'reminders';

// expo-notifications не поддерживает web.
const isSupported = Platform.OS !== 'web';

export function setupNotificationHandler(): void {
  if (!isSupported) return;
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

/**
 * Ставит (или переставляет) ежедневное напоминание «не сломай стрик» на 20:00.
 * Ничего не делает на web или без разрешения на уведомления.
 */
export async function ensureStreakReminder(): Promise<void> {
  if (!isSupported) return;

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'Напоминания о занятиях',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  // Пересоздаём с фиксированным id, чтобы не плодить дубликаты между запусками.
  await Notifications.cancelScheduledNotificationAsync(REMINDER_ID).catch(() => {});
  await Notifications.scheduleNotificationAsync({
    identifier: REMINDER_ID,
    content: {
      title: 'Не сломай стрик! 🔥',
      body: 'Пройди сегодняшнюю сессию турецкого — 20 минут достаточно.',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: REMINDER_HOUR,
      minute: 0,
      channelId: CHANNEL_ID,
    },
  });
}
