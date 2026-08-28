# Prompt

Full-screen single-page hero, liquid glass on looping video. React + TypeScript + Vite + Tailwind. `lucide-react` only. No other UI kits.

## Global CSS

Geist 300–700: `https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap`

```css
* { font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
```

`.liquid-glass` + `::before` — same 1.4px masked gradient stroke as other glass heroes.

## App

Icons: ChevronDown, Infinity, Menu, X.

`BG_VIDEO = https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4`

`navLinks`: Home (active), Wellness (dropdown), Routine, Our Team.

Root: `relative w-full h-screen overflow-hidden`. Video absolute `object-cover` autoPlay muted loop playsInline.

## Navbar

`absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 sm:px-8 py-5`

Logo: Infinity 22 stroke 1.5 + Equilibrium, `text-white font-medium text-base`.

Center pill `hidden md:flex liquid-glass rounded-xl px-2 py-2 gap-1`. Active `bg-white/15 text-white`, else `text-white/70 hover:text-white`. Dropdown: ChevronDown 13.

Right `hidden md:flex gap-3`: Log in liquid-glass rounded-full; Begin Now `bg-white text-black rounded-full`.

Mobile toggle `md:hidden` liquid-glass `p-2 rounded-lg`, Menu/X 18.

## Mobile menu

When open: `absolute top-[72px] left-4 right-4 z-30 md:hidden liquid-glass rounded-2xl p-4`. Links full-width. Bottom row `border-t border-white/10`: Log in + Begin Now `flex-1`.

## Hero

`absolute bottom-0 left-0 z-20 px-6 sm:px-12 pb-10 sm:pb-16 max-w-2xl`

H1: Live Better, Feel Whole Every Day — `text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-white mb-4`.

P: `text-white/60 text-sm leading-relaxed mb-7 max-w-md`.

Start Today solid white rounded-full; Discover How liquid-glass.

No text keyframes. `transition-colors` on buttons. Video is the motion.
