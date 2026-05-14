import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Phone, Navigation, Info } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'

export default function Acces() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      style={{
        backgroundColor: 'var(--charcoal)',
        padding: 'clamp(80px, 10vw, 130px) clamp(24px, 6vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionTitle
          tag="Accès"
          title="Venez nous rendre visite"
          subtitle="La ferme est ouverte aux visites, de préférence sur rendez-vous. Une belle occasion de rencontrer les chèvres."
          light
        />

        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          {/* Map embed */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              gridColumn: 'span 1',
            }}
          >
            <iframe
              title="Ferme de Marthod, Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2762.8!2d6.3741!3d45.6184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDM3JzA2LjIiTiA2wrAyMiczMy42IkU!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
              width="100%"
              height="320"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Address card */}
            <div style={{
              padding: '28px',
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                backgroundColor: 'rgba(196,122,58,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <MapPin size={20} color="var(--amber)" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 500 }}>
                  Adresse
                </p>
                <p style={{ fontSize: '16px', color: 'white', fontWeight: 400, lineHeight: 1.5 }}>
                  4411 Route des Hameaux<br />
                  <span style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>Marthod, 73400, Savoie</span>
                </p>
              </div>
            </div>

            {/* Phone card */}
            <div style={{
              padding: '28px',
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                backgroundColor: 'rgba(107,143,110,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Phone size={20} color="var(--sage-light)" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 500 }}>
                  Téléphone
                </p>
                <a href="tel:0670446571" style={{
                  fontSize: '22px',
                  color: 'white',
                  fontWeight: 500,
                  textDecoration: 'none',
                  fontFamily: 'Playfair Display, serif',
                  letterSpacing: '0.02em',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--amber-light)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                >
                  06 70 44 65 71
                </a>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontWeight: 300, marginTop: '4px' }}>
                  Laurence répond en dehors des traites
                </p>
              </div>
            </div>

            {/* Navigate CTA */}
            <motion.a
              href="https://maps.google.com/?q=4411+Route+des+Hameaux,+Marthod+73400"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '16px 28px',
                backgroundColor: 'var(--amber)',
                color: 'white',
                borderRadius: '100px',
                fontSize: '15px',
                fontWeight: 500,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              <Navigation size={16} />
              Ouvrir dans Google Maps
            </motion.a>

            {/* Practical note */}
            <div style={{
              padding: '20px',
              backgroundColor: 'rgba(107,143,110,0.12)',
              border: '1px solid rgba(107,143,110,0.2)',
              borderRadius: '16px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
            }}>
              <Info size={16} color="rgba(143,175,146,0.8)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.7)',
                fontStyle: 'italic',
                fontWeight: 300,
                lineHeight: 1.6,
              }}>
                <strong style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>Conseil :</strong>{' '}
                Appelez la veille pour confirmer votre passage et être sûr de trouver Laurence disponible.
                La vie de ferme réserve parfois des surprises !
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
