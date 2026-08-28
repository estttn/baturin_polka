# Hero

Один экран на весь viewport. Не полный лендинг. Видео даёт глубину; каркас отличается раскладкой и стеклом.

| id | Раскладка | Стекло | Когда брать |
|---|---|---|---|
| [stream-bottom-glass](./stream-bottom-glass/) | контент снизу, prev/next | liquid-glass + blur-mask снизу | стриминг / «фильм», метаданные IMDB |
| [portfolio-video-switcher](./portfolio-video-switcher/) | низ + свитчер роликов | нет, numbered nav | портфолио, 3 видео, гигантское имя |
| [center-serif-glass](./center-serif-glass/) | центр, serif | liquid-glass | киношный манифест, спокойный CTA |
| [studio-left-solid](./studio-left-solid/) | колонка слева, верх+низ | нет, белые solid-кнопки | студия, Geist, оверлей-меню |
| [wellness-pill-nav](./wellness-pill-nav/) | низ-лево, пилюля нав | liquid-glass | wellness / app, Log in + Begin |

Общее: `h-screen`, loop video, без FAQ/карточек. Бренд из промпта не копировать.
