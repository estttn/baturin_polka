# Prompt

Single-page hero: fullscreen looping video, glass nav, cinematic type. React + Vite + Tailwind + TypeScript. (Source mentioned shadcn/ui; not required for the look.)

## Video

`absolute inset-0 w-full h-full object-cover z-0`, autoPlay loop muted playsInline.

`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4`

## Fonts

Google: Instrument Serif (display), Inter 400/500 (body).

`--font-display: 'Instrument Serif', serif;`  
`--font-body: 'Inter', sans-serif;`

Body uses body font; headings inline `'Instrument Serif', serif`.

## Theme (HSL)

- `--background: 201 100% 13%`
- `--foreground: 0 0% 100%`
- `--muted-foreground: 240 4% 66%`
- `--primary: 0 0% 100%` / `--primary-foreground: 0 0% 4%`
- `--secondary` `--muted` `--accent`: `0 0% 10%`
- `--border` `--input`: `0 0% 18%`

## Nav

`relative z-10 flex justify-between px-8 py-6 max-w-7xl mx-auto`

Logo: Velorah with `®` as `<sup className="text-xs">`, `text-3xl tracking-tight`, serif.

Links `md:flex` hidden on mobile: Home (active `text-foreground`), Studio, About, Journal, Reach Us — `text-sm text-muted-foreground hover:text-foreground`.

CTA: Begin Journey, liquid-glass `rounded-full px-6 py-2.5 text-sm`, `hover:scale-[1.03]`.

## Hero

`relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-40 py-[90px]`

H1: `Where dreams rise through the silence.` — `text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal`. Wrap `dreams` and `through the silence.` in `<em className="not-italic text-muted-foreground">`.

Subtext `text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed`: tools for deep thinkers / digital spaces for focus.

Hero CTA: Begin Journey, liquid-glass `px-14 py-5 text-base mt-12 hover:scale-[1.03]`.

## `.liquid-glass`

Same recipe: `rgba(255,255,255,0.01)` + luminosity + blur(4px) + inset highlight; `::before` 1.4px gradient stroke, mask xor / exclude.

## Motion

`fade-rise` translateY 24px, 0.8s ease-out. H1 no delay, subtext 0.2s, CTA 0.4s.

No blobs, radial overlays. Video is the only depth.

(Duplicate of this prompt in the source dump was discarded.)
