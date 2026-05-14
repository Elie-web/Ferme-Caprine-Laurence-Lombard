import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SectionTitle({ tag, title, subtitle, light = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} style={{ textAlign: 'center', marginBottom: '64px' }}>
      {tag && (
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          style={{
            display: 'inline-block', fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: light ? 'rgba(255,255,255,0.6)' : 'var(--sage)',
            backgroundColor: light ? 'rgba(255,255,255,0.1)' : 'rgba(107,143,110,0.12)',
            border: light ? '1px solid rgba(255,255,255,0.18)' : 'none',
            padding: '6px 16px', borderRadius: 'var(--r-full)', marginBottom: '20px',
          }}
        >
          {tag}
        </motion.span>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.08 }}
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(30px,5vw,52px)', fontWeight: 700,
          lineHeight: 1.12, textWrap: 'balance', /* Emil */
          color: light ? 'var(--warm-white)' : 'var(--charcoal)',
          marginBottom: subtitle ? '18px' : 0,
        }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.16 }}
          style={{
            fontSize: '17px', lineHeight: 1.75,
            color: light ? 'rgba(253,250,244,0.68)' : 'var(--charcoal-soft)',
            maxWidth: '540px', margin: '0 auto', fontWeight: 300, textWrap: 'balance',
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
