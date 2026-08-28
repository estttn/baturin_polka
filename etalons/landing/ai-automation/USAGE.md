# ai-automation

Канон — папка `site/`. Спека — `sources/motionsites/_upstream/prompts/AI_Automation.md`.

## Что это

Лендинг AI-агентства **COGNITRA** (имя из эталона, при адаптации менять):

1. Hero — серый overlay сверху, h1 слева, CTA pill-кнопки
2. Statement — белый текст на video, пословная анимация
3. Services — `#C5C5C5`, три карточки с video и текстом

Фиксированное background-video на всю страницу. Navbar прозрачный. Scroll indicator + repost внизу.

## Брать

- Композицию hero (32% / flex split)
- FadeUp-ритм и uppercase Helvetica-стиль
- Services grid с video в карточках
- Серый `#C5C5C5` как второй «слой» поверх video

## Не брать

- Бренд COGNITRA, тексты и video URL как свои
- Repost-кнопку, если не нужна в проде

## Запуск

```bash
cd site
npm install
npm run dev
```

Открыть URL из терминала (порт 5174).
