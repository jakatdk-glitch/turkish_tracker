import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, router, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { initDb } from '@/db/db';
import { seedContent } from '@/db/seed';
import { getMeta } from '@/db/queries';
import { initSound } from '@/logic/sound';
import { ensureStreakReminder, setupNotificationHandler } from '@/notifications/reminders';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

setupNotificationHandler();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [dbReady, setDbReady] = useState(false);
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    initDb()
      .then(seedContent)
      .then(() => getMeta('onboarded'))
      .then((flag) => {
        setOnboarded(flag === '1');
        setDbReady(true);
      });
  }, []);

  useEffect(() => {
    if (!dbReady) return;
    ensureStreakReminder().catch((e) => console.warn('Streak reminder setup failed:', e));
    initSound();
  }, [dbReady]);

  useEffect(() => {
    if (loaded && dbReady) {
      SplashScreen.hideAsync();
    }
  }, [loaded, dbReady]);

  if (!loaded || !dbReady) {
    return null;
  }

  return <RootLayoutNav onboarded={onboarded === true} />;
}

function RootLayoutNav({ onboarded }: { onboarded: boolean }) {
  const colorScheme = useColorScheme();

  // На первом запуске (флаг не установлен) отправляем на онбординг.
  useEffect(() => {
    if (!onboarded) router.replace('/onboarding');
  }, [onboarded]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="session/[lessonId]" options={{ title: 'Сессия' }} />
        <Stack.Screen name="unit/[unitId]" options={{ title: 'Юнит' }} />
        <Stack.Screen name="practice/[unitId]" options={{ title: 'Практика' }} />
        <Stack.Screen name="test/[unitId]" options={{ title: 'Тест' }} />
        <Stack.Screen name="tale/[taleId]" options={{ title: 'Сказка' }} />
        <Stack.Screen name="culture-quiz" options={{ title: 'Квиз' }} />
      </Stack>
    </ThemeProvider>
  );
}
