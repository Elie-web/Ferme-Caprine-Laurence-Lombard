import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

/* Emil: magnetic nav CTA */
function MagneticCTA() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 28 })
  const springY = useSpring(y, { stiffness: 300, damping: 28 })
  const ref = useState(null)

  return (
    <motion.a
      href="tel:0670446571"
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      onMouseMove={e => {
        const el = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - (el.left + el.width / 2)) * 0.25)
        y.set((e.clientY - (el.top + el.height / 2)) * 0.25)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
    >
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '9px 20px', borderRadius: 'var(--r-full)',
        backgroundColor: 'var(--sage)', color: 'white',
        fontSize: '13px', fontWeight: 500, textDecoration: 'none',
        fontFamily: 'DM Sans, sans-serif',
        boxShadow: '0 2px 12px rgba(107,143,110,0.35)',
        transition: 'background-color 0.2s ease',
      }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--sage-dark)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--sage)'}
      >
        <Phone size={13} /> Nous appeler
      </span>
    </motion.a>
  )
}

export default function Nav({ navItems, scrollTo }) {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY }           = useScroll()

  useEffect(() => {
    return scrollY.on('change', v => setScrolled(v > 60))
  }, [scrollY])

  const handleNav = (ref) => { setOpen(false); setTimeout(() => scrollTo(ref), 40) }

  return (
    <>
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.1 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: scrolled ? '8px 28px' : '10px 28px',
          backgroundColor: scrolled ? 'rgba(247,242,232,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          /* Emil: shadow > border */
          boxShadow: scrolled ? '0 1px 0 rgba(107,143,110,0.12), 0 2px 20px rgba(44,36,32,0.06)' : 'none',
          transition: 'padding 0.4s ease, background-color 0.4s ease, box-shadow 0.4s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileTap={{ scale: 0.97 }}
          style={{
            fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: 600,
            color: scrolled ? 'var(--charcoal)' : 'white',
            background: 'none', border: 'none', cursor: 'pointer',
            letterSpacing: '0.01em', display: 'flex', alignItems: 'center', gap: '8px',
            transition: 'color 0.4s ease',
          }}
        >
          <span style={{ fontSize: '20px' }}>🐐</span>
          La Ferme de Marthod
        </motion.button>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden md:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.ref)}
              className="underline-reveal hit-area"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '8px 14px',
                fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 400,
                color: scrolled ? 'var(--charcoal-soft)' : 'rgba(255,255,255,0.8)',
                transition: 'color 0.3s ease',
              }}
            >
              {item.label}
            </button>
          ))}
          <div style={{ marginLeft: '8px' }}>
            <MagneticCTA />
          </div>
        </div>

        {/* Burger */}
        <motion.button
          className="md:hidden hit-area"
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.92 }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: scrolled ? 'var(--charcoal)' : 'white',
            borderRadius: 'var(--r-sm)',
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
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 48px) 32px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 48px) 32px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 48px) 32px)' }}
            transition={{ type: 'spring', stiffness: 60, damping: 18 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 99,
              backgroundColor: 'var(--cream)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '36px',
            }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18, delay: i * 0.07 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleNav(item.ref)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'Playfair Display, serif', fontSize: '32px', fontWeight: 600,
                  color: 'var(--charcoal)',
                }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.a
              href="tel:0670446571"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, delay: navItems.length * 0.07 }}
              whileTap={{ scale: 0.96 }}
              style={{
                marginTop: '8px', padding: '16px 36px',
                backgroundColor: 'var(--sage)', color: 'white',
                borderRadius: 'var(--r-full)', fontSize: '17px', fontWeight: 500,
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px',
                fontFamily: 'DM Sans, sans-serif',
                boxShadow: '0 4px 20px rgba(107,143,110,0.35)',
              }}
            >
              <Phone size={17} /> 06 70 44 65 71
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
