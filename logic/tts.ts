import * as Speech from 'expo-speech';

// undefined — ещё не искали; null — искали, турецкого голоса нет.
let cachedVoiceId: string | null | undefined;
let warnedNoVoice = false;

async function findTurkishVoice(): Promise<string | null> {
  if (cachedVoiceId !== undefined) return cachedVoiceId;
  try {
    const voices = await Speech.getAvailableVoicesAsync();
    // На web список голосов может быть пустым, пока браузер его не загрузил —
    // в этом случае не кэшируем и пробуем снова при следующем вызове.
    if (voices.length === 0) return null;
    cachedVoiceId =
      voices.find((v) => v.language?.toLowerCase().replace('_', '-').startsWith('tr'))
        ?.identifier ?? null;
  } catch {
    cachedVoiceId = null;
  }
  return cachedVoiceId;
}

/**
 * Озвучивает текст турецким голосом. `language: 'tr-TR'` — только подсказка:
 * без явно выбранного голоса система молча читает текст голосом по умолчанию
 * (обычно английским), поэтому ищем турецкий голос сами.
 *
 * Возвращает true, если найден настоящий турецкий голос.
 */
export async function speakTurkish(text: string, rate = 1, onDone?: () => void): Promise<boolean> {
  Speech.stop();
  const voice = await findTurkishVoice();
  if (!voice && !warnedNoVoice) {
    warnedNoVoice = true;
    console.warn(
      'Турецкий TTS-голос не найден — текст будет прочитан голосом по умолчанию. ' +
        'На Windows установите турецкий языковой пакет с озвучкой.'
    );
  }
  Speech.speak(text, {
    language: 'tr-TR',
    rate,
    ...(voice ? { voice } : {}),
    ...(onDone ? { onDone } : {}),
  });
  return voice !== null;
}

/** Останавливает текущую озвучку (например, при выходе с экрана-читалки). */
export function stopSpeaking(): void {
  Speech.stop();
}

/** Есть ли в системе турецкий голос (для подсказки в UI). */
export async function hasTurkishVoice(): Promise<boolean> {
  return (await findTurkishVoice()) !== null;
}
