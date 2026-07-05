import { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput } from 'react-native';
import { useFocusEffect } from 'expo-router';

import { Text, View, usePalette } from '@/components/Themed';
import PhraseRow from '@/components/PhraseRow';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';
import { PHRASEBOOK, findPhrase, type Phrase } from '@/data/phrasebook';
import { listFavorites, toggleFavorite } from '@/db/queries';

// null — список категорий; 'favorites' — избранное; иначе id категории.
type View_ = null | 'favorites' | string;

export default function PhrasebookScreen() {
  const palette = usePalette();
  const [view, setView] = useState<View_>(null);
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      listFavorites('phrase').then((ids) => {
        if (!cancelled) setFavorites(new Set(ids));
      });
      return () => {
        cancelled = true;
      };
    }, [])
  );

  async function onToggleFavorite(id: string) {
    const nowFav = await toggleFavorite('phrase', id);
    setFavorites((prev) => {
      const next = new Set(prev);
      if (nowFav) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const all = PHRASEBOOK.flatMap((c) => c.phrases);
    return all.filter(
      (p) => p.tr.toLowerCase().includes(q) || p.ru.toLowerCase().includes(q)
    );
  }, [query]);

  function renderPhraseList(phrases: Phrase[], emptyText: string) {
    if (phrases.length === 0) {
      return (
        <View style={styles.empty}>
          <Text style={[styles.emptyText, { color: palette.textMuted }]}>{emptyText}</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={phrases}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <PhraseRow
            phrase={item}
            isFavorite={favorites.has(item.id)}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      />
    );
  }

  // Поиск активен — показываем результаты поверх любого view
  if (searchResults) {
    return (
      <View style={styles.container}>
        <SearchBar value={query} onChange={setQuery} />
        {renderPhraseList(searchResults, 'Ничего не найдено')}
      </View>
    );
  }

  if (view === 'favorites') {
    const favPhrases = [...favorites].map(findPhrase).filter((p): p is Phrase => !!p);
    return (
      <View style={styles.container}>
        <BackHeader title="⭐ Избранное" onBack={() => setView(null)} />
        {renderPhraseList(favPhrases, 'Пока нет избранных фраз. Отмечайте их звёздочкой ☆.')}
      </View>
    );
  }

  if (typeof view === 'string') {
    const category = PHRASEBOOK.find((c) => c.id === view);
    if (category) {
      return (
        <View style={styles.container}>
          <BackHeader title={`${category.emoji} ${category.title}`} onBack={() => setView(null)} />
          {renderPhraseList(category.phrases, '')}
        </View>
      );
    }
  }

  // Список категорий
  return (
    <View style={styles.container}>
      <SearchBar value={query} onChange={setQuery} />
      <FlatList
        data={PHRASEBOOK}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          favorites.size > 0 ? (
            <Pressable
              style={[styles.categoryRow, { backgroundColor: palette.surface }]}
              onPress={() => setView('favorites')}>
              <Text style={styles.categoryEmoji}>⭐</Text>
              <Text style={styles.categoryTitle}>Избранное</Text>
              <Text style={[styles.categoryCount, { color: palette.textMuted }]}>
                {favorites.size}
              </Text>
            </Pressable>
          ) : null
        }
        renderItem={({ item }) => (
          <Pressable
            style={[styles.categoryRow, { backgroundColor: palette.surface }]}
            onPress={() => setView(item.id)}>
            <Text style={styles.categoryEmoji}>{item.emoji}</Text>
            <Text style={styles.categoryTitle}>{item.title}</Text>
            <Text style={[styles.categoryCount, { color: palette.textMuted }]}>
              {item.phrases.length}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const palette = usePalette();
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder="Поиск фразы…"
      placeholderTextColor={palette.textMuted}
      style={[
        styles.search,
        { backgroundColor: palette.surface, color: palette.text },
      ]}
    />
  );
}

function BackHeader({ title, onBack }: { title: string; onBack: () => void }) {
  const palette = usePalette();
  return (
    <Pressable style={styles.backHeader} onPress={onBack}>
      <Text style={[styles.backArrow, { color: palette.primary }]}>‹</Text>
      <Text style={styles.backTitle}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  search: {
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: FontSize.medium,
  },
  list: {
    gap: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Radius.md,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryTitle: {
    flex: 1,
    fontSize: FontSize.medium,
    fontWeight: '600',
  },
  categoryCount: {
    fontSize: FontSize.body,
  },
  backHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  backArrow: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 34,
  },
  backTitle: {
    flex: 1,
    fontSize: FontSize.heading,
    fontWeight: '700',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
  },
  emptyText: {
    fontSize: FontSize.body,
    textAlign: 'center',
    lineHeight: 21,
  },
});
