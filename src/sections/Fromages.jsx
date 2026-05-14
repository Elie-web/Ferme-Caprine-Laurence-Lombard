import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import SectionTitle from '../components/SectionTitle'

const CHEESE_BOARD = 'https://images.unsplash.com/photo-1691472898747-363d6d7409de?w=1400&q=85&auto=format&fit=crop'
const AGING_SHELF  = 'https://images.unsplash.com/photo-1756922245026-934ff1648d79?w=900&q=85&auto=format&fit=crop'

const fromages = [
  {
    emoji: '🧀',
    name: 'Fromage frais',
    prix: '3,50 €',
    unite: '/ pièce',
    saison: 'Toute l\'année',
    desc: 'Onctueux, doux, légèrement acidulé, vous sentirez le lait du matin. Tartinez-le sur du pain de campagne ou dégustez-le nature, avec un filet d\'huile d\'olive.',
    texture: 'Frais · Crémeux',
    accent: '#C47A3A',
    bg: 'rgba(196,122,58,0.07)',
    tags: ['Doux', 'Frais', 'Tartiner'],
  },
  {
    emoji: '🫙',
    name: 'Buchette mi-affinée',
    prix: '4,50 €',
    unite: '/ pièce',
    saison: 'Printemps · Été',
    desc: 'Quelques jours d\'affinage lui donnent une croûte fleurie et un cœur fondant. Caractère naissant, texture parfaite. Le préféré de nos habitués du marché.',
    texture: 'Mi-affiné · Fondant',
    accent: '#6B8F6E',
    bg: 'rgba(107,143,110,0.07)',
    tags: ['Équilibré', 'Fondant', 'Fleur'],
  },
  {
    emoji: '🧱',
    name: 'Tomme affinée',
    prix: '19 €',
    unite: '/ pièce',
    saison: 'Automne · Hiver',
    desc: 'Plusieurs semaines d\'affinage en cave lui donnent des notes de noisette profondes. Idéale à la coupe pour un plateau de fête, accompagnée d\'un verre de Chignin.',
    texture: 'Affiné · Caractère',
    accent: '#2C2420',
    bg: 'rgba(44,36,32,0.05)',
    tags: ['Fort', 'Noisette', 'Cave'],
  },
  {
    emoji: '🌿',
    name: 'Aux herbes aromatiques',
    prix: '4,50 €',
    unite: '/ pièce',
    saison: 'Été · Automne',
    desc: 'Fromage frais mêlé d\'herbes cueillies dans nos jardins savoyards : ciboulette, ail des ours, basilic. Parfait pour l\'apéritif, il fait l\'unanimité à chaque repas.',
    texture: 'Frais · Herbacé',
    accent: '#4A6E4D',
    bg: 'rgba(74,110,77,0.07)',
    tags: ['Herbacé', 'Apéritif', 'Été'],
  },
  {
    emoji: '🍯',
    name: 'Cendré',
    prix: '5,00 €',
    unite: '/ pièce',
    saison: 'Printemps',
    desc: 'Une fine croûte de cendre végétale, une saveur complexe et une belle allure grise. Rare et recherché, c\'est le fromage que les amateurs réservent en priorité.',
    texture: 'Mi-affiné · Complexe',
    accent: '#8B7355',
    bg: 'rgba(139,115,85,0.06)',
    tags: ['Cendre', 'Terroir', 'Complexe'],
  },
  {
    emoji: '🫐',
    name: 'Faisselle nature',
    prix: '3,50 €',
    unite: '/ pot',
    saison: 'Toute l\'année',
    desc: 'Le fromage à l\'état le plus pur : simplement égoutté, non pressé, au goût lacté et délicat. Avec un filet de miel de montagne, c\'est un dessert à part entière.',
    texture: 'Très frais · Lacté',
    accent: '#C47A3A',
    bg: 'rgba(196,122,58,0.05)',
    tags: ['Lacté', 'Miel', 'Dessert'],
  },
]

