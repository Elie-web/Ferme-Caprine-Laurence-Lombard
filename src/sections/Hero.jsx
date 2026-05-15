import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useCallback } from 'react'
import { ArrowRight, Phone, MapPin } from 'lucide-react'

const HERO_IMG = 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=2000&q=90&auto=format&fit=crop'

function MagneticButton({ children, href, onClick, primary = true }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 25 })
  const springY = useSpring(y, { stiffness: 300, damping: 25 })

  const handleMove = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.28)
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.28)
  }, [x, y])

  const handleLeave = useCallback(() => { x.set(0); y.set(0) }, [x, y])
  const Tag = href ? 'a' : 'button'

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, display: 'inline-block' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.96 }}
    >
      <Tag
        href={href}
        onClick={onClick}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          padding: primary ? '16px 32px' : '15px 28px',
          borderRadius: 'var(--r-full)',
          fontSize: '14px', fontWeight: primary ? 500 : 400,
          letterSpacing: '0.02em',
          cursor: 'pointer', textDecoration: 'none', border: 'none',
          backgroundColor: primary ? 'var(--amber)' : 'transparent',
          color: 'white',
          backdropFilter: primary ? 'none' : 'blur(12px)',
          WebkitBackdropFilter: primary ? 'none' : 'blur(12px)',
          outline: primary ? 'none' : '1px solid rgba(255,255,255,0.25)',
          fontFamily: 'DM Sans, sans-serif',
          boxShadow: primary
            ? '0 8px 32px rgba(196,122,58,0.45), 0 2px 8px rgba(0,0,0,0.2)'
            : 'none',
          transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => {
          if (primary) {
            e.currentTarget.style.backgroundColor = '#D9924F'
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(196,122,58,0.6), 0 4px 12px rgba(0,0,0,0.25)'
          } else {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'
          }
        }}
        onMouseLeave={e => {
          if (primary) {
            e.currentTarget.style.backgroundColor = 'var(--amber)'
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(196,122,58,0.45), 0 2px 8px rgba(0,0,0,0.2)'
          } else {
            e.currentTarget.style.backgroundColor = 'transparent'
          }
        }}
      >
        {children}
      </Tag>
    </motion.div>
  )
}

const HEADLINE_LINES = [
  { text: 'Ferme',    weight: 400, italic: false },
  { text: 'Caprine',  weight: 700, italic: false },
  { text: 'Marthod.', weight: 700, italic: true, amber: true },
]

const STATS = [
  { num: '~30',   label: 'chèvres',       sub: 'élevées avec soin' },
  { num: '2×',    label: 'traite / jour',  sub: 'chaque matin à 5h30' },
  { num: '0',     label: 'intermédiaire',  sub: 'direct producteur' },
  { num: '10 ha', label: 'de pâturages',   sub: 'en montagne savoyarde' },
]

