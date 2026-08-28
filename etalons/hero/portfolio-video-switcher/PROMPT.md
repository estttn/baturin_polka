# Prompt

Full-screen creative-portfolio hero. React, Vite, Tailwind, Figtree (400/500/600) in `index.html`. Black page, white text. Two components: Navbar, Hero. No lucide required.

## Tailwind

Custom max-width breakpoints:

- `mobile`: max 809.98px
- `md-tablet`: min 810px, max 1199.98px

CSS: `--ease-spring: cubic-bezier(0.16, 1, 0.3, 1)`

## Videos

Three full-screen looping videos (`muted autoPlay playsInline loop`), stacked, crossfade. All three mounted; active `opacity-100`, others `opacity-0`, `transition-opacity duration-[1200ms] ease-in-out`.

1. `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_030107_874273ea-684a-4e90-bb96-8fdfde48d53d.mp4`
2. `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_032424_3c9c2a9d-807b-4482-80e6-dd6d9dfd4545.mp4`
3. `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260627_094019_4214ea73-b963-46a4-8327-61489192de99.mp4`

On mount fetch as blobs → object URLs; fall back to original URL.

Overlay `bg-black/10` at `z-[1]`.

## Navbar

Absolute, `z-10`. Container max-width 1340px, `py-9 px-[15px]`.

Left: `01 / Works`, `02 / Services`, `03 / About`, `04 / Contact`.

- Index: `text-[8px] leading-3 tracking-[-0.08px] font-medium uppercase`
- Label: `text-xs leading-4 tracking-[-0.12px] font-medium uppercase`
- `.nav-link-underline`: underline `scaleX` from the right on hover

Right: email `Davies@gmail.com`; live clock `CUP HH:MM:SS` (`Intl.DateTimeFormat('en-GB')`, 1s).

Mobile: Menu/Close. Panel CSS Grid `grid-rows-[0fr]` / `[1fr]`, 420ms spring. Links `text-[28px] leading-8 tracking-[-0.84px]`.

## Hero

`z-[2]`, max-w 1340px, full height, `flex flex-col justify-end items-end gap-[150px] pt-[190px] px-[15px]`.

**Switcher + availability**

- Left `flex-[4]`: `01 / WATER WAVE`, `02 / GRIDWAVE`, `03 / LIGHT TUNNEL`. Active full opacity, else `opacity-55 hover:opacity-75`. Sets `activeIndex`. `.role-link` translateX 4px on hover.
- Right `flex-1`: 7px pulsing dot + “Available for work”. Pulse scale 1→1.45, opacity 1→0.45, 1.6s. Slide 1: `#F598F2`. Slides 2–3: white.

**Name + CTA** (`pb-[60px]`)

- Left `flex-[2]`: `Viktor.` `text-[200px] leading-[81%] tracking-[-6px] font-medium uppercase`. Period accent: pink on slide 1, white on 2–3. `revealUp` (translateY 80px, 0.9s spring).
- Right `flex-1 pl-[50px]`: body `text-base leading-6 tracking-[-0.16px] font-medium`. Button `start a project`, white border, `::before` fill `#F598F2` from `translateY(101%)` to 0, text black, border pink. `revealRight` (translateX 100px), button delay 0.08s.

Reveals once via IntersectionObserver threshold 0.35.

## Tablet 810–1199

Nav `py-[30px] px-[18px] gap-4`. Name `text-[129.6px] leading-[113.4px] tracking-[-7.7px]`. Bottom gap 28px, pb 52px, pl 24px.

## Mobile <810

Nav `py-6 px-[18px]`, hamburger. Hero `justify-end items-start gap-[72px] pt-[140px] px-[18px]`. Switcher stacks `gap-7`. Bottom column `gap-8 pb-11`. Name `text-[clamp(68px,21vw,80px)] leading-[96px] tracking-[-4.8px]`. Paragraph `max-w-[420px]`.

## Keyframes

`videoFadeIn`, `revealUp`, `revealRight`, `dotPulse` as specified. `prefers-reduced-motion: reduce` disables animation.

Landmarks: `header`, `main`, `nav`, `section`. Videos `aria-hidden="true"`.
