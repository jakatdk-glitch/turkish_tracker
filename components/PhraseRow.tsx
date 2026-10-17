import { memo } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { Text, View, usePalette } from '@/components/Themed';
import SpeakButton from '@/components/SpeakButton';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';
import type { Phrase } from '@/data/phrasebook';

export default memo(function PhraseRow({
  phrase,
  isFavorite,
  onToggleFavorite,
}: {
  phrase: Phrase;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}) {
  const palette = usePalette();

  return (
    <View style={[styles.row, { backgroundColor: palette.surface }]}>
      <SpeakButton text={phrase.tr} />
      <View style={styles.text} lightColor="transparent" darkColor="transparent">
        <Text style={styles.tr}>{phrase.tr}</Text>
        <Text style={[styles.ru, { color: palette.textMuted }]}>{phrase.ru}</Text>
        {phrase.hint && (
          <Text style={[styles.hint, { color: palette.textMuted }]}>{phrase.hint}</Text>
        )}
      </View>
      <Pressable hitSlop={8} onPress={() => onToggleFavorite(phrase.id)}>
        <Text style={styles.star}>{isFavorite ? '⭐' : '☆'}</Text>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Radius.md,
  },
  text: {
    flex: 1,
    gap: 2,
  },
  tr: {
    fontSize: FontSize.medium,
    fontWeight: '600',
  },
  ru: {
    fontSize: FontSize.body,
  },
  hint: {
    fontSize: FontSize.caption,
    fontStyle: 'italic',
  },
  star: {
    fontSize: FontSize.heading,
  },
});
