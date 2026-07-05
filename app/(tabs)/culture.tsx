import { useCallback, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet } from 'react-native';
import { router, useFocusEffect } from 'expo-router';

import { Text, View, usePalette } from '@/components/Themed';
import ProverbCard from '@/components/ProverbCard';
import SpeakButton from '@/components/SpeakButton';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';
import { PROVERBS } from '@/data/proverbs';
import { TWISTERS, type Twister } from '@/data/twisters';
import { CULTURE, type CultureTopic } from '@/data/culture';
import { TALES } from '@/data/tales';
import { listFavorites, listReadTales, toggleFavorite } from '@/db/queries';
import { speakTurkish } from '@/logic/tts';
import { getCultureOfTheDay } from '@/logic/cultureDaily';
import { todayStr } from '@/logic/streak';

type Section =
  | null
  | 'proverbs'
  | 'twisters'
  | 'traditions'
  | 'customs'
  | 'landmarks'
  | 'tales'
  | 'favorites';

export default function CultureScreen() {
  const palette = usePalette();
  const [section, setSection] = useState<Section>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [readTales, setReadTales] = useState<Set<string>>(new Set());

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      Promise.all([listFavorites('proverb'), listReadTales()]).then(([favs, read]) => {
        if (cancelled) return;
        setFavorites(new Set(favs));
        setReadTales(new Set(read));
      });
      return () => {
        cancelled = true;
      };
    }, [])
  );

  async function onToggleFavorite(id: string) {
    const nowFav = await toggleFavorite('proverb', id);
    setFavorites((prev) => {
      const next = new Set(prev);
      if (nowFav) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  if (section === 'proverbs') {
    return (
      <View style={styles.container}>
        <BackHeader title="🧿 Пословицы и поговорки" onBack={() => setSection(null)} />
        <FlatList
          data={PROVERBS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <ProverbCard
              proverb={item}
              isFavorite={favorites.has(item.id)}
              onToggleFavorite={onToggleFavorite}
            />
          )}
        />
      </View>
    );
  }

  if (section === 'twisters') {
    return (
      <View style={styles.container}>
        <BackHeader title="👅 Скороговорки" onBack={() => setSection(null)} />
        <FlatList
          data={TWISTERS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <TwisterCard twister={item} />}
        />
      </View>
    );
  }

  if (section === 'tales') {
    return (
      <View style={styles.container}>
        <BackHeader title="📖 Сказки Насреддина Ходжи" onBack={() => setSection(null)} />
        <FlatList
          data={TALES}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.sectionCard, { backgroundColor: palette.surface }]}
              onPress={() => router.push(`/tale/${item.id}`)}>
              <Text style={styles.sectionEmoji}>{item.emoji}</Text>
              <View style={styles.sectionText} lightColor="transparent" darkColor="transparent">
                <Text style={styles.sectionTitle}>{item.title}</Text>
                <Text style={[styles.sectionDesc, { color: palette.textMuted }]}>
                  {'⭐'.repeat(item.difficulty)} · {item.sentences.length} предложений
                </Text>
              </View>
              <Text style={styles.chevron}>{readTales.has(item.id) ? '✅' : '›'}</Text>
            </Pressable>
          )}
        />
      </View>
    );
  }

  if (section === 'favorites') {
    const favProverbs = PROVERBS.filter((p) => favorites.has(p.id));
    return (
      <View style={styles.container}>
        <BackHeader title="⭐ Избранные пословицы" onBack={() => setSection(null)} />
        {favProverbs.length === 0 ? (
          <Text style={[styles.subtitle, { color: palette.textMuted }]}>
            Пока пусто. Отмечайте пословицы звёздочкой ☆ — они соберутся здесь.
          </Text>
        ) : (
          <FlatList
            data={favProverbs}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <ProverbCard
                proverb={item}
                isFavorite={favorites.has(item.id)}
                onToggleFavorite={onToggleFavorite}
              />
            )}
          />
        )}
      </View>
    );
  }

  const cultureSection = CULTURE.find((s) => s.id === section);
  if (cultureSection) {
    return (
      <View style={styles.container}>
        <BackHeader
          title={`${cultureSection.emoji} ${cultureSection.title}`}
          onBack={() => setSection(null)}
        />
        <FlatList
          data={cultureSection.topics}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <CultureTopicCard topic={item} />}
        />
      </View>
    );
  }

  const readCount = TALES.filter((t) => readTales.has(t.id)).length;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Культура</Text>

      <View style={styles.progressStrip} lightColor="transparent" darkColor="transparent">
        <Text style={[styles.progressChip, { color: palette.textMuted }]}>
          📖 {readCount}/{TALES.length} сказок
        </Text>
        <Text style={[styles.progressChip, { color: palette.textMuted }]}>
          ⭐ {favorites.size} в избранном
        </Text>
      </View>

      <CultureOfTheDay favorites={favorites} onToggleFavorite={onToggleFavorite} />

      <Pressable
        style={[styles.quizCard, { backgroundColor: palette.primary }]}
        onPress={() => router.push('/culture-quiz')}>
        <Text style={styles.quizEmoji}>🎲</Text>
        <View style={styles.sectionText} lightColor="transparent" darkColor="transparent">
          <Text style={[styles.quizTitle, { color: palette.onPrimary }]}>Квиз по пословицам</Text>
          <Text style={[styles.quizDesc, { color: palette.onPrimary }]}>
            Угадай смысл · +10 XP
          </Text>
        </View>
        <Text style={[styles.chevron, { color: palette.onPrimary }]}>›</Text>
      </Pressable>

      {favorites.size > 0 && (
        <Pressable
          style={[styles.sectionCard, { backgroundColor: palette.surface }]}
          onPress={() => setSection('favorites')}>
          <Text style={styles.sectionEmoji}>⭐</Text>
          <View style={styles.sectionText} lightColor="transparent" darkColor="transparent">
            <Text style={styles.sectionTitle}>Избранное</Text>
            <Text style={[styles.sectionDesc, { color: palette.textMuted }]}>
              {favorites.size} сохранённых пословиц
            </Text>
          </View>
          <Text style={[styles.chevron, { color: palette.textMuted }]}>›</Text>
        </Pressable>
      )}

      <Text style={[styles.groupLabel, { color: palette.textMuted }]}>Разделы</Text>

      <Pressable
        style={[styles.sectionCard, { backgroundColor: palette.surface }]}
        onPress={() => setSection('proverbs')}>
        <Text style={styles.sectionEmoji}>🧿</Text>
        <View style={styles.sectionText} lightColor="transparent" darkColor="transparent">
          <Text style={styles.sectionTitle}>Пословицы и поговорки</Text>
          <Text style={[styles.sectionDesc, { color: palette.textMuted }]}>
            {PROVERBS.length} atasözü с переводом и русскими аналогами
          </Text>
        </View>
        <Text style={[styles.chevron, { color: palette.textMuted }]}>›</Text>
      </Pressable>

      <Pressable
        style={[styles.sectionCard, { backgroundColor: palette.surface }]}
        onPress={() => setSection('twisters')}>
        <Text style={styles.sectionEmoji}>👅</Text>
        <View style={styles.sectionText} lightColor="transparent" darkColor="transparent">
          <Text style={styles.sectionTitle}>Скороговорки</Text>
          <Text style={[styles.sectionDesc, { color: palette.textMuted }]}>
            {TWISTERS.length} tekerleme · три скорости озвучки
          </Text>
        </View>
        <Text style={[styles.chevron, { color: palette.textMuted }]}>›</Text>
      </Pressable>

      {CULTURE.map((s) => (
        <Pressable
          key={s.id}
          style={[styles.sectionCard, { backgroundColor: palette.surface }]}
          onPress={() => setSection(s.id)}>
          <Text style={styles.sectionEmoji}>{s.emoji}</Text>
          <View style={styles.sectionText} lightColor="transparent" darkColor="transparent">
            <Text style={styles.sectionTitle}>{s.title}</Text>
            <Text style={[styles.sectionDesc, { color: palette.textMuted }]}>{s.desc}</Text>
          </View>
          <Text style={[styles.chevron, { color: palette.textMuted }]}>›</Text>
        </Pressable>
      ))}

      <Pressable
        style={[styles.sectionCard, { backgroundColor: palette.surface }]}
        onPress={() => setSection('tales')}>
        <Text style={styles.sectionEmoji}>📖</Text>
        <View style={styles.sectionText} lightColor="transparent" darkColor="transparent">
          <Text style={styles.sectionTitle}>Сказки Насреддина Ходжи</Text>
          <Text style={[styles.sectionDesc, { color: palette.textMuted }]}>
            {TALES.length} историй · параллельное чтение с озвучкой
          </Text>
        </View>
        <Text style={[styles.chevron, { color: palette.textMuted }]}>›</Text>
      </Pressable>
    </ScrollView>
  );
}

