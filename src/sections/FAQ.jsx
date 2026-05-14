import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const faqs = [
  {
    q: 'Quels sont vos prix ?',
    a: "Le fromage frais et la faisselle sont à 3,50 € la pièce. Les buchettes mi-affinées et fromages aux herbes sont à 4,50 €. Le cendré est à 5 €. La tomme affinée, affinée plusieurs semaines en cave, est vendue 19 € la pièce. Les prix peuvent légèrement varier selon la saison et la production. Appelez Laurence pour confirmer.",
  },
  {
    q: 'Comment acheter vos fromages ?',
    a: "Trois façons : à la ferme (sur rendez-vous de préférence), au marché de Frontenex chaque vendredi matin, ou en adhérant à l'AMAP de la Dent de Cons. Appelez Laurence au 06 70 44 65 71 pour plus d'infos.",
  },
  {
    q: 'Faut-il appeler avant de passer à la ferme ?',
    a: "Oui, de préférence. La vie d'une ferme est imprévisible : une traite peut se prolonger, une livraison peut occuper Laurence. Un coup de fil la veille ou le matin suffit pour s'assurer qu'elle sera disponible et que les fromages souhaités sont bien en stock.",
  },
  {
    q: "Quels fromages sont disponibles toute l'année ?",
    a: "Le fromage frais et la faisselle sont disponibles toute l'année tant que les chèvres produisent du lait. Les buchettes, tommes et fromages affinés dépendent du rythme de production et des saisons. Laurence peut vous dire ce qu'il y a en stock au moment de votre appel.",
  },
  {
    q: "Est-ce qu'on peut visiter la ferme ?",
    a: "Oui, sur rendez-vous. Laurence accueille volontiers les curieux et les amateurs de fromage qui souhaitent voir comment les choses se passent. C'est l'occasion de rencontrer les chèvres, de voir la fromagerie, et de repartir avec quelques fromages à la main.",
  },
  {
    q: "Proposez-vous des paniers ou des commandes régulières ?",
    a: "Via l'AMAP de la Dent de Cons, vous pouvez bénéficier d'une distribution hebdomadaire de fromages. C'est le meilleur moyen d'avoir accès régulièrement à la production de Laurence sans avoir à vous déplacer à chaque fois. Contactez directement l'AMAP pour les modalités d'adhésion.",
  },
  {
    q: 'Vos fromages sont-ils certifiés bio ?',
    a: "Les fromages de la ferme ne portent pas de label bio officiel, mais les pratiques d'élevage sont naturelles et raisonnées : les chèvres paissent librement sur 10 hectares de prairies savoyardes, sans intrants chimiques. Laurence peut vous expliquer en détail comment elle travaille.",
  },
  {
    q: 'Comment conserver les fromages de chèvre ?',
    a: "Les fromages frais se conservent 5 à 7 jours au réfrigérateur, dans leur emballage ou couverts. Les fromages affinés gagnent à être sortis du froid 30 minutes avant la dégustation. Évitez le film plastique au contact direct, une cloche à fromage ou du papier sulfurisé sont préférables.",
  },
]

/* Emil: spring accordion, interruptible */
function AccordionItem({ faq, index, isOpen, onToggle }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 90, damping: 20, delay: index * 0.07 }}
      style={{
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        backgroundColor: isOpen ? 'var(--warm-white)' : 'var(--cream-dark)',
        /* Emil: shadow over border */
        boxShadow: isOpen ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        marginBottom: '10px',
      }}
    >
      {/* Trigger — Emil: 40px min hit area */}
      <button
        onClick={onToggle}
        className="hit-area"
        style={{
          width: '100%', minHeight: '64px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '16px', padding: '20px 24px',
          background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(16px,2vw,19px)',
          fontWeight: 500, color: 'var(--charcoal)',
          lineHeight: 1.35, flex: 1,
          textWrap: 'balance',
        }}>
          {faq.q}
        </span>

        {/* Emil: spring rotate icon */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          style={{
            flexShrink: 0,
            width: '32px', height: '32px',
            borderRadius: 'var(--r-sm)',
            backgroundColor: isOpen ? 'var(--sage)' : 'rgba(107,143,110,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: isOpen ? 'white' : 'var(--sage)',
            transition: 'background-color 0.25s ease, color 0.25s ease',
          }}
        >
          <Plus size={16} strokeWidth={2} />
        </motion.div>
      </button>

      {/* Answer — AnimatePresence for proper enter/exit */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 30 }} /* Emil spring */
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              padding: '0 24px 24px',
              fontSize: '15px', lineHeight: 1.8,
              color: 'var(--charcoal-soft)', fontWeight: 300,
            }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ backgroundColor: 'var(--cream)', padding: 'clamp(80px,10vw,130px) clamp(24px,6vw,80px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(48px,7vw,96px)',
          alignItems: 'start',
        }}>
          {/* Left — sticky header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
            style={{ position: 'sticky', top: '100px' }}
          >
            <span style={{
              display: 'inline-block', fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--sage)',
              backgroundColor: 'rgba(107,143,110,0.12)', padding: '6px 16px',
              borderRadius: 'var(--r-full)', marginBottom: '20px',
            }}>
              Questions fréquentes
            </span>

            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(32px,4.5vw,52px)', fontWeight: 700,
              color: 'var(--charcoal)', lineHeight: 1.12, marginBottom: '20px',
            }}>
              Tout ce que vous voulez savoir avant de venir
            </h2>

            <p style={{
              fontSize: '16px', lineHeight: 1.75,
              color: 'var(--charcoal-soft)', fontWeight: 300,
              marginBottom: '32px', maxWidth: '340px',
            }}>
              Une question pas dans la liste ? Laurence répond toujours avec plaisir.
            </p>

            <a
              href="tel:0670446571"
              className="btn-press"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '14px 26px', borderRadius: 'var(--r-full)',
                backgroundColor: 'var(--charcoal)', color: 'white',
                fontSize: '14px', fontWeight: 500, textDecoration: 'none',
                fontFamily: 'DM Sans, sans-serif',
                /* Emil: shadow > border */
                boxShadow: 'var(--shadow-md)',
                transition: 'transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'scale(1)' }}
            >
              📞 Poser une question
            </a>

            {/* Decorative element */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              style={{
                marginTop: '48px',
                width: '80px', height: '80px',
                borderRadius: '50%',
                border: '1.5px dashed rgba(107,143,110,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '32px',
              }}
            >
              🐐
            </motion.div>
          </motion.div>

          {/* Right — accordion */}
          <div>
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
