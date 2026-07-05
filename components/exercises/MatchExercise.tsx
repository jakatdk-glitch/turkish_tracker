import { useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { Text, View, usePalette } from '@/components/Themed';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';
import type { VocabItem } from '@/logic/course';
import { speakTurkish } from '@/logic/tts';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MatchExercise({
  pairs,
  onResult,
}: {
  pairs: VocabItem[];
  onResult: (correct: boolean) => void;
}) {
  const palette = usePalette();
  const left = useMemo(() => shuffle(pairs.map((p) => p.tr)), [pairs]);
  const right = useMemo(() => shuffle(pairs.map((p) => p.ru)), [pairs]);
  const [selectedTr, setSelectedTr] = useState<string | null>(null);
  const [selectedRu, setSelectedRu] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ tr: string; ru: string } | null>(null);
  const mistakes = useRef(0);

  function tryMatch(tr: string | null, ru: string | null) {
    if (!tr || !ru) return;
    const pair = pairs.find((p) => p.tr === tr);
    if (pair?.ru === ru) {
      const next = new Set(matched).add(tr);
      setMatched(next);
      setSelectedTr(null);
      setSelectedRu(null);
      if (next.size === pairs.length) {
        // короткая пауза, чтобы увидеть последнюю зелёную пару
        setTimeout(() => onResult(mistakes.current === 0), 450);
      }
    } else {
      mistakes.current += 1;
      setWrongPair({ tr, ru });
      setTimeout(() => {
        setWrongPair(null);
        setSelectedTr(null);
        setSelectedRu(null);
      }, 600);
    }
  }

  function pickTr(tr: string) {
    if (matched.has(tr) || wrongPair) return;
    speakTurkish(tr);
    setSelectedTr(tr);
    tryMatch(tr, selectedRu);
  }

  function pickRu(ru: string) {
    if (wrongPair) return;
    const isMatchedRu = pairs.some((p) => p.ru === ru && matched.has(p.tr));
    if (isMatchedRu) return;
    setSelectedRu(ru);
    tryMatch(selectedTr, ru);
  }

  function trStyle(tr: string) {
    if (matched.has(tr)) return { backgroundColor: palette.success };
    if (wrongPair?.tr === tr) return { backgroundColor: palette.danger };
    if (selectedTr === tr) return { borderColor: palette.primary, borderWidth: 2 };
    return null;
  }

  function ruStyle(ru: string) {
    const isMatchedRu = pairs.some((p) => p.ru === ru && matched.has(p.tr));
    if (isMatchedRu) return { backgroundColor: palette.success };
    if (wrongPair?.ru === ru) return { backgroundColor: palette.danger };
    if (selectedRu === ru) return { borderColor: palette.primary, borderWidth: 2 };
    return null;
  }

  function isDone(tr: string) {
    return matched.has(tr);
  }

  return (
    <View style={styles.container} lightColor="transparent" darkColor="transparent">
      <Text style={styles.prompt}>Соедини пары</Text>
      <View style={styles.columns} lightColor="transparent" darkColor="transparent">
        <View style={styles.column} lightColor="transparent" darkColor="transparent">
          {left.map((tr) => (
            <Pressable
              key={tr}
              style={[styles.item, { backgroundColor: palette.surface }, trStyle(tr)]}
              onPress={() => pickTr(tr)}>
              <Text style={[styles.itemText, isDone(tr) && { color: palette.onPrimary }]}>
                {tr}
              </Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.column} lightColor="transparent" darkColor="transparent">
          {right.map((ru) => {
            const done = pairs.some((p) => p.ru === ru && matched.has(p.tr));
            return (
              <Pressable
                key={ru}
                style={[styles.item, { backgroundColor: palette.surface }, ruStyle(ru)]}
                onPress={() => pickRu(ru)}>
                <Text style={[styles.itemText, done && { color: palette.onPrimary }]}>{ru}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.lg,
  },
  prompt: {
    fontSize: FontSize.heading,
    fontWeight: '700',
  },
  columns: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  column: {
    flex: 1,
    gap: Spacing.sm,
  },
  item: {
    padding: Spacing.lg,
    borderRadius: Radius.md,
    minHeight: 56,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: FontSize.body,
    fontWeight: '600',
    textAlign: 'center',
  },
});
