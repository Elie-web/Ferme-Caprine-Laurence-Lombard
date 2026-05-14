import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionTitle from '../components/SectionTitle'

const GOAT_PORTRAIT = 'https://images.unsplash.com/photo-1542764343-436008e87145?w=900&q=85&auto=format&fit=crop'
const GOAT_FIELD    = 'https://images.unsplash.com/photo-1622837699015-9a4cb8b7a94b?w=900&q=85&auto=format&fit=crop'
const FARM_MORNING  = 'https://images.unsplash.com/photo-1564477930176-78ad85136109?w=1200&q=85&auto=format&fit=crop'

function TimelineItem({ time, text, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: '70px', paddingTop: '2px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--amber)', fontFamily: 'Playfair Display, serif' }}>
          {time}
        </span>
        <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(196,122,58,0.2)' }} />
      </div>
      <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--charcoal-soft)', fontWeight: 300, paddingBottom: '24px' }}>
        {text}
      </p>
    </motion.div>
  )
}

export default function Histoire() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ backgroundColor: 'var(--cream)', overflow: 'hidden' }}>

      {/* Full-width morning landscape band */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{
          width: '100%', height: 'clamp(240px, 35vw, 440px)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${FARM_MORNING})`,
            backgroundSize: 'cover', backgroundPosition: 'center 40%',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(247,242,232,0) 50%, var(--cream) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(247,242,232,0.3) 0%, transparent 50%)',
        }} />
        {/* Floating label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            position: 'absolute', bottom: '32px', left: 'clamp(24px,6vw,80px)',
            backgroundColor: 'rgba(247,242,232,0.9)', backdropFilter: 'blur(12px)',
            padding: '12px 20px', borderRadius: '14px',
            border: '1px solid rgba(196,122,58,0.2)',
          }}
        >
          <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--charcoal)', fontFamily: 'Playfair Display, serif' }}>
            5h30 · Premier réveil de la ferme
          </p>
          <p style={{ fontSize: '11px', color: 'var(--sage)', fontWeight: 300 }}>
            Marthod, Savoie
          </p>
        </motion.div>
      </motion.div>

      {/* Main content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(60px,8vw,100px) clamp(24px,6vw,80px) clamp(80px,10vw,130px)' }}>
        <SectionTitle
          tag="Notre histoire"
          title="Une vocation née dans les alpages"
          subtitle="Ancienne comptable, Laurence a tout quitté pour reprendre la ferme familiale et vivre de ses chèvres."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(40px,6vw,80px)',
          alignItems: 'start',
        }}>
          {/* Photo column */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {/* Main photo */}
            <div style={{
              borderRadius: '20px', overflow: 'hidden',
              aspectRatio: '4/3', position: 'relative',
              boxShadow: '0 24px 64px rgba(44,36,32,0.14)',
            }}>
              <motion.img
                src={GOAT_PORTRAIT}
                alt="Chèvre de la ferme de Marthod"
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Label overlay */}
              <div style={{
                position: 'absolute', bottom: '16px', left: '16px',
                backgroundColor: 'rgba(247,242,232,0.92)', backdropFilter: 'blur(8px)',
                padding: '10px 16px', borderRadius: '12px',
                border: '1px solid rgba(196,122,58,0.2)',
              }}>
                <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--charcoal)', fontFamily: 'Playfair Display, serif' }}>
                  Laurence Lombard
                </p>
                <p style={{ fontSize: '11px', color: 'var(--sage)', fontWeight: 300 }}>Éleveuse · Fromagère · Marthod</p>
              </div>
            </div>

            {/* Second photo */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                borderRadius: '16px', overflow: 'hidden',
                aspectRatio: '16/9', position: 'relative',
                boxShadow: '0 12px 32px rgba(44,36,32,0.1)',
              }}
            >
              <img
                src={GOAT_FIELD}
                alt="Troupeau de chèvres"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(44,36,32,0.5) 0%, transparent 60%)',
              }} />
              <p style={{
                position: 'absolute', bottom: '14px', left: '16px',
                color: 'white', fontSize: '12px', fontWeight: 300, letterSpacing: '0.04em',
              }}>
                Le troupeau · ~30 chèvres
              </p>
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                padding: '20px 24px',
                borderLeft: '3px solid var(--amber)',
                backgroundColor: 'rgba(196,122,58,0.06)',
                borderRadius: '0 12px 12px 0',
              }}
            >
              <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontStyle: 'italic', color: 'var(--charcoal)', lineHeight: 1.65 }}>
                "Je me lève à 5h30 chaque matin parce que mes chèvres m'attendent. C'est une vie exigeante, mais c'est la mienne."
              </p>
              <footer style={{ marginTop: '10px', fontSize: '12px', color: 'var(--sage-dark)', fontWeight: 500 }}>
                Laurence Lombard
              </footer>
            </motion.blockquote>
          </motion.div>

          {/* Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '8px' }}>
            <TimelineItem time="5h30" text="Chaque matin et chaque soir à 17h, Laurence et Didier effectuent les deux traites journalières. Environ 50 à 60 litres de lait frais, prélevés directement sur le troupeau." delay={0.1} />
            <TimelineItem time="Matin" text="Toute la matinée est consacrée à la transformation fromagère : caillage, moulage, salage, affinage. Un savoir-faire artisanal transmis et perfectionné au fil des saisons." delay={0.2} />
            <TimelineItem time="Famille" text="Laurence travaille aux côtés de son mari Didier et de ses enfants. La ferme est un projet familial qui anime les 10 hectares de pâturages savoyards." delay={0.3} />
            <TimelineItem time="Vendredi" text="Chaque vendredi matin, Laurence investit le marché de Frontenex pour vendre directement ses fromages aux habitants du coin. Un moment de lien et de partage." delay={0.4} />
            <TimelineItem time="AMAP" text="Membre de l'AMAP de la Dent de Cons, Laurence s'engage dans la durée avec ses adhérents : un panier fromager régulier, en circuit ultra-court." delay={0.5} />

            {/* Values pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}
            >
              {['Artisanal', 'Familial', 'Local', 'Sans intermédiaire', 'Naturel'].map(v => (
                <span key={v} style={{
                  fontSize: '12px', fontWeight: 400,
                  color: 'var(--sage-dark)', border: '1px solid rgba(107,143,110,0.35)',
                  padding: '5px 14px', borderRadius: '100px',
                  backgroundColor: 'rgba(107,143,110,0.06)',
                }}>
                  {v}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
