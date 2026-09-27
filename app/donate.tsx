import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ErrorCode, useIAP } from 'expo-iap';

import { Text, View, usePalette } from '@/components/Themed';
import { FontSize, Radius, Spacing } from '@/constants/Tokens';

// ID должны 1-в-1 совпадать с товарами (In-app products) в Google Play Console.
const DONATION_SKUS = ['donate_cay', 'donate_simit', 'donate_kebap'] as const;

const DONATION_META: Record<
  (typeof DONATION_SKUS)[number],
  { emoji: string; title: string; desc: string }
> = {
  donate_cay: { emoji: '🫖', title: 'Стакан чая', desc: 'çay — спасибо!' },
  donate_simit: { emoji: '🥯', title: 'Симит', desc: 'simit — большое спасибо!' },
  donate_kebap: { emoji: '🥙', title: 'Кебаб', desc: 'kebap — огромное спасибо!' },
};

export default function DonateScreen() {
  // Google Play Billing доступен только в нативной сборке.
  if (Platform.OS === 'web') return <WebFallback />;
  return <DonateNative />;
}

function WebFallback() {
  const palette = usePalette();
  return (
    <View style={styles.center}>
      <Text style={[styles.introText, { color: palette.textMuted }]}>
        Донат доступен в приложении на Android.
      </Text>
    </View>
  );
}

function DonateNative() {
  const palette = usePalette();
  const [thanked, setThanked] = useState(false);
  const [busySku, setBusySku] = useState<string | null>(null);

  const { connected, products, fetchProducts, requestPurchase, finishTransaction } = useIAP({
    onPurchaseSuccess: async (purchase) => {
      // Донат — расходуемый товар: сразу «потребляем», чтобы можно было задонатить снова.
      await finishTransaction({ purchase, isConsumable: true });
      setBusySku(null);
      setThanked(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    },
    onPurchaseError: (error) => {
      setBusySku(null);
      if (error.code === ErrorCode.UserCancelled) return;
      Alert.alert('Не получилось', 'Оплата не прошла. Попробуйте ещё раз чуть позже.');
    },
  });

  useEffect(() => {
    if (connected) {
      fetchProducts({ skus: [...DONATION_SKUS], type: 'in-app' }).catch(() => {});
    }
  }, [connected, fetchProducts]);

  function buy(sku: string) {
    if (busySku) return;
    setBusySku(sku);
    requestPurchase({
      request: { google: { skus: [sku] }, apple: { sku } },
      type: 'in-app',
    }).catch(() => setBusySku(null));
  }

  if (thanked) {
    return (
      <View style={styles.center}>
        <Text style={styles.thanksEmoji}>💛</Text>
        <Text style={styles.thanksTitle}>Teşekkür ederim!</Text>
        <Text style={[styles.introText, { color: palette.textMuted }]}>
          Спасибо за поддержку — она очень мотивирует развивать курс дальше.
        </Text>
        <Pressable
          style={[styles.backBtn, { backgroundColor: palette.surface }]}
          onPress={() => setThanked(false)}>
          <Text style={styles.backText}>← Вернуться</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.introEmoji}>🇹🇷</Text>
      <Text style={styles.introTitle}>Курс полностью бесплатный</Text>
      <Text style={[styles.introText, { color: palette.textMuted }]}>
        Без рекламы и подписок. Если приложение помогает учить турецкий — можно угостить автора.
        Донат ничего не открывает, это просто благодарность.
      </Text>

      {DONATION_SKUS.map((sku) => {
        const meta = DONATION_META[sku];
        const product = products.find((p) => p.id === sku);
        return (
          <Pressable
            key={sku}
            style={[
              styles.option,
              { backgroundColor: palette.surface },
              !product && styles.optionDisabled,
            ]}
            disabled={!product || busySku !== null}
            onPress={() => buy(sku)}>
            <Text style={styles.optionEmoji}>{meta.emoji}</Text>
            <View style={styles.optionText} lightColor="transparent" darkColor="transparent">
              <Text style={styles.optionTitle}>{meta.title}</Text>
              <Text style={[styles.optionDesc, { color: palette.textMuted }]}>{meta.desc}</Text>
            </View>
            {busySku === sku ? (
              <ActivityIndicator />
            ) : (
              <Text style={[styles.optionPrice, { color: palette.primary }]}>
                {product ? product.displayPrice : '—'}
              </Text>
            )}
          </Pressable>
        );
      })}

      <Text style={[styles.footnote, { color: palette.textMuted }]}>
        {connected && products.length > 0
          ? 'Оплата проходит безопасно через Google Play.'
          : 'Суммы появятся, когда приложение будет опубликовано в Google Play.'}
      </Text>
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
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  introEmoji: {
    fontSize: 40,
    textAlign: 'center',
  },
  introTitle: {
    fontSize: FontSize.heading,
    fontWeight: '700',
    textAlign: 'center',
  },
  introText: {
    fontSize: FontSize.body,
    lineHeight: 21,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
  },
  optionDisabled: {
    opacity: 0.5,
  },
  optionEmoji: {
    fontSize: 28,
  },
  optionText: {
    flex: 1,
    gap: 2,
  },
  optionTitle: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
  optionDesc: {
    fontSize: FontSize.caption,
  },
  optionPrice: {
    fontSize: FontSize.medium,
    fontWeight: '700',
  },
  footnote: {
    fontSize: FontSize.caption,
    textAlign: 'center',
  },
  thanksEmoji: {
    fontSize: 56,
  },
  thanksTitle: {
    fontSize: FontSize.title,
    fontWeight: '700',
  },
  backBtn: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
  },
  backText: {
    fontSize: FontSize.medium,
    fontWeight: '600',
  },
});
