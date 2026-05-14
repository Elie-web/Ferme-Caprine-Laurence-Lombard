import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const avis = [
  {
    name: 'Marie-Claire D.',
    lieu: 'Albertville',
    note: 5,
    texte: "Le fromage frais de Laurence est une merveille. Je viens en chercher chaque vendredi matin sur le marché de Frontenex depuis trois ans. Frais, onctueux, ça n'a rien à voir avec ce qu'on trouve en supermarché.",
    initiale: 'M',
    achat: 'Marché de Frontenex',
  },
  {
    name: 'Pierre & Isabelle G.',
    lieu: 'Moûtiers',
    note: 5,
    texte: "Nous avons découvert la ferme par hasard en voiture. Laurence nous a accueillis avec une dégustation improvisée. La buchette mi-affinée était extraordinaire. On revient dès qu'on peut !",
    initiale: 'P',
    achat: 'Vente à la ferme',
  },
  {
    name: 'Sophie T.',
    lieu: 'Chambéry',
    note: 5,
    texte: "Adhérente à l'AMAP depuis deux ans. Recevoir chaque semaine les fromages de Laurence, c'est comme avoir un bout de montagne dans son frigo. La tomme affinée est mon péché mignon.",
    initiale: 'S',
    achat: 'AMAP Dent de Cons',
  },
  {
    name: 'Jean-François M.',
    lieu: 'Ugine',
    note: 5,
    texte: "J'achète ici pour mes plateaux de fête. Le cendré et la buchette font systématiquement l'unanimité. Des amis m'ont demandé où je les trouvais, je les ai directement amenés à Marthod.",
    initiale: 'J',
    achat: 'Vente à la ferme',
  },
  {
    name: 'Aurélie K.',
    lieu: 'Frontenex',
    note: 5,
    texte: "Voisins de commune, on a la chance de passer à la ferme régulièrement. Ce qui m'émeut, c'est voir le soin que Laurence met dans chaque fromage. C'est artisanal dans le vrai sens du terme.",
    initiale: 'A',
    achat: 'Vente à la ferme',
  },
]

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="var(--amber)" color="var(--amber)" />
      ))}
    </div>
  )
}

function AvisCard({ avis, active }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: 'var(--warm-white)',
        borderRadius: '24px',
        padding: 'clamp(28px,4vw,44px)',
        border: '1px solid rgba(196,122,58,0.12)',
        boxShadow: '0 16px 48px rgba(44,36,32,0.08)',
        maxWidth: '680px', margin: '0 auto', width: '100%',
        position: 'relative',
      }}
    >
      {/* Giant quote mark */}
      <span style={{
        position: 'absolute', top: '16px', left: '24px',
        fontFamily: 'Playfair Display, serif',
        fontSize: '80px', lineHeight: 1, color: 'rgba(196,122,58,0.1)',
        fontWeight: 700, userSelect: 'none', pointerEvents: 'none',
      }}>
        "
      </span>

      <Stars count={avis.note} />

      <p style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(17px,2.2vw,22px)',
        fontStyle: 'italic',
        color: 'var(--charcoal)',
        lineHeight: 1.65,
        marginTop: '20px',
        marginBottom: '28px',
        position: 'relative', zIndex: 1,
      }}>
        "{avis.texte}"
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            backgroundColor: 'var(--sage)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '18px', fontWeight: 600,
            fontFamily: 'Playfair Display, serif', flexShrink: 0,
          }}>
            {avis.initiale}
          </div>
          <div>
            <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--charcoal)' }}>{avis.name}</p>
            <p style={{ fontSize: '13px', color: 'var(--charcoal-soft)', fontWeight: 300 }}>{avis.lieu}</p>
          </div>
        </div>
        <span style={{
          fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'var(--amber)',
          backgroundColor: 'rgba(196,122,58,0.1)', padding: '5px 12px',
          borderRadius: '100px',
        }}>
          {avis.achat}
        </span>
      </div>
    </motion.div>
  )
}

export default function Temoignages() {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const prev = () => setCurrent(c => (c - 1 + avis.length) % avis.length)
  const next = () => setCurrent(c => (c + 1) % avis.length)

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: 'var(--cream)',
        padding: 'clamp(80px,10vw,130px) clamp(24px,6vw,80px)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,64px)' }}
        >
          <span style={{
            display: 'inline-block', fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--sage)',
            backgroundColor: 'rgba(107,143,110,0.12)', padding: '6px 16px',
            borderRadius: '100px', marginBottom: '20px',
          }}>
            Ils en parlent mieux que nous
          </span>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(32px,5vw,52px)', fontWeight: 600,
            color: 'var(--charcoal)', lineHeight: 1.15,
            marginBottom: '24px',
          }}>
            Ce que disent nos clients
          </h2>

          {/* Google Maps rating badge */}
          <motion.a
            href="https://maps.google.com/?q=4411+Route+des+Hameaux,+Marthod+73400"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '10px 20px',
              backgroundColor: 'var(--warm-white)',
              border: '1px solid rgba(196,122,58,0.18)',
              borderRadius: '100px',
              boxShadow: '0 4px 16px rgba(44,36,32,0.06)',
              textDecoration: 'none',
              transition: 'box-shadow 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(44,36,32,0.10)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(44,36,32,0.06)'}
          >
            {/* Google G logo */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={13} fill="#FBBC04" color="#FBBC04" />
              ))}
            </div>
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--charcoal)' }}>
              5 / 5 sur Google Maps
            </span>
          </motion.a>
        </motion.div>

        {/* Carousel */}
        <div style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            <AvisCard key={current} avis={avis[current]} />
          </AnimatePresence>

          {/* Controls */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '16px', marginTop: '32px',
          }}>
            <button
              onClick={prev}
              style={{
                width: '44px', height: '44px', borderRadius: '50%',
                backgroundColor: 'transparent',
                border: '1.5px solid rgba(44,36,32,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--charcoal)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--charcoal)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--charcoal)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--charcoal)'; e.currentTarget.style.borderColor = 'rgba(44,36,32,0.2)' }}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {avis.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: i === current ? '24px' : '8px',
                    height: '8px', borderRadius: '100px',
                    backgroundColor: i === current ? 'var(--amber)' : 'rgba(44,36,32,0.18)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              style={{
                width: '44px', height: '44px', borderRadius: '50%',
                backgroundColor: 'transparent',
                border: '1.5px solid rgba(44,36,32,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--charcoal)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--charcoal)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--charcoal)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--charcoal)'; e.currentTarget.style.borderColor = 'rgba(44,36,32,0.2)' }}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'rgba(44,36,32,0.35)', fontStyle: 'italic', fontWeight: 300 }}>
            {current + 1} sur {avis.length} témoignages
          </p>
        </div>
      </div>
    </section>
  )
}
