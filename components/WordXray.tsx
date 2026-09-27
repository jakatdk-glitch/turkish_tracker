import { useMemo } from 'react';
import { Modal, Pressable, StyleSheet, View as RNView } from 'react-native';

import { Text, View, usePalette } from '@/components/Themed';
import SpeakButton from '@/components/SpeakButton';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';
import type { MorphKind } from '@/logic/morphology';
import { analyzeWord, cleanToken } from '@/logic/wordXray';
import { getXrayLexicon } from '@/logic/xrayLexicon';

function useKindColor() {
  const palette = usePalette();
  return (kind: MorphKind): string => {
    switch (kind) {
      case 'root':
        return palette.text;
      case 'plural':
        return palette.success;
      case 'possessive':
        return palette.info;
      case 'case':
        return palette.warning;
    }
  };
}

/**
 * Содержимое «рентгена»: слово, разрезанное на цветные морфемы, с глоссами,
 * переводом и заметками о чередованиях. Без собственной карточки-подложки —
 * вставляется и в модалку, и инлайн (лаборатория слов).
 */
export function XrayContent({ word }: { word: string }) {
  const palette = usePalette();
  const kindColor = useKindColor();
  const result = useMemo(() => analyzeWord(word, getXrayLexicon()), [word]);

  if (!result) {
    return (
      <View style={styles.container} lightColor="transparent" darkColor="transparent">
        <View style={styles.wordRow} lightColor="transparent" darkColor="transparent">
          <Text style={styles.word}>{cleanToken(word) || word}</Text>
          <SpeakButton text={cleanToken(word) || word} size="sm" />
        </View>
        <Text style={[styles.fallback, { color: palette.textMuted }]}>
          Разобрать не получилось 🤷 Пока рентген понимает именные суффиксы: мн. число,
          притяжательность («чей?») и падежи. Глагольные формы — в планах.
        </Text>
      </View>
    );
  }

  const suffixGlosses = result.parts.slice(1).map((p) => p.gloss).join(' + ');
  const translation =
    result.wholeRu ??
    (result.rootRu && suffixGlosses ? `${result.rootRu} + ${suffixGlosses}` : result.rootRu);

  return (
    <View style={styles.container} lightColor="transparent" darkColor="transparent">
      <View style={styles.wordRow} lightColor="transparent" darkColor="transparent">
        <Text style={styles.word}>
          {result.parts.map((p, i) => (
            <Text key={i} style={{ color: kindColor(p.kind) }}>
              {p.text}
            </Text>
          ))}
        </Text>
        <SpeakButton text={result.surface} size="sm" />
      </View>

      {translation && (
        <Text style={[styles.translation, { color: palette.textMuted }]}>{translation}</Text>
      )}

      <View style={styles.partsRow} lightColor="transparent" darkColor="transparent">
        {result.parts.map((p, i) => (
          <RNView key={i} style={[styles.partChip, { borderColor: kindColor(p.kind) }]}>
            <Text style={[styles.partText, { color: kindColor(p.kind) }]}>
              {i === 0 ? p.text : `-${p.text}`}
            </Text>
            <Text style={[styles.partGloss, { color: palette.textMuted }]}>
              {p.gloss || '?'}
            </Text>
          </RNView>
        ))}
      </View>

      {result.notes.length > 0 && (
        <RNView style={[styles.notes, { borderTopColor: palette.track }]}>
          {result.notes.map((n, i) => (
            <Text key={i} style={[styles.noteText, { color: palette.textMuted }]}>
              <Text style={[styles.noteTitle, { color: palette.primary }]}>{n.title}: </Text>
              {n.text}
            </Text>
          ))}
        </RNView>
      )}

      {!result.rootRu && result.parts.length > 1 && (
        <Text style={[styles.disclaimer, { color: palette.textMuted }]}>
          Корень не найден в словаре приложения — разбор автоматический, возможны неточности.
        </Text>
      )}
    </View>
  );
}

/** Нижняя модалка рентгена: открывается тапом по слову в сказке. */
export default function WordXrayModal({
  word,
  onClose,
}: {
  word: string | null;
  onClose: () => void;
}) {
  const palette = usePalette();

  return (
    <Modal visible={word !== null} transparent animationType="fade" onRequestClose={onClose}>
      <RNView style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <RNView
          style={[
            styles.sheet,
            { backgroundColor: palette.background, borderColor: palette.track },
          ]}>
          <RNView style={styles.sheetHeader}>
            <Text style={[styles.sheetTitle, { color: palette.textMuted }]}>
              🔬 Рентген слова
            </Text>
            <Pressable onPress={onClose} hitSlop={12}>
              <Text style={[styles.close, { color: palette.textMuted }]}>✕</Text>
            </Pressable>
          </RNView>
          {word !== null && <XrayContent word={word} />}
        </RNView>
      </RNView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  word: {
    flex: 1,
    fontSize: FontSize.word,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  translation: {
    fontSize: FontSize.medium,
  },
  partsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  partChip: {
    borderWidth: 1.5,
    borderRadius: Radius.sm,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
  },
  partText: {
    fontSize: FontSize.body,
    fontWeight: '700',
  },
  partGloss: {
    fontSize: FontSize.caption,
  },
  notes: {
    borderTopWidth: 1,
    paddingTop: Spacing.md,
    gap: Spacing.sm,
  },
  noteText: {
    fontSize: FontSize.small,
    lineHeight: 19,
  },
  noteTitle: {
    fontWeight: '700',
  },
  fallback: {
    fontSize: FontSize.body,
    lineHeight: 21,
  },
  disclaimer: {
    fontSize: FontSize.caption,
    fontStyle: 'italic',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    borderWidth: 1,
    padding: Spacing.xl,
    paddingBottom: Spacing.xxl,
    gap: Spacing.md,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sheetTitle: {
    fontSize: FontSize.caption,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  close: {
    fontSize: FontSize.heading,
    fontWeight: '600',
  },
});
