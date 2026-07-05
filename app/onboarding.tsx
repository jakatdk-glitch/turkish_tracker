import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Text, View, usePalette } from '@/components/Themed';
import AppLottie from '@/components/AppLottie';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';
import { setMeta } from '@/db/queries';

const SLIDES = [
  {
    emoji: '🇹🇷',
    lottie: require('@/assets/lottie/onboarding-welcome.json'),
    title: 'Merhaba!',
    text:
      'Это твой карманный самоучитель турецкого — с нуля до первых разговоров. ' +
      'Полностью офлайн, без рекламы и аккаунтов.',
  },
  {
    emoji: '🎓',
    lottie: require('@/assets/lottie/onboarding-learn.json'),
    title: 'Учись по юнитам',
    text:
      'Каждый юнит: короткая теория → практика с разными упражнениями → тест. ' +
      'Сдал тест — открывается следующий юнит.',
  },
  {
    emoji: '🔁',
    lottie: require('@/assets/lottie/onboarding-review.json'),
    title: 'Не забывай слова',
    text:
      'Выученные слова возвращаются на вкладке «Повторение» по умному расписанию — ' +
      'как раз перед тем, как ты их забудешь.',
  },
  {
    emoji: '🧿',
    lottie: require('@/assets/lottie/onboarding-culture.json'),
    title: 'Живой язык',
    text:
      'В «Разговорнике» — фразы для поездки, а в «Культуре» — пословицы и скороговорки. ' +
      'Слушай произношение везде по кнопке 🔊.',
  },
];

export default function OnboardingScreen() {
  const palette = usePalette();
  const [step, setStep] = useState(0);
  const isLast = step === SLIDES.length - 1;
  const slide = SLIDES[step];

  async function finish() {
    await setMeta('onboarded', '1');
    router.replace('/');
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.skip} onPress={finish}>
        <Text style={[styles.skipText, { color: palette.textMuted }]}>Пропустить</Text>
      </Pressable>

      <Animated.View key={step} entering={FadeIn.duration(250)} style={styles.slide}>
        <AppLottie source={slide.lottie} fallbackEmoji={slide.emoji} size={180} />
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={[styles.text, { color: palette.textMuted }]}>{slide.text}</Text>
      </Animated.View>

      <View style={styles.footer} lightColor="transparent" darkColor="transparent">
        <View style={styles.dots} lightColor="transparent" darkColor="transparent">
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i === step ? palette.primary : palette.track },
              ]}
            />
          ))}
        </View>
        <Pressable
          style={[styles.nextBtn, { backgroundColor: palette.primary }]}
          onPress={() => (isLast ? finish() : setStep((s) => s + 1))}>
          <Text style={[styles.nextBtnText, { color: palette.onPrimary }]}>
            {isLast ? 'Начать' : 'Далее'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.xl,
  },
  skip: {
    alignSelf: 'flex-end',
    padding: Spacing.sm,
  },
  skipText: {
    fontSize: FontSize.body,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  emoji: {
    fontSize: 72,
  },
  title: {
    fontSize: FontSize.display,
    fontWeight: '800',
    textAlign: 'center',
  },
  text: {
    fontSize: FontSize.large,
    textAlign: 'center',
    lineHeight: 26,
  },
  footer: {
    gap: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  nextBtn: {
    paddingVertical: Spacing.lg,
    borderRadius: Radius.lg,
    alignItems: 'center',
  },
  nextBtnText: {
    fontSize: FontSize.large,
    fontWeight: '700',
  },
});
