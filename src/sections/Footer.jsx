import { motion } from 'framer-motion'
import { Phone, MapPin, Heart } from 'lucide-react'

export default function Footer({ navItems, scrollTo }) {
  return (
    <footer
      style={{
        backgroundColor: '#1C1612',
        padding: 'clamp(48px, 6vw, 80px) clamp(24px, 6vw, 80px) 32px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          paddingBottom: '48px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '32px',
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '20px',
              fontWeight: 600,
              color: 'white',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span>🐐</span> La Ferme de Marthod
            </div>
            <p style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.7,
              fontWeight: 300,
              maxWidth: '220px',
            }}>
              Fromages de chèvre artisanaux, fabriqués chaque matin en Savoie.
            </p>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="tel:0670446571" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--amber-light)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >
                <Phone size={13} />
                06 70 44 65 71
              </a>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
                <MapPin size={13} />
                Marthod, Savoie (73400)
              </span>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 style={{
              fontSize: '12px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 500,
              marginBottom: '16px',
            }}>
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.ref)}
                  className="text-underline-reveal"
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(255,255,255,0.6)', fontSize: '14px',
                    textAlign: 'left', padding: 0, fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 300, transition: 'color 0.2s',
                    width: 'fit-content',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Points de vente */}
          <div>
            <h4 style={{
              fontSize: '12px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 500,
              marginBottom: '16px',
            }}>
              Points de vente
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'À la ferme', detail: 'Sur rendez-vous' },
                { name: 'Marché de Frontenex', detail: 'Vendredi matin' },
                { name: 'AMAP Dent de Cons', detail: 'Adhésion requise' },
              ].map((p) => (
                <div key={p.name}>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', fontWeight: 400 }}>{p.name}</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>{p.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div>
            <h4 style={{
              fontSize: '12px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 500,
              marginBottom: '16px',
            }}>
              Commander
            </h4>
            <p style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.5)',
              fontWeight: 300,
              lineHeight: 1.6,
              marginBottom: '16px',
            }}>
              Appelez Laurence pour réserver vos fromages ou obtenir des informations sur la production du moment.
            </p>
            <a
              href="tel:0670446571"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: 'var(--amber)',
                color: 'white',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D9924F'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--amber)'}
            >
              <Phone size={14} />
              Appeler la ferme
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>
            © 2025 Ferme caprine de Marthod · Laurence Lombard
          </p>
          <p style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: 300,
          }}>
            Fait avec <Heart size={12} style={{ color: 'var(--amber)', opacity: 0.7 }} /> en Savoie
          </p>
        </div>
      </div>
    </footer>
  )
}
