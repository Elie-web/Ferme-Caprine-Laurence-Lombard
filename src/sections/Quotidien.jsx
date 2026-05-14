import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const MILKING = 'https://images.unsplash.com/photo-1772228616099-8e85231a3fcc?w=900&q=85&auto=format&fit=crop'
const HANDS   = 'https://images.unsplash.com/photo-1686998424265-075c0a30b9b2?w=900&q=85&auto=format&fit=crop'
const AGING   = 'https://images.unsplash.com/photo-1756922245026-934ff1648d79?w=900&q=85&auto=format&fit=crop'
const MARKET  = 'https://images.unsplash.com/photo-1554486855-60050042cd53?w=900&q=85&auto=format&fit=crop'

const steps = [
  {
    time: '5h30',
    title: 'La traite du matin',
    desc: 'Avant même le lever du soleil, Laurence et Didier rejoignent les chèvres pour la première traite. Deux fois par jour, ce rituel produit entre 50 et 60 litres d\'un lait riche et parfumé.',
    img: MILKING,
    alt: 'Traite des chèvres',
    accent: 'var(--amber)',
  },
  {
    time: 'Matin',
    title: 'La transformation fromagère',
    desc: 'Le lait encore tiède est emprésuré, puis le caillé est délicatement travaillé à la main. Chaque geste compte : le moulage, l\'égouttage, le salage. Pas de machine, pas de précipitation.',
    img: HANDS,
    alt: 'Fabrication artisanale du fromage',
    accent: 'var(--sage)',
  },
  {
    time: 'Jours',
    title: 'L\'affinage en cave',
    desc: 'Selon leur stade de maturation, les fromages reposent sur des claies en bois dans la cave fraîche. Chaque jour, Laurence les retourne, les surveille, les goûte. Le temps est son meilleur ingrédient.',
    img: AGING,
    alt: 'Fromages en cours d\'affinage',
    accent: 'var(--amber)',
  },
  {
    time: 'Vendredi',
    title: 'Au marché, face aux clients',
    desc: 'Chaque vendredi matin, Laurence charge sa camionnette et rejoint le marché de Frontenex. C\'est son moment préféré : rencontrer les gens, parler de ses fromages, voir les sourires.',
    img: MARKET,
    alt: 'Marché de Frontenex',
    accent: 'var(--sage)',
  },
]

function StepCard({ step, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'clamp(32px,5vw,64px)',
        alignItems: 'center',
        marginBottom: 'clamp(64px,8vw,100px)',
      }}
    >
      {/* Photo */}
      <div style={{ order: isEven ? 0 : 1 }}>
        <div style={{
          position: 'relative', borderRadius: '24px', overflow: 'hidden',
          aspectRatio: '4/3',
          boxShadow: '0 32px 80px rgba(44,36,32,0.16)',
        }}>
          <motion.img
            src={step.img}
            alt={step.alt}
            initial={{ scale: 1.08 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Time badge */}
          <div style={{
            position: 'absolute', top: '20px', left: '20px',
            backgroundColor: 'rgba(247,242,232,0.92)', backdropFilter: 'blur(12px)',
            padding: '8px 18px', borderRadius: '100px',
            border: `1px solid ${step.accent}40`,
          }}>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '14px', fontWeight: 600, color: step.accent }}>
              {step.time}
            </span>
          </div>
        </div>
      </div>

      {/* Text */}
      <div style={{ order: isEven ? 1 : 0 }}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? 30 : -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Step number */}
          <span style={{
            display: 'inline-block',
            fontFamily: 'Playfair Display, serif',
            fontSize: '72px', fontWeight: 700,
            color: `${step.accent}18`,
            lineHeight: 1, marginBottom: '-8px',
            userSelect: 'none',
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>

          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(26px,3.5vw,38px)',
            fontWeight: 600, color: 'var(--charcoal)',
            lineHeight: 1.2, marginBottom: '16px', marginTop: '8px',
          }}>
            {step.title}
          </h3>

          <p style={{
            fontSize: '16px', lineHeight: 1.75,
            color: 'var(--charcoal-soft)', fontWeight: 300,
          }}>
            {step.desc}
          </p>

          {/* Decorative line */}
          <div style={{
            marginTop: '28px', width: '48px', height: '2px',
            backgroundColor: step.accent, borderRadius: '2px',
          }} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Quotidien() {
  return (
    <section style={{ backgroundColor: 'var(--warm-white)', padding: 'clamp(80px,10vw,130px) clamp(24px,6vw,80px)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(56px,8vw,96px)' }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-block', fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--sage)',
              backgroundColor: 'rgba(107,143,110,0.12)', padding: '6px 16px',
              borderRadius: '100px', marginBottom: '20px',
            }}
          >
            Une journée à la ferme
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(32px,5vw,52px)', fontWeight: 600,
              lineHeight: 1.15, color: 'var(--charcoal)', marginBottom: '20px',
            }}
          >
            Du lever des chèvres<br />au sourire du client
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: '17px', lineHeight: 1.7, color: 'var(--charcoal-soft)',
              maxWidth: '540px', margin: '0 auto', fontWeight: 300,
            }}
          >
            Chaque fromage porte en lui la somme de centaines de gestes minutieux,
            d'une journée qui commence bien avant l'aube.
          </motion.p>
        </div>

        {steps.map((step, i) => (
          <StepCard key={step.title} step={step} index={i} />
        ))}
      </div>
    </section>
  )
}
