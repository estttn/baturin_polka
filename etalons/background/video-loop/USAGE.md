# video-loop

Канон — `catalog.yaml`. Ролики по URL, в git только постеры (~640px). Сами mp4/HLS не коммитим.

Порядок клипов = порядок, в котором их прислали.

## Как выбирать

Сначала `surface` + `overlay`, потом мотив.

| Нужен | Клипы |
|---|---|
| Тёмный hero, текст сверху / по краям | `hud-starfield`, `earth-limb`, `globe-orbit`, `robot-flower-spotlight` |
| Абстрактный tech, монохром | `energy-bands`, `dot-ripple`, `glitch-orb`, `liquid-ribbon` |
| Фигура / персонаж | `robot-flower-spotlight`, `chrome-figure` |
| Светлый editorial | `floating-rocks`, `contour-mountains` |
| Идиллия / весна | `sakura-lake` — центр занят, текст только в небо |
| Частицы / halftone | `particle-butterfly` |

`chrome-figure` — светлое поле слева, фигура справа: текст на белом, не на бликах.

`mux-hls-a` — постер не снялся (HLS с этой машины не открылся). URL в каталоге оставить, не выкидывать.

## В вёрстке

```html
<video autoplay muted loop playsinline></video>
```

Mux (13–14) — HLS, не сырой `<video src>`. Нужен hls.js или плеер Mux.

Всегда `muted` + тёмный/светлый scrim, если текст пересекает мотив.

## Не брать

- как замену шейдеру Axion (другой материал)
- все 14 сразу на одну страницу
- `sakura-lake` под мелкий UI — слишком сюжетный кадр
