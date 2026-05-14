import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from 'framer-motion'
import { Menu, X, Phone, Mountain } from 'lucide-react'

function MagneticCTA({ compact = false }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 28 })
  const springY = useSpring(y, { stiffness: 300, damping: 28 })

  return (
    <motion.a
      href="tel:0670446571"
      style={{ x: springX, y: springY, display: 'inline-block' }}
      whileTap={{ scale: 0.96 }}
      onMouseMove={e => {
        const el = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - (el.left + el.width / 2)) * 0.25)
        y.set((e.clientY - (el.top + el.height / 2)) * 0.25)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
    >
      <span
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: compact ? '8px 16px' : '9px 20px',
          borderRadius: 'var(--r-full)',
          backgroundColor: 'var(--sage)', color: 'white',
          fontSize: '13px', fontWeight: 500, textDecoration: 'none',
          fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap',
          boxShadow: '0 2px 12px rgba(107,143,110,0.35)',
          transition: 'background-color 0.2s ease, padding 0.3s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--sage-dark)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--sage)'}
      >
        <Phone size={13} strokeWidth={2} /> Nous appeler
      </span>
    </motion.a>
  )
}

export default function Nav({ navItems, scrollTo }) {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : false
  )
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.on('change', v => setScrolled(v > 60))
  }, [scrollY])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const handler = (e) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handleNav = (ref) => { setOpen(false); setTimeout(() => scrollTo(ref), 40) }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.1 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '16px',
          padding: scrolled ? '10px 28px' : '16px 28px',
          backgroundColor: scrolled ? 'rgba(247,242,232,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled
            ? '0 1px 0 rgba(107,143,110,0.12), 0 4px 24px rgba(44,36,32,0.07)'
            : 'none',
          opacity: open ? 0 : 1,
          pointerEvents: open ? 'none' : 'auto',
          transition: 'padding 0.45s cubic-bezier(0.4,0,0.2,1), background-color 0.4s ease, box-shadow 0.4s ease, opacity 0.2s ease',
        }}
      >
        {/* ── Logo ─────────────────────────────────────── */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileTap={{ scale: 0.97 }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px',
            flexShrink: 0, minWidth: 0,
            color: scrolled ? 'var(--charcoal)' : 'white',
            transition: 'color 0.4s ease',
          }}
        >
          <Mountain
            size={18}
            strokeWidth={1.8}
            style={{
              color: scrolled ? 'var(--sage)' : 'rgba(255,255,255,0.85)',
              transition: 'color 0.4s ease',
              flexShrink: 0,
            }}
          />

          {isDesktop ? (
            /* Desktop — logo fixe, pas de collapse */
            <span style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '17px', fontWeight: 600,
              letterSpacing: '0.01em', whiteSpace: 'nowrap',
            }}>
              La Ferme de Marthod
            </span>
          ) : (
            /* Mobile/tablette — collapse au scroll */
            <div style={{ position: 'relative', overflow: 'hidden', height: '22px', display: 'flex', alignItems: 'center' }}>
              <AnimatePresence mode="wait" initial={false}>
                {scrolled ? (
                  <motion.span
                    key="short"
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -18, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '16px', fontWeight: 600,
                      letterSpacing: '0.01em', whiteSpace: 'nowrap',
                      display: 'block',
                    }}
                  >
                    Marthod
                  </motion.span>
                ) : (
                  <motion.span
                    key="long"
                    initial={{ y: -18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 18, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '17px', fontWeight: 600,
                      letterSpacing: '0.01em', whiteSpace: 'nowrap',
                      display: 'block',
                    }}
                  >
                    La Ferme de Marthod
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.button>

        {/* ── Centre — liens de navigation (desktop uniquement) ── */}
        {isDesktop && (
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item.ref)}
                className="underline-reveal hit-area"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '6px 11px',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '13.5px', fontWeight: 400,
                  color: scrolled ? 'var(--charcoal-soft)' : 'rgba(255,255,255,0.82)',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = scrolled ? 'var(--charcoal)' : 'white'}
                onMouseLeave={e => e.currentTarget.style.color = scrolled ? 'var(--charcoal-soft)' : 'rgba(255,255,255,0.82)'}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* ── Droite — CTA desktop ou burger mobile/tablette ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {isDesktop ? (
            <MagneticCTA compact={scrolled} />
          ) : (
            <motion.button
              onClick={() => setOpen(!open)}
              whileTap={{ scale: 0.92 }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: scrolled ? 'var(--charcoal)' : 'white',
                borderRadius: 'var(--r-sm)',
                padding: '4px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={open ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  style={{ display: 'flex' }}
                >
                  {open ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          )}
        </div>
      </motion.nav>

      {/* ── Menu mobile fullscreen ────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 44px) 28px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 44px) 28px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 44px) 28px)' }}
            transition={{ type: 'spring', stiffness: 55, damping: 17 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 101,
              backgroundColor: 'var(--cream)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* ── Header interne ── */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '18px 24px',
              borderBottom: '1px solid rgba(44,36,32,0.07)',
              flexShrink: 0,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: 600,
                color: 'var(--charcoal)',
              }}>
                <Mountain size={16} color="var(--sage)" strokeWidth={1.8} />
                La Ferme de Marthod
              </div>
              <motion.button
                onClick={() => setOpen(false)}
                whileTap={{ scale: 0.88 }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--charcoal)', padding: '6px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 'var(--r-sm)',
                }}
              >
                <X size={22} />
              </motion.button>
            </div>

            {/* ── Nav items ── */}
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '4px', padding: '16px 24px', overflow: 'hidden',
            }}>
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 130, damping: 20, delay: 0.05 + i * 0.055 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleNav(item.ref)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px, 7vw, 36px)', fontWeight: 600,
                    color: 'var(--charcoal)',
                    padding: '10px 24px',
                    borderRadius: '12px',
                    transition: 'background-color 0.15s ease, color 0.15s ease',
                    width: '100%', textAlign: 'center',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(107,143,110,0.08)'; e.currentTarget.style.color = 'var(--sage-dark)' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--charcoal)' }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* ── CTA bas ── */}
            <div style={{
              padding: '20px 24px',
              borderTop: '1px solid rgba(44,36,32,0.07)',
              flexShrink: 0,
            }}>
              <motion.a
                href="tel:0670446571"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 130, damping: 20, delay: 0.05 + navItems.length * 0.055 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  padding: '16px',
                  backgroundColor: 'var(--sage)', color: 'white',
                  borderRadius: 'var(--r-full)', fontSize: '16px', fontWeight: 500,
                  textDecoration: 'none',
                  fontFamily: 'DM Sans, sans-serif',
                  boxShadow: '0 4px 20px rgba(107,143,110,0.3)',
                  width: '100%',
                }}
              >
                <Phone size={16} /> 06 70 44 65 71
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
