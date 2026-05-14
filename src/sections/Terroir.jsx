import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Leaf, RefreshCw, Clock, Heart } from 'lucide-react'

const ALPINE = 'https://images.unsplash.com/photo-1753195269044-68384b0c3a33?w=1800&q=90&auto=format&fit=crop'

const valeurs = [
  {
    Icon: Leaf,
    title: 'Pâturages naturels',
    desc: 'Dix hectares de prairies savoyardes où les chèvres broutent librement l\'herbe fraîche et les plantes aromatiques des alpages.',
  },
  {
    Icon: RefreshCw,
    title: 'Circuit ultra-court',
    desc: 'De la ferme à votre table sans intermédiaire. Vous connaissez la personne qui a fabriqué votre fromage, et même ses chèvres.',
  },
  {
    Icon: Clock,
    title: 'Temps respecté',
    desc: 'Aucune accélération artificielle. L\'affinage prend le temps qu\'il faut. La qualité ne se négocie pas avec le calendrier.',
  },
  {
    Icon: Heart,
    title: 'Projet familial',
    desc: 'Laurence, Didier et leurs enfants. Une ferme qui se transmet, qui s\'enracine, qui donne du sens à chaque fromage produit.',
  },
]

export default function Terroir() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Full-bleed Alpine image with parallax */}
      <div style={{ position: 'relative', height: 'clamp(340px, 55vw, 680px)', overflow: 'hidden' }}>
        <motion.div
          style={{
            position: 'absolute', inset: '-10%',
            backgroundImage: `url(${ALPINE})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            y: imgY,
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(20,14,10,0.25) 0%, rgba(20,14,10,0.65) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(44,36,32,0.4) 0%, transparent 60%)',
        }} />

        {/* Text overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: 'clamp(32px,6vw,80px)',
          maxWidth: '1200px', margin: '0 auto', width: '100%',
          left: '50%', transform: 'translateX(-50%)',
        }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-block', fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '6px 16px', borderRadius: '100px', marginBottom: '20px',
              width: 'fit-content',
            }}
          >
            Notre terroir
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(32px,5.5vw,68px)', fontWeight: 600,
              color: 'white', lineHeight: 1.1, maxWidth: '700px',
              marginBottom: '20px',
            }}
          >
            La Savoie dans<br />
            <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>chaque bouchée.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(255,255,255,0.75)',
              fontWeight: 300, lineHeight: 1.7, maxWidth: '520px',
            }}
          >
            À Marthod, les prairies vertes, l'air pur des alpages et les plantes aromatiques
            de montagne confèrent au lait des chèvres de Laurence un caractère absolument unique.
          </motion.p>
        </div>

        <div style={{
          position: 'absolute', bottom: '16px', right: '20px',
          fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em',
        }}>
          Alpes savoyardes · Marthod
        </div>
      </div>

      {/* Values grid */}
      <div style={{
        backgroundColor: 'var(--charcoal)', padding: 'clamp(64px,8vw,100px) clamp(24px,6vw,80px)',
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'clamp(24px,3vw,40px)',
        }}>
          {valeurs.map((v, i) => {
            const Icon = v.Icon
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  padding: '28px',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  transition: 'background-color 0.3s ease, border-color 0.3s ease',
                }}
                whileHover={{
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  borderColor: 'rgba(196,122,58,0.25)',
                }}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  backgroundColor: 'rgba(196,122,58,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <Icon size={20} color="var(--amber)" strokeWidth={1.6} />
                </div>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 600,
                  color: 'white', marginBottom: '10px',
                }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>
                  {v.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
