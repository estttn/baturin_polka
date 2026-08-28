# Prompt

Build a full-viewport cinematic movie/streaming hero using React, Tailwind CSS, and Lucide React. Inter from Google Fonts (300–700). The page is a single full-height hero — no scrolling, no extra sections.

## Background video

Fixed, full viewport, `object-cover`, loop, muted, autoplay, `z-index: 0`.

URL: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4`

## Bottom blur overlay (no dark gradient)

Fixed full-screen overlay, `backdrop-blur-xl`, `pointer-events-none`, `z-index: 1`.

Mask only (no darkening gradient):

```css
mask-image: linear-gradient(to top, black 0%, transparent 45%);
-webkit-mask-image: linear-gradient(to top, black 0%, transparent 45%);
```

## Font

Inter on `body`.

## `.liquid-glass`

```css
background: rgba(255, 255, 255, 0.01);
background-blend-mode: luminosity;
backdrop-filter: blur(4px);
-webkit-backdrop-filter: blur(4px);
border: none;
box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
position: relative;
overflow: hidden;
```

`::before`: inset 0, `border-radius: inherit`, `padding: 1.4px`, vertical white gradient stroke via `-webkit-mask` content-box xor / `mask-composite: exclude`. `pointer-events: none`.

## `blurFadeUp`

From: `opacity: 0; filter: blur(20px); transform: translateY(40px)`  
To: `opacity: 1; filter: blur(0); transform: translateY(0)`  
Class: `animation: blurFadeUp 1s ease-out forwards`, initial `opacity: 0`. Stagger via inline `animationDelay`.

## Navbar (`z-50`, relative)

`justify-between`, `px-4 sm:px-6 md:px-12 py-4 md:py-6`.

- Left: wordmark (e.g. CINEMATIC), `h-8 md:h-10`, delay 0ms.
- Center (`lg+`): Movies, TV Series, Editor's Pick, Interviews, User Reviews — `text-sm`, hover `text-gray-300`, delays 100–300ms step 50ms.
- Right (`sm+`): Search pill (liquid-glass, Lucide Search 18) delay 350ms; User circle `w-10 h-10` delay 400ms.
- Below `lg`: hamburger `w-10 h-10` liquid-glass, Menu/X, rotate-180 / opacity / scale-50, `duration-500 ease-out`, delay 350ms.

## Mobile menu (`< lg`)

Absolute below nav `top-[72px]`, `z-40`. Open: `translate-y-0 opacity-100`. Closed: `-translate-y-4 opacity-0 pointer-events-none`. `duration-500 ease-out`.

`bg-gray-900/95 backdrop-blur-lg`, `border-t border-b border-gray-800 shadow-2xl`. Same 5 links, column, `py-3 px-3 rounded-lg`, hover `bg-gray-800/50`, slide-x stagger 50ms. Below `sm`: Search + Profile in a bordered bottom block.

## Hero content (bottom)

`flex-1 flex flex-col justify-end`, `px-4 sm:px-6 md:px-12 pb-8 md:pb-16`, `z-10`.

Inner: `flex-col md:flex-row items-end gap-8`.

Left `flex-1`:

- Meta row `flex-wrap gap-3 sm:gap-6 mb-6 md:mb-8 text-xs sm:text-sm`, delay 300ms: Star 16 fill-white + `8.7/10 IMDB`; Clock + `132 min`; Calendar + `April, 2025`.
- Title `text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-[-0.04em] mb-4 md:mb-6`, delay 400ms: `Step Through. Work Smarter.`
- Description `text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-12 max-w-2xl`, delay 500ms: `A voyage through forgotten realms, where past and future intertwine.`
- CTAs `flex-wrap gap-3 sm:gap-4`: Watch Now — `bg-white text-black rounded-full` + Play fill-black, delay 600ms; Learn More — liquid-glass, delay 700ms.

Right: Previous / Next liquid-glass pills, ChevronLeft / ChevronRight, delays 800ms / 900ms. Left-aligned on mobile, right on desktop.

## Palette

`bg-black`. Text white, subtitle `text-gray-400`. Only solid non-glass control: Watch Now (white/black).

## Breakpoints

- `< sm`: smaller type, Search/User only in mobile menu.
- `< lg`: links hidden, hamburger.
- `md+`: hero row with arrows.
- `lg+`: full desktop nav.
