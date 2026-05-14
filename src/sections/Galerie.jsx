import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { X } from 'lucide-react'

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1691472898747-363d6d7409de?w=800&q=85&auto=format&fit=crop',
    alt: 'Plateau de fromages de chèvre artisanaux',
    span: 'col-span-2 row-span-2',
    w: 800, h: 600,
  },
  {
    src: 'https://images.unsplash.com/photo-1542764343-436008e87145?w=600&q=85&auto=format&fit=crop',
    alt: 'Portrait de chèvre',
    span: '',
    w: 400, h: 400,
  },
  {
    src: 'https://images.unsplash.com/photo-1686998424265-075c0a30b9b2?w=600&q=85&auto=format&fit=crop',
    alt: 'Fabrication artisanale du fromage',
    span: '',
    w: 400, h: 400,
  },
  {
    src: 'https://images.unsplash.com/photo-1756922245026-934ff1648d79?w=600&q=85&auto=format&fit=crop',
    alt: 'Fromages en affinage sur clayettes',
    span: '',
    w: 400, h: 300,
  },
  {
    src: 'https://images.unsplash.com/photo-1622837699015-9a4cb8b7a94b?w=800&q=85&auto=format&fit=crop',
    alt: 'Troupeau de chèvres au pâturage',
    span: 'col-span-2',
    w: 800, h: 400,
  },
  {
    src: 'https://images.unsplash.com/photo-1706059922500-51ff9bf9611e?w=600&q=85&auto=format&fit=crop',
    alt: 'Stand de fromages au marché',
    span: '',
    w: 400, h: 400,
  },
  {
    src: 'https://images.unsplash.com/photo-1564477930176-78ad85136109?w=800&q=85&auto=format&fit=crop',
    alt: 'Lever du soleil sur la ferme',
    span: '',
    w: 400, h: 400,
  },
  {
    src: 'https://images.unsplash.com/photo-1759310347417-8db9c79c088f?w=800&q=85&auto=format&fit=crop',
    alt: 'Chèvres en Savoie',
    span: '',
    w: 400, h: 300,
  },
]

function PhotoItem({ photo, index, onClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick(photo)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '16px', overflow: 'hidden',
        cursor: 'zoom-in', position: 'relative',
        boxShadow: hovered ? '0 20px 50px rgba(44,36,32,0.2)' : '0 4px 20px rgba(44,36,32,0.08)',
        transition: 'box-shadow 0.4s ease, transform 0.4s ease',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
          transition: 'transform 0.6s ease',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          aspectRatio: `${photo.w}/${photo.h}`,
        }}
        loading="lazy"
      />
      {/* Hover overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(44,36,32,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span style={{
          backgroundColor: 'rgba(247,242,232,0.92)', backdropFilter: 'blur(8px)',
          padding: '8px 20px', borderRadius: '100px',
          fontSize: '12px', fontWeight: 500, color: 'var(--charcoal)',
          letterSpacing: '0.04em',
        }}>
          Agrandir
        </span>
      </motion.div>
    </motion.div>
  )
}

export default function Galerie() {
  const [selected, setSelected] = useState(null)

  return (
    <section style={{ backgroundColor: 'var(--cream-dark)', padding: 'clamp(80px,10vw,130px) clamp(24px,6vw,80px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,64px)' }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-block', fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--sage)',
              backgroundColor: 'rgba(107,143,110,0.12)', padding: '6px 16px',
              borderRadius: '100px', marginBottom: '20px',
            }}
          >
            La ferme en images
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(32px,5vw,52px)', fontWeight: 600,
              color: 'var(--charcoal)', lineHeight: 1.15,
            }}
          >
            Bienvenue dans notre quotidien
          </motion.h2>
        </div>

        {/* Masonry-style grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: '200px',
          gap: '12px',
        }}>
          {/* Big feature photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onClick={() => setSelected(photos[0])}
            style={{
              gridColumn: 'span 2', gridRow: 'span 2',
              borderRadius: '20px', overflow: 'hidden',
              cursor: 'zoom-in', position: 'relative',
              boxShadow: '0 12px 40px rgba(44,36,32,0.12)',
            }}
          >
            <img src={photos[0].src} alt={photos[0].alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(44,36,32,0.4) 0%, transparent 50%)',
              pointerEvents: 'none',
            }} />
            <p style={{
              position: 'absolute', bottom: '16px', left: '20px',
              color: 'white', fontSize: '13px', fontWeight: 300, letterSpacing: '0.03em',
              fontStyle: 'italic',
            }}>
              {photos[0].alt}
            </p>
          </motion.div>

          {/* Remaining photos */}
          {photos.slice(1).map((photo, i) => (
            <PhotoItem key={photo.src} photo={photo} index={i + 1} onClick={setSelected} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            backgroundColor: 'rgba(20,14,10,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px', backdropFilter: 'blur(12px)',
          }}
        >
          <button
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', top: '24px', right: '24px',
              background: 'rgba(255,255,255,0.15)', border: 'none',
              borderRadius: '50%', width: '44px', height: '44px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'white', backdropFilter: 'blur(8px)',
              zIndex: 201,
            }}
          >
            <X size={20} />
          </button>
          <motion.img
            src={selected.src.replace('w=600', 'w=1400').replace('w=800', 'w=1400')}
            alt={selected.alt}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '90vw', maxHeight: '85vh',
              objectFit: 'contain', borderRadius: '16px',
              boxShadow: '0 40px 120px rgba(0,0,0,0.5)',
            }}
          />
          <p style={{
            position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.5)', fontSize: '13px', letterSpacing: '0.04em',
          }}>
            {selected.alt}
          </p>
        </motion.div>
      )}
    </section>
  )
}
