const ITEMS = [
  'Fromage frais',
  'Buchette mi-affinée',
  'Aux herbes aromatiques',
  'Tomme affinée',
  'Cendré',
  'Faisselle nature',
  '100 % Artisanal',
  'Circuit court',
  'Marthod, Savoie',
  'Fait main chaque matin',
]

const DOT = (
  <span style={{ margin: '0 18px', opacity: 0.45, fontSize: '6px', verticalAlign: 'middle' }}>◆</span>
)

export default function Marquee({ dark = false }) {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div
      style={{
        overflow: 'hidden',
        backgroundColor: dark ? 'var(--charcoal)' : 'var(--sage)',
        padding: '14px 0',
        borderTop: dark ? '1px solid rgba(255,255,255,0.06)' : 'none',
        borderBottom: dark ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.9)',
              whiteSpace: 'nowrap',
              fontFamily: 'DM Sans, sans-serif',
              textTransform: 'uppercase',
              padding: '0 4px',
            }}
          >
            {item}{DOT}
          </span>
        ))}
      </div>
    </div>
  )
}
