import { About } from './components/About'
import { CaseStudies } from './components/CaseStudies'
import { Clients } from './components/Clients'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Services } from './components/Services'

export default function App() {
  return (
    <main>
      <Hero />
      <About />
      <CaseStudies />
      <Services />
      <Clients />
      <Faq />
      <Footer />
    </main>
  )
}