export default function Hero({ scrollTo, histoireRef, fromagesRef }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const imgY     = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const opacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])

  return (
    <section
      ref={containerRef}
      style={{
        height: '100svh',
        minHeight: '640px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Parallax image — extended top/bottom to prevent edge bleeding */}
      <motion.div
        role="img"
        aria-label="Paysage de montagne savoyarde au lever du soleil, Marthod, Savoie"
        style={{
          position: 'absolute',
          top: '-12%', bottom: '-12%', left: 0, right: 0,
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          y: imgY,
          willChange: 'transform',
        }}
      />

      {/* Cinematic overlay — directional gradient for editorial left layout */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(105deg, rgba(8,6,4,0.84) 0%, rgba(8,6,4,0.52) 50%, rgba(8,6,4,0.18) 100%)',
          'linear-gradient(to bottom, rgba(8,6,4,0.42) 0%, transparent 28%, transparent 58%, rgba(8,6,4,0.9) 100%)',
        ].join(', '),
      }} />

      {/* Grain texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.2,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
      }} />

      {/* Vertical amber accent line — editorial detail */}
      <motion.div
        className="hero-accent-line"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          left: 'clamp(24px, 5.5vw, 68px)',
          top: '18%', bottom: '22%',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(196,122,58,0.5) 25%, rgba(196,122,58,0.5) 75%, transparent 100%)',
          transformOrigin: 'top center',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* ── Main content ── */}
      <motion.div
        style={{
          opacity,
          y: contentY,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(96px, 12vh, 144px) clamp(24px, 6vw, 80px) clamp(28px, 4vh, 48px)',
          paddingLeft: 'clamp(48px, 8.5vw, 108px)',
        }}>

          {/* Location + year badge */}
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 110, damping: 22, delay: 0.15 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              marginBottom: '28px',
            }}
          >
            <MapPin size={11} color="var(--sage-light)" strokeWidth={2.5} />
            <span style={{
              fontSize: '10.5px', fontWeight: 500, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
              fontFamily: 'DM Sans, sans-serif',
            }}>
              Marthod · Savoie
            </span>
            <span style={{
              width: '20px', height: '1px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'inline-block', flexShrink: 0,
            }} />
            <span style={{
              fontSize: '10.5px', fontWeight: 500, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--sage-light)',
              fontFamily: 'DM Sans, sans-serif',
            }}>
              Depuis 1998
            </span>
          </motion.div>

          {/* Headline — 3-line mask reveal */}
          <h1 style={{ marginBottom: '28px', margin: 0, marginBottom: '28px', fontWeight: 'inherit', fontSize: 'inherit', lineHeight: 'inherit', padding: 0 }}>
            {HEADLINE_LINES.map((line, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <motion.span
                  initial={{ y: '108%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    type: 'spring', stiffness: 60, damping: 16,
                    delay: 0.28 + i * 0.11,
                  }}
                  style={{
                    display: 'block',
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(52px, 8.8vw, 114px)',
                    fontWeight: line.weight,
                    lineHeight: 0.95,
                    letterSpacing: '-0.025em',
                    fontStyle: line.italic ? 'italic' : 'normal',
                    color: line.amber ? 'var(--amber)' : 'white',
                    willChange: 'transform',
                    paddingBottom: '5px',
                  }}
                >
                  {line.text}
                </motion.span>
              </div>
            ))}
          </h1>

          {/* Amber rule + subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.72 }}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: '18px',
              marginBottom: '42px', maxWidth: '440px',
            }}
          >
            <div style={{
              width: '28px', height: '1.5px',
              backgroundColor: 'var(--amber)',
              flexShrink: 0, marginTop: '10px',
            }} />
            <p style={{
              fontSize: 'clamp(13.5px, 1.4vw, 16.5px)',
              color: 'rgba(255,255,255,0.6)',
              fontWeight: 300, lineHeight: 1.85,
              fontFamily: 'DM Sans, sans-serif',
            }}>
              Chaque matin à 5h30, Laurence traire ses 30&nbsp;chèvres.
              Aucun intermédiaire. Aucune concession.
              Du fromage comme vous n'en avez pas goûté depuis&nbsp;longtemps.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.9 }}
            className="hero-cta-row"
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <MagneticButton primary onClick={() => scrollTo(fromagesRef)}>
              Découvrir nos fromages <ArrowRight size={15} strokeWidth={1.8} />
            </MagneticButton>
            <MagneticButton primary={false} onClick={() => scrollTo(histoireRef)}>
              Notre histoire
            </MagneticButton>
            <motion.a
              href="tel:0670446571"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                color: 'rgba(255,255,255,0.42)', textDecoration: 'none',
                fontSize: '13px', fontFamily: 'DM Sans, sans-serif',
                letterSpacing: '0.01em', paddingLeft: '6px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.82)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.42)'}
            >
              <Phone size={13} strokeWidth={1.8} />
              06 70 44 65 71
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        onClick={() => scrollTo(histoireRef)}
        aria-label="Défiler vers la section suivante"
        style={{
          position: 'absolute',
          bottom: 'clamp(88px, 11vh, 118px)',
          right: 'clamp(28px, 4.5vw, 64px)',
          zIndex: 3,
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          padding: '8px',
          opacity: 0.9,
        }}
        whileHover={{ opacity: 0.55 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px', height: '46px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.06))',
          }}
        />
        <span style={{
          fontSize: '9px', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)',
          fontFamily: 'DM Sans, sans-serif',
        }}>
          Scroll
        </span>
      </motion.button>

      {/* ── Stats bar — frosted glass anchored to bottom ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative', zIndex: 2,
          width: '100%',
          backgroundColor: 'rgba(6,4,3,0.55)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="hero-stats"
          style={{
            maxWidth: '1200px', margin: '0 auto',
            padding: 'clamp(18px, 2.5vw, 26px) clamp(24px, 6vw, 80px)',
            paddingLeft: 'clamp(48px, 8.5vw, 108px)',
          }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="hero-stat-item"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring', stiffness: 100, damping: 18,
                delay: 1.4 + i * 0.07,
              }}
              style={{
                display: 'flex', flexDirection: 'column', gap: '2px',
              }}
            >
              <span style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 700,
                color: 'var(--amber)', lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}>
                {s.num}
              </span>
              <span style={{
                fontSize: '11.5px', color: 'rgba(255,255,255,0.72)',
                fontWeight: 500, fontFamily: 'DM Sans, sans-serif',
                letterSpacing: '0.01em',
              }}>
                {s.label}
              </span>
              <span style={{
                fontSize: '10px', color: 'rgba(255,255,255,0.3)',
                fontWeight: 300, letterSpacing: '0.03em',
                fontFamily: 'DM Sans, sans-serif',
              }}>
                {s.sub}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
