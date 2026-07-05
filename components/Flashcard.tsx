import { useState } from 'react';
import { Alert, Platform, Pressable, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { Text, View, usePalette } from '@/components/Themed';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';
import { speakTurkish } from '@/logic/tts';
import type { Grade } from '@/logic/spacedRepetition';

// Предупреждаем об отсутствии турецкого голоса один раз за запуск приложения.
let warnedNoTurkishVoice = false;

const GRADES: { grade: Grade; label: string; colorKey: 'danger' | 'warning' | 'success' | 'info' }[] = [
  { grade: 'again', label: 'Забыл', colorKey: 'danger' },
  { grade: 'hard', label: 'Сложно', colorKey: 'warning' },
  { grade: 'good', label: 'Хорошо', colorKey: 'success' },
  { grade: 'easy', label: 'Легко', colorKey: 'info' },
];

const FLIP_DURATION_MS = 350;

export default function Flashcard({
  prompt,
  answer,
  turkishText,
  speakOnlyWhenRevealed = false,
  onGrade,
}: {
  prompt: string;
  answer: string;
  /** Турецкая сторона карточки — именно её озвучиваем. */
  turkishText: string;
  /** Для обратных карточек озвучка до переворота выдала бы ответ. */
  speakOnlyWhenRevealed?: boolean;
  onGrade: (grade: Grade) => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const palette = usePalette();
  const rotation = useSharedValue(0);

  function toggle() {
    const next = !revealed;
    setRevealed(next);
    rotation.value = withTiming(next ? 180 : 0, { duration: FLIP_DURATION_MS });
  }

  async function speak() {
    const spokeTurkish = await speakTurkish(turkishText);
    // Alert работает только на iOS/Android; на web остаётся console.warn из tts.ts.
    if (!spokeTurkish && !warnedNoTurkishVoice && Platform.OS !== 'web') {
      warnedNoTurkishVoice = true;
      Alert.alert(
        'Турецкий голос не найден',
        'Произношение может быть неточным. Установите турецкий голос: ' +
          'Настройки → Система → Синтез речи → голосовые данные Türkçe ' +
          '(на iOS: Настройки → Универсальный доступ → Устный контент → Голоса).'
      );
    }
  }

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1000 }, { rotateY: `${rotation.value}deg` }],
  }));
  const backStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1000 }, { rotateY: `${rotation.value - 180}deg` }],
  }));

  const speakButton = (
    <Pressable
      style={[styles.speakBtn, { borderColor: palette.primary, backgroundColor: palette.surface }]}
      hitSlop={8}
      onPress={speak}>
      <Text style={styles.speakIcon}>🔊</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.cardWrap} onPress={toggle}>
        <Animated.View
          style={[
            styles.face,
            frontStyle,
            { borderColor: palette.primary, backgroundColor: palette.background },
          ]}>
          {!speakOnlyWhenRevealed && speakButton}
          <Text style={styles.word}>{prompt}</Text>
          <Text style={[styles.hint, { color: palette.textMuted }]}>
            {speakOnlyWhenRevealed
              ? 'нажмите, чтобы увидеть слово'
              : 'нажмите, чтобы увидеть перевод'}
          </Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.face,
            backStyle,
            { borderColor: palette.primary, backgroundColor: palette.background },
          ]}>
          {speakButton}
          <Text style={styles.word}>{answer}</Text>
        </Animated.View>
      </Pressable>

      {revealed && (
        <View style={styles.grades} lightColor="transparent" darkColor="transparent">
          {GRADES.map(({ grade: g, label, colorKey }) => (
            <Pressable
              key={g}
              style={[styles.gradeBtn, { backgroundColor: palette[colorKey] }]}
              onPress={() => onGrade(g)}>
              <Text style={[styles.gradeText, { color: palette.onPrimary }]}>{label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.lg,
    alignItems: 'stretch',
  },
  cardWrap: {
    height: 220,
  },
  face: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: Radius.xl,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
    gap: Spacing.sm,
    backfaceVisibility: 'hidden',
  },
  word: {
    fontSize: FontSize.word,
    fontWeight: '700',
    textAlign: 'center',
  },
  speakBtn: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speakIcon: {
    fontSize: 18,
  },
  hint: {
    fontSize: FontSize.caption,
  },
  grades: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  gradeBtn: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: Radius.sm,
    alignItems: 'center',
  },
  gradeText: {
    fontWeight: '600',
    fontSize: FontSize.small,
  },
});