function CultureOfTheDay({
  favorites,
  onToggleFavorite,
}: {
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}) {
  const palette = usePalette();
  const daily = getCultureOfTheDay(todayStr());

  return (
    <View style={styles.dailyWrap} lightColor="transparent" darkColor="transparent">
      <Text style={[styles.dailyLabel, { color: palette.primary }]}>🎭 Культура дня</Text>
      {daily.type === 'proverb' && (
        <ProverbCard
          proverb={daily.proverb}
          isFavorite={favorites.has(daily.proverb.id)}
          onToggleFavorite={onToggleFavorite}
        />
      )}
      {daily.type === 'twister' && <TwisterCard twister={daily.twister} />}
      {daily.type === 'topic' && <CultureTopicCard topic={daily.topic} />}
      {daily.type === 'tale' && (
        <Pressable
          style={[styles.sectionCard, { backgroundColor: palette.surface }]}
          onPress={() => router.push(`/tale/${daily.tale.id}`)}>
          <Text style={styles.sectionEmoji}>{daily.tale.emoji}</Text>
          <View style={styles.sectionText} lightColor="transparent" darkColor="transparent">
            <Text style={styles.sectionTitle}>{daily.tale.title}</Text>
            <Text style={[styles.sectionDesc, { color: palette.textMuted }]}>
              Сказка Насреддина Ходжи · читать
            </Text>
          </View>
          <Text style={[styles.chevron, { color: palette.textMuted }]}>›</Text>
        </Pressable>
      )}
    </View>
  );
}

