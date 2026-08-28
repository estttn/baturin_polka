# Prompt

Fullscreen hero for a creative studio. React, Tailwind, Lucide (ArrowRight, Menu, X). Single viewport, looping video, responsive nav, mobile overlay, staggered hero type.

## Video

`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4`

autoPlay muted loop playsInline. Absolute, full size, `object-cover`, `object-position: 70% center`. Behind content (no extra z on video).

## Font

Geist 300–700 via Google `<link>`. Tailwind `fontFamily.geist`. Root `font-geist`. Body antialiased.

## Root

`relative h-screen w-full overflow-hidden bg-black font-geist`

## Navbar `z-30`

`flex justify-between px-6 py-5 md:px-12 lg:px-16`

Left: Foldcraft `text-lg font-semibold tracking-tight text-white sm:text-xl` + desktop links Home, Projects, Studio, Reach Us (`text-sm text-white/80 hover:text-white`).

Right desktop: Let's Talk `rounded-lg bg-white px-5 py-2 text-sm font-medium text-black hover:scale-105`.

Mobile: 40×40 toggle `z-50`, Menu/X, rotate 90 / opacity / scale, `duration-300`, `active:scale-90`.

## Mobile menu `z-20`

`absolute inset-x-0 top-0`, `bg-black/98 backdrop-blur-xl`. `duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`. Open: `h-screen opacity-100`. Closed: `h-0 opacity-0 pointer-events-none`.

Inner: `flex h-full flex-col justify-center px-8`, delay-100 `translate-y-8`. Links `text-3xl font-medium text-white/90`. Let's Talk `mt-6 rounded-full bg-white px-8 py-3.5`. Close menu on click.

## Hero `z-10`

`h-[calc(100vh-80px)] flex flex-col justify-between px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16`

Top `max-w-3xl`: badge Brand & Visual Storytelling (`text-xs sm:text-sm text-white/90`), fadeSlideUp 0.8s delay 0.2s.

H1: Shaping visual / narratives, / one pixel at a time. (`<br/>`). `text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight text-white`, delay 0.4s.

Bottom: paragraph `text-sm sm:text-base md:text-lg leading-relaxed text-white/60 max-w-sm sm:max-w-lg mb-5 sm:mb-6`, delay 0.7s.

CTA Explore Work + ArrowRight 16, `rounded-lg bg-white`, delay 0.9s.

## CSS

```css
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
* { margin: 0; padding: 0; box-sizing: border-box; }
```
