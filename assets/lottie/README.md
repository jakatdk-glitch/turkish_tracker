# Lottie-анимации

Сейчас здесь лежат **плейсхолдеры** (крутящийся кружок) — приложение с ними
собирается и работает. Чтобы получить красивые анимации, скачай `.json` с
[LottieFiles](https://lottiefiles.com) и **замени файлы, сохранив имена**.
Код менять не нужно — он ссылается на эти имена.

## Какие файлы нужны и что искать

| Файл | Где показывается | Что искать на LottieFiles |
|------|------------------|---------------------------|
| `onboarding-welcome.json` | 1-й слайд онбординга | `hello wave`, `welcome`, машущая рука |
| `+onboarding-learn.json` | 2-й слайд | `learning`, `books`, `graduation`, `study` |
| `onboarding-review.json` | 3-й слайд | `brain`, `memory`, `refresh`, `repeat` |
| `+onboarding-culture.json` | 4-й слайд | `travel`, `globe`, `landmark`, `world` |
| `success.json` | Экран «Пройдено!» (юнит/практика/тест) | `success`, `confetti`, `trophy`, `celebration` |
| `achievement.json` | Разблокировка достижения / level-up | `badge`, `medal`, `star`, `achievement` |
| `streak.json` | Стрик на главной | `fire`, `flame`, `streak` |
| `empty.json` | Пустые состояния («всё повторено» и т.п.) | `empty`, `done`, `relax`, `sleeping cat` |

## Как скачивать правильно

1. На LottieFiles открой анимацию → **Download** → **Lottie JSON** (не dotLottie/GIF).
2. Проверь лицензию: бери **Free** (часто нужна атрибуция) или **CC0**.
3. Переименуй в имя из таблицы и положи сюда, заменив плейсхолдер.
4. Держи файлы лёгкими (< 200 КБ) и без растровых картинок внутри —
   Lottie должен быть векторным, иначе на телефоне будет тормозить.

## Важно про сборку

`lottie-react-native` — нативный модуль. После замены файлов, чтобы увидеть
анимации в APK, нужно пересобрать приложение (`expo prebuild` + gradle).
На вебе (в превью) вместо Lottie показывается эмодзи-заглушка — это нормально.
