import { useRef } from 'react'
import './App.css'
import Nav          from './components/Nav'
import MobileActionBar from './components/MobileActionBar'
import Marquee      from './components/Marquee'
import Hero         from './sections/Hero'
import Histoire     from './sections/Histoire'
import Quotidien    from './sections/Quotidien'
import Fromages     from './sections/Fromages'
import Terroir      from './sections/Terroir'
import Galerie      from './sections/Galerie'
import Temoignages  from './sections/Temoignages'
import OuNousTrouver from './sections/OuNousTrouver'
import FAQ          from './sections/FAQ'
import Acces        from './sections/Acces'
import Footer       from './sections/Footer'

export default function App() {
  const histoireRef  = useRef(null)
  const fromagesRef  = useRef(null)
  const galerieRef   = useRef(null)
  const venteRef     = useRef(null)
  const faqRef       = useRef(null)
  const accesRef     = useRef(null)

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth' })

  const navItems = [
    { label: 'Histoire',          ref: histoireRef },
    { label: 'Nos fromages',      ref: fromagesRef },
    { label: 'La ferme',          ref: galerieRef  },
    { label: 'Où nous trouver',   ref: venteRef    },
    { label: 'FAQ',               ref: faqRef      },
    { label: 'Accès',             ref: accesRef    },
  ]

  return (
    <div style={{ backgroundColor: 'var(--cream)' }}>
      <Nav navItems={navItems} scrollTo={scrollTo} />
      <MobileActionBar />

      {/* 1 — Hero */}
      <Hero scrollTo={scrollTo} histoireRef={histoireRef} fromagesRef={fromagesRef} venteRef={venteRef} />

      {/* Marquee band */}
      <Marquee />

      {/* 2 — Histoire */}
      <div ref={histoireRef}>
        <Histoire />
      </div>

      {/* 3 — Une journée (quotidien) */}
      <Quotidien />

      {/* Marquee sombre entre sections */}
      <Marquee dark />

      {/* 4 — Nos fromages */}
      <div ref={fromagesRef}>
        <Fromages />
      </div>

      {/* 5 — Terroir + valeurs */}
      <Terroir />

      {/* 6 — Galerie photo */}
      <div ref={galerieRef}>
        <Galerie />
      </div>

      {/* 7 — Témoignages */}
      <Temoignages />

      {/* 8 — Où nous trouver */}
      <div ref={venteRef}>
        <OuNousTrouver />
      </div>

      {/* 9 — FAQ */}
      <div ref={faqRef}>
        <FAQ />
      </div>

      {/* 10 — Accès */}
      <div ref={accesRef}>
        <Acces />
      </div>

      {/* Footer */}
      <Footer navItems={navItems} scrollTo={scrollTo} />
    </div>
  )
}