function CultureTopicCard({ topic }: { topic: CultureTopic }) {
  const palette = usePalette();

  return (
    <View style={[styles.topicCard, { backgroundColor: palette.surface }]}>
      <View style={styles.topicHeader} lightColor="transparent" darkColor="transparent">
        <Text style={styles.topicEmoji}>{topic.emoji}</Text>
        <View style={styles.topicHeaderText} lightColor="transparent" darkColor="transparent">
          <Text style={styles.topicTitle}>{topic.title}</Text>
          {topic.tr && (
            <Text style={[styles.topicTr, { color: palette.primary }]}>{topic.tr}</Text>
          )}
        </View>
        {topic.tr && <SpeakButton text={topic.tr} size="sm" />}
      </View>

      <Text style={styles.topicBody}>{topic.body}</Text>

      <View style={[styles.topicWords, { borderTopColor: palette.track }]} lightColor="transparent" darkColor="transparent">
        {topic.words.map((w) => (
          <View key={w.tr} style={styles.wordRow} lightColor="transparent" darkColor="transparent">
            <SpeakButton text={w.tr} size="sm" />
            <Text style={styles.wordTr}>{w.tr}</Text>
            <Text style={[styles.wordRu, { color: palette.textMuted }]}>{w.ru}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const SPEEDS: { rate: number; emoji: string; label: string }[] = [
  { rate: 0.4, emoji: '🐢', label: 'медленно' },
  { rate: 0.7, emoji: '🚶', label: 'обычно' },
  { rate: 1.0, emoji: '🐇', label: 'быстро' },
];

function TwisterCard({ twister }: { twister: Twister }) {
  const palette = usePalette();

  return (
    <View style={[styles.twisterCard, { backgroundColor: palette.surface }]}>
      <View style={styles.twisterHeader} lightColor="transparent" darkColor="transparent">
        <Text style={styles.twisterDifficulty}>{'⭐'.repeat(twister.difficulty)}</Text>
      </View>
      <Text style={styles.twisterTr}>{twister.tr}</Text>
      <Text style={[styles.twisterTranscription, { color: palette.textMuted }]}>
        {twister.transcription}
      </Text>
      <Text style={[styles.twisterRu, { color: palette.textMuted }]}>{twister.ru}</Text>
      <View style={styles.speeds} lightColor="transparent" darkColor="transparent">
        {SPEEDS.map((s) => (
          <Pressable
            key={s.rate}
            style={[styles.speedBtn, { borderColor: palette.primary }]}
            onPress={() => speakTurkish(twister.tr, s.rate)}>
            <Text style={styles.speedEmoji}>{s.emoji}</Text>
            <Text style={[styles.speedLabel, { color: palette.primary }]}>{s.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
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
  screen: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.xl,
    gap: Spacing.md,
    paddingBottom: Spacing.xl * 2,
  },
  title: {
    fontSize: FontSize.title,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: FontSize.body,
    lineHeight: 21,
    marginBottom: Spacing.sm,
  },
  progressStrip: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  progressChip: {
    fontSize: FontSize.small,
    fontWeight: '600',
  },
  dailyWrap: {
    gap: Spacing.xs,
  },
  dailyLabel: {
    fontSize: FontSize.caption,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  quizCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
  },
  quizEmoji: {
    fontSize: 28,
  },
  quizTitle: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
  quizDesc: {
    fontSize: FontSize.caption,
    opacity: 0.85,
  },
  groupLabel: {
    fontSize: FontSize.small,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: Spacing.sm,
  },
  sectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
  },
  soon: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  sectionEmoji: {
    fontSize: 28,
  },
  sectionText: {
    flex: 1,
    gap: 2,
  },
  sectionTitle: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
  sectionDesc: {
    fontSize: FontSize.caption,
  },
  chevron: {
    fontSize: FontSize.title,
  },
  list: {
    gap: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  topicCard: {
    padding: Spacing.lg,
    borderRadius: Radius.md,
    gap: Spacing.md,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  topicEmoji: {
    fontSize: 28,
  },
  topicHeaderText: {
    flex: 1,
    gap: 2,
  },
  topicTitle: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
  topicTr: {
    fontSize: FontSize.body,
    fontWeight: '600',
  },
  topicBody: {
    fontSize: FontSize.body,
    lineHeight: 21,
  },
  topicWords: {
    borderTopWidth: 1,
    paddingTop: Spacing.md,
    gap: Spacing.sm,
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  wordTr: {
    flex: 1,
    fontSize: FontSize.body,
    fontWeight: '600',
  },
  wordRu: {
    flex: 1,
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
  twisterCard: {
    padding: Spacing.lg,
    borderRadius: Radius.md,
    gap: Spacing.sm,
  },
  twisterHeader: {
    flexDirection: 'row',
  },
  twisterDifficulty: {
    fontSize: FontSize.caption,
  },
  twisterTr: {
    fontSize: FontSize.medium,
    fontWeight: '700',
    lineHeight: 23,
  },
  twisterTranscription: {
    fontSize: FontSize.body,
    fontStyle: 'italic',
  },
  twisterRu: {
    fontSize: FontSize.body,
    lineHeight: 20,
  },
  speeds: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  speedBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.sm,
    borderWidth: 1.5,
  },
  speedEmoji: {
    fontSize: FontSize.medium,
  },
  speedLabel: {
    fontSize: FontSize.caption,
    fontWeight: '600',
  },
});
