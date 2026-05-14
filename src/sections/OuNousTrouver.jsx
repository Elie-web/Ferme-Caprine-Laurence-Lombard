import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Clock, ShoppingBag, Users } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'

const MARKET_IMG = 'https://images.unsplash.com/photo-1706059922500-51ff9bf9611e?w=1200&q=85&auto=format&fit=crop'

const points = [
  {
    icon: MapPin,
    title: 'À la ferme',
    subtitle: '4411 Route des Hameaux\nMarthod (73400)',
    details: [
      { icon: Clock, text: 'Lun – Sam · 8h – 19h (sur RDV)' },
      { icon: Clock, text: 'Appeler avant de venir' },
      { icon: Clock, text: '06 70 44 65 71' },
    ],
    cta: { label: 'Appeler maintenant', href: 'tel:0670446571' },
    bg: '#2C2420',
    textColor: 'white',
    accent: '#C47A3A',
    badge: 'Vente directe',
    badgeBg: 'rgba(196,122,58,0.25)',
    badgeColor: '#E8A868',
    emoji: '🏡',
  },
  {
    icon: ShoppingBag,
    title: 'Marché de Frontenex',
    subtitle: 'Frontenex, Savoie',
    details: [
      { icon: Clock, text: 'Chaque vendredi matin' },
      { icon: Clock, text: 'À partir de 8h, jusqu\'à épuisement' },
      { icon: Clock, text: 'Retrouvez Laurence sur place' },
    ],
    cta: null,
    bg: 'var(--sage)',
    textColor: 'white',
    accent: 'rgba(255,255,255,0.3)',
    badge: 'Vendredi matin',
    badgeBg: 'rgba(255,255,255,0.18)',
    badgeColor: 'white',
    emoji: '🛒',
  },
  {
    icon: Users,
    title: 'AMAP Dent de Cons',
    subtitle: 'Association pour le Maintien\nd\'une Agriculture Paysanne',
    details: [
      { icon: Clock, text: 'Distribution hebdomadaire' },
      { icon: Clock, text: 'Panier fromages régulier' },
      { icon: Clock, text: 'Contactez l\'AMAP pour adhérer' },
    ],
    cta: null,
    bg: 'var(--cream-dark)',
    textColor: 'var(--charcoal)',
    accent: '#6B8F6E',
    badge: 'Circuit court',
    badgeBg: 'rgba(107,143,110,0.15)',
    badgeColor: 'var(--sage-dark)',
    emoji: '🤝',
  },
]

function PointCard({ point, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = point.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="card-glow"
      style={{
        backgroundColor: point.bg, borderRadius: '24px',
        padding: 'clamp(28px,4vw,40px)', position: 'relative',
        overflow: 'hidden', border: '1px solid rgba(196,122,58,0.1)',
      }}
    >
      <div style={{
        position: 'absolute', top: '-30px', right: '-30px',
        width: '120px', height: '120px', borderRadius: '50%',
        backgroundColor: point.accent, opacity: 0.12,
      }} />

      <span style={{
        display: 'inline-block', fontSize: '11px', fontWeight: 600,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: point.badgeColor, backgroundColor: point.badgeBg,
        padding: '5px 14px', borderRadius: '100px', marginBottom: '24px',
      }}>
        {point.badge}
      </span>

      <div style={{ fontSize: '40px', marginBottom: '16px' }}>{point.emoji}</div>

      <h3 style={{
        fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px,3vw,28px)', fontWeight: 600,
        color: point.textColor, marginBottom: '8px', lineHeight: 1.2,
      }}>
        {point.title}
      </h3>

      <p style={{
        fontSize: '14px', color: point.textColor, opacity: 0.65,
        marginBottom: '24px', lineHeight: 1.6, whiteSpace: 'pre-line', fontWeight: 300,
      }}>
        {point.subtitle}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: point.cta ? '20px' : 0 }}>
        {point.details.map((d, i) => {
          const DIcon = d.icon
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <DIcon size={13} style={{ color: point.textColor, opacity: 0.5, flexShrink: 0 }} />
              <span style={{ fontSize: '14px', color: point.textColor, opacity: 0.8, fontWeight: 300 }}>{d.text}</span>
            </div>
          )
        })}
      </div>

      {point.cta && (
        <a
          href={point.cta.href}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            padding: '12px 20px', borderRadius: '100px',
            backgroundColor: point.accent, color: 'white',
            fontSize: '14px', fontWeight: 500, textDecoration: 'none',
            fontFamily: 'DM Sans, sans-serif',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.02)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
        >
          {point.cta.label}
        </a>
      )}
    </motion.div>
  )
}

export default function OuNousTrouver() {
  return (
    <section style={{ backgroundColor: 'var(--warm-white)', overflow: 'hidden' }}>

      {/* Market hero image */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        style={{ width: '100%', height: 'clamp(200px,28vw,360px)', position: 'relative', overflow: 'hidden' }}
      >
        <motion.img
          src={MARKET_IMG}
          alt="Fromages au marché"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(253,250,244,0) 40%, var(--warm-white) 100%)',
        }} />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            position: 'absolute', bottom: '28px', right: 'clamp(24px,6vw,80px)',
            backgroundColor: 'rgba(247,242,232,0.92)', backdropFilter: 'blur(10px)',
            padding: '10px 18px', borderRadius: '12px',
            border: '1px solid rgba(196,122,58,0.2)',
          }}
        >
          <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--amber)', fontFamily: 'Playfair Display, serif' }}>
            Marché de Frontenex, chaque vendredi
          </p>
        </motion.div>
      </motion.div>

      {/* Content */}
      <div style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,6vw,80px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionTitle
            tag="Où nous trouver"
            title="Trois façons de repartir avec du fromage"
            subtitle="Pas de grande surface, pas d'intermédiaire. Nos fromages se trouvent là où Laurence les porte elle-même."
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}>
            {points.map((p, i) => <PointCard key={p.title} point={p} index={i} />)}
          </div>

          {/* Phone CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              marginTop: '48px', padding: 'clamp(28px,4vw,40px)',
              background: 'linear-gradient(135deg, var(--amber) 0%, #D9924F 100%)',
              borderRadius: '24px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: '24px', flexWrap: 'wrap',
            }}
          >
            <div>
              <h3 style={{
                fontFamily: 'Playfair Display, serif', fontSize: 'clamp(20px,3vw,28px)', fontWeight: 600,
                color: 'white', marginBottom: '6px',
              }}>
                Pas sûr des disponibilités ?
              </h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.82)', fontWeight: 300 }}>
                Laurence répond volontiers pour vous indiquer ce qu'il y a en stock.
              </p>
            </div>
            <a
              href="tel:0670446571"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '16px 32px', backgroundColor: 'white', color: 'var(--amber)',
                borderRadius: '100px', fontWeight: 600, fontSize: '16px',
                textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              📞 06 70 44 65 71
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
