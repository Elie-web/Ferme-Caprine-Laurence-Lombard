import { motion, useScroll, useTransform } from 'framer-motion'
import { Phone, Navigation } from 'lucide-react'

export default function MobileActionBar() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [80, 280], [0, 1])
  const translateY = useTransform(scrollY, [80, 280], [16, 0])

  return (
    <motion.div
      className="mobile-action-bar"
      style={{ opacity, y: translateY }}
      aria-label="Actions rapides"
    >
      <a
        href="tel:0670446571"
        className="mobile-action-btn mobile-action-primary"
        aria-label="Appeler Laurence"
      >
        <Phone size={17} strokeWidth={2} />
        <span>Appeler Laurence</span>
      </a>
      <a
        href="https://maps.google.com/?q=4411+Route+des+Hameaux,+Marthod+73400"
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-action-btn mobile-action-secondary"
        aria-label="Voir l'itinéraire sur Google Maps"
      >
        <Navigation size={17} strokeWidth={2} />
        <span>Y aller</span>
      </a>
    </motion.div>
  )
}
