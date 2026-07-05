import { createAudioPlayer, type AudioPlayer } from 'expo-audio';

import { getMeta, setMeta } from '@/db/queries';

// Плееры создаются один раз на весь запуск и переигрываются с начала.
let correctPlayer: AudioPlayer | null = null;
let wrongPlayer: AudioPlayer | null = null;
let soundEnabled = true;
let initialized = false;

/** Загрузка звуков и флага mute. Вызывать один раз после готовности БД. */
export async function initSound(): Promise<void> {
  if (initialized) return;
  initialized = true;
  try {
    const flag = await getMeta('sound');
    soundEnabled = flag !== '0';
    correctPlayer = createAudioPlayer(require('@/assets/audio/correct.wav'));
    wrongPlayer = createAudioPlayer(require('@/assets/audio/wrong.wav'));
  } catch (e) {
    console.warn('Sound init failed:', e);
  }
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export async function setSoundEnabled(on: boolean): Promise<void> {
  soundEnabled = on;
  await setMeta('sound', on ? '1' : '0');
}

function play(player: AudioPlayer | null): void {
  if (!soundEnabled || !player) return;
  try {
    player.seekTo(0);
    player.play();
  } catch {
    // на некоторых платформах воспроизведение может быть недоступно — тихо игнорируем
  }
}

export function playCorrect(): void {
  play(correctPlayer);
}

export function playWrong(): void {
  play(wrongPlayer);
}