function FromageCard({ fromage, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: fromage.bg,
        border: `1px solid ${fromage.accent}22`,
        borderRadius: '20px', padding: '28px',
        cursor: 'default', position: 'relative', overflow: 'hidden',
        transition: 'box-shadow 0.4s ease, transform 0.4s ease',
        boxShadow: hovered ? `0 20px 60px ${fromage.accent}20, 0 8px 24px rgba(44,36,32,0.06)` : 'none',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
      }}
    >
      {/* Bg circle */}
      <motion.div
        animate={{ scale: hovered ? 1.2 : 1 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute', top: '-50px', right: '-50px',
          width: '160px', height: '160px', borderRadius: '50%',
          backgroundColor: fromage.accent, opacity: 0.06,
        }}
      />

      <motion.div
        animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 5 : 0 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
        aria-hidden="true"
        style={{ fontSize: '40px', marginBottom: '14px', display: 'inline-block' }}
      >
        {fromage.emoji}
      </motion.div>

      <span style={{
        display: 'inline-block', fontSize: '10px', fontWeight: 600,
        letterSpacing: '0.14em', textTransform: 'uppercase', color: fromage.accent,
        backgroundColor: `${fromage.accent}15`, padding: '4px 12px',
        borderRadius: '100px', marginBottom: '10px',
      }}>
        {fromage.saison}
      </span>

      <h3 style={{
        fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 600,
        color: 'var(--charcoal)', marginBottom: '10px', lineHeight: 1.2,
      }}>
        {fromage.name}
      </h3>

      <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--charcoal-soft)', fontWeight: 300, marginBottom: '18px' }}>
        {fromage.desc}
      </p>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '18px' }}>
        {fromage.tags.map(tag => (
          <span key={tag} style={{
            fontSize: '11px', color: fromage.accent,
            border: `1px solid ${fromage.accent}40`, padding: '3px 10px',
            borderRadius: '100px', fontWeight: 400,
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Price + CTA */}
      <div style={{
        paddingTop: '16px', borderTop: `1px solid ${fromage.accent}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
      }}>
        <div>
          <span style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--charcoal-soft)', fontWeight: 500 }}>
            Prix
          </span>
          <p style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '22px', fontWeight: 700, lineHeight: 1,
            color: fromage.accent, marginTop: '2px',
          }}>
            {fromage.prix}
            <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--charcoal-soft)', fontFamily: 'DM Sans, sans-serif', marginLeft: '4px' }}>
              {fromage.unite}
            </span>
          </p>
        </div>
        <a
          href="tel:0670446571"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '10px 18px', borderRadius: '100px',
            backgroundColor: fromage.accent, color: 'white',
            fontSize: '13px', fontWeight: 500, textDecoration: 'none',
            flexShrink: 0, fontFamily: 'DM Sans, sans-serif',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.03)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
        >
          Réserver
        </a>
      </div>
    </motion.div>
  )
}

export default function Fromages() {
  return (
    <section style={{ backgroundColor: 'var(--cream)', padding: 'clamp(80px,10vw,130px) clamp(24px,6vw,80px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionTitle
          tag="Nos fromages"
          title="Façonnés à la main, chaque matin"
          subtitle="Pas de chaîne de production. Pas d'additif. Juste du lait, du sel, et le savoir-faire de Laurence — depuis 1998."
        />

        {/* Hero cheese photo */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            borderRadius: '28px', overflow: 'hidden',
            marginBottom: '48px', position: 'relative',
            boxShadow: '0 24px 80px rgba(44,36,32,0.14)',
          }}
        >
          <div style={{ height: 'clamp(220px, 36vw, 480px)', position: 'relative' }}>
            <motion.img
              src={CHEESE_BOARD}
              alt="Plateau de fromages de chèvre artisanaux"
              initial={{ scale: 1.06 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, rgba(44,36,32,0.6) 0%, rgba(44,36,32,0.1) 60%, transparent 100%)',
            }} />
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, padding: 'clamp(24px,4vw,48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '12px', fontWeight: 500 }}>
                Notre sélection
              </p>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px,3.5vw,42px)', fontWeight: 600, color: 'white', lineHeight: 1.2, maxWidth: '320px' }}>
                Tous nos fromages,<br />
                <span style={{ fontStyle: 'italic', color: 'var(--amber-light)' }}>nés du même lait.</span>
              </h3>
            </div>
            {/* Aging shelf preview */}
            <div style={{
              position: 'absolute', bottom: '20px', right: '20px',
              width: 'clamp(100px,16vw,180px)', aspectRatio: '1',
              borderRadius: '16px', overflow: 'hidden',
              border: '2px solid rgba(255,255,255,0.3)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}>
              <img src={AGING_SHELF} alt="Affinage" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '18px',
        }}>
          {fromages.map((fromage, i) => (
            <FromageCard key={fromage.name} fromage={fromage} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            marginTop: '40px', textAlign: 'center', padding: '20px 24px',
            backgroundColor: 'rgba(107,143,110,0.08)', borderRadius: '16px',
            border: '1px solid rgba(107,143,110,0.15)',
          }}
        >
          <p style={{ fontSize: '14px', color: 'var(--sage-dark)', fontStyle: 'italic', fontWeight: 300 }}>
            La gamme varie selon les saisons et la production. Appelez Laurence pour connaître les disponibilités du moment.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
