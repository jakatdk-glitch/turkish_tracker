import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { Text, View, usePalette } from '@/components/Themed';
import Confetti from '@/components/Confetti';
import AppLottie from '@/components/AppLottie';
import ChoiceExercise from '@/components/exercises/ChoiceExercise';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';
import { PROVERBS } from '@/data/proverbs';
import { grantPracticeRewards } from '@/logic/unitCompletion';

const QUIZ_SIZE = 8;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface QuizQuestion {
  prompt: string;
  options: string[];
  correct: number;
  explain: string;
}

function buildQuiz(): QuizQuestion[] {
  const pool = shuffle(PROVERBS).slice(0, QUIZ_SIZE);
  return pool.map((p) => {
    const answer = p.ru_equivalent ?? p.meaning;
    const distractors = shuffle(PROVERBS.filter((x) => x.id !== p.id))
      .map((x) => x.ru_equivalent ?? x.meaning)
      .filter((v) => v !== answer)
      .slice(0, 3);
    const options = shuffle([answer, ...distractors]);
    return { prompt: p.tr, options, correct: options.indexOf(answer), explain: p.meaning };
  });
}

export default function CultureQuizScreen() {
  const palette = usePalette();
  const [quiz] = useState<QuizQuestion[]>(() => buildQuiz());
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const startedAt = useRef(Date.now());

  async function handleResult(correct: boolean) {
    const newScore = score + (correct ? 1 : 0);
    setScore(newScore);
    if (index + 1 < quiz.length) {
      setIndex(index + 1);
      return;
    }
    setDone(true);
    const minutes = Math.round((Date.now() - startedAt.current) / 60000);
    await grantPracticeRewards(minutes);
  }

  if (done) {
    const pct = Math.round((score / quiz.length) * 100);
    return (
      <View style={styles.center}>
        <Confetti />
        <AppLottie
          source={require('@/assets/lottie/success.json')}
          fallbackEmoji="🧿"
          size={140}
          loop={false}
        />
        <Text style={styles.resultTitle}>
          {score} из {quiz.length} ({pct}%)
        </Text>
        <Text style={[styles.resultLine, { color: palette.textMuted }]}>
          {pct >= 80 ? 'Отлично знаешь пословицы!' : pct >= 50 ? 'Неплохо, ещё подтянем!' : 'Загляни в раздел пословиц и попробуй снова.'}
        </Text>
        <Text style={[styles.resultLine, { color: palette.textMuted }]}>+10 XP</Text>
        <Pressable
          style={[styles.primaryBtn, { backgroundColor: palette.primary }]}
          onPress={() => router.back()}>
          <Text style={[styles.primaryBtnText, { color: palette.onPrimary }]}>Готово</Text>
        </Pressable>
      </View>
    );
  }

  const q = quiz[index];
  const progress = index / quiz.length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header} lightColor="transparent" darkColor="transparent">
        <Text style={[styles.headerTitle, { color: palette.textMuted }]}>Квиз по пословицам</Text>
        <Text style={[styles.headerCount, { color: palette.textMuted }]}>
          {index + 1} / {quiz.length}
        </Text>
      </View>
      <View style={[styles.progressTrack, { backgroundColor: palette.track }]}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.round(progress * 100)}%`, backgroundColor: palette.primary },
          ]}
        />
      </View>
      <Text style={[styles.hint, { color: palette.textMuted }]}>Что означает эта пословица?</Text>
      <ChoiceExercise
        key={index}
        prompt={q.prompt}
        promptIsTurkish
        options={q.options}
        correct={q.correct}
        explain={q.explain}
        onResult={handleResult}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
    gap: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSize.small,
    fontWeight: '600',
  },
  headerCount: {
    fontSize: FontSize.small,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  hint: {
    fontSize: FontSize.body,
  },
  resultTitle: {
    fontSize: FontSize.title,
    fontWeight: '700',
    textAlign: 'center',
  },
  resultLine: {
    fontSize: FontSize.body,
    textAlign: 'center',
    lineHeight: 21,
  },
  primaryBtn: {
    marginTop: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
    borderRadius: Radius.lg,
  },
  primaryBtnText: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
});
