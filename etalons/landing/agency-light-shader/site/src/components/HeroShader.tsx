import {
  ChromaFlow,
  FilmGrain,
  GlassTiles,
  Shader,
  Swirl,
} from 'shaders/react'

export function HeroShader() {
  return (
    <Shader className="pointer-events-none absolute inset-0 z-10 h-full w-full">
      <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
      <ChromaFlow
        baseColor="#ffffff"
        upColor="#16a34a"
        downColor="#16a34a"
        leftColor="#ffffff"
        rightColor="#ffffff"
        momentum={13}
        radius={3.5}
      />
      <GlassTiles intensity={2.4} tileCount={8} roundness={0.12} />
      <FilmGrain strength={0.05} />
    </Shader>
  )
}
