import { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { Text, usePalette } from '@/components/Themed';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';
import { playCorrect, playWrong } from '@/logic/sound';
import { hapticCorrect, hapticWrong } from '@/logic/haptics';

/**
 * Единая карточка результата упражнения с анимацией-наградой: при появлении
 * пружинит, а «галочка» правильного ответа делает радостный отскок.
 */
export default function FeedbackCard({
  correct,
  correctText,
  explain,
  onNext,
}: {
  correct: boolean;
  correctText: string;
  explain?: string;
  onNext: () => void;
}) {
  const palette = usePalette();
  const enter = useSharedValue(0);
  const pop = useSharedValue(1);

  useEffect(() => {
    enter.value = withTiming(1, { duration: 220, easing: Easing.out(Easing.quad) });
    if (correct) {
      pop.value = withSequence(
        withTiming(1.25, { duration: 140 }),
        withSpring(1, { damping: 6, stiffness: 200 })
      );
      playCorrect();
      hapticCorrect();
    } else {
      playWrong();
      hapticWrong();
    }
  }, [correct, enter, pop]);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: enter.value,
    transform: [{ translateY: (1 - enter.value) * 12 }],
  }));
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pop.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.feedback,
        cardStyle,
        { backgroundColor: palette.surface, borderColor: correct ? palette.success : palette.danger },
      ]}>
      <Text style={styles.title}>
        <Animated.Text style={iconStyle}>{correct ? '✅' : '❌'}</Animated.Text>
        {correct ? ' Верно!' : ` Правильно: ${correctText}`}
      </Text>
      {explain ? (
        <Text style={[styles.explain, { color: palette.textMuted }]}>{explain}</Text>
      ) : null}
      <Pressable style={[styles.nextBtn, { backgroundColor: palette.primary }]} onPress={onNext}>
        <Text style={[styles.nextBtnText, { color: palette.onPrimary }]}>Дальше</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  feedback: {
    padding: Spacing.lg,
    borderRadius: Radius.md,
    borderLeftWidth: 3,
    gap: Spacing.sm,
  },
  title: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
  explain: {
    fontSize: FontSize.body,
    lineHeight: 20,
  },
  nextBtn: {
    marginTop: Spacing.xs,
    paddingVertical: Spacing.md,
    borderRadius: Radius.sm,
    alignItems: 'center',
  },
  nextBtnText: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
});
