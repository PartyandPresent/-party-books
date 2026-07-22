// Update BANNER_TEXT here to change the banner message across the whole site.
// Keep in sync with the bundle discount on the product page.
const BANNER_TEXT = 'BUY ANY BOOK, GET ONE [TODO: X]% OFF'

const LAVENDER = '#EDE4F5'
const PURPLE   = '#4A1580'

function Track() {
  const sep = <span style={{ margin: '0 32px', opacity: 0.35 }}>✦</span>
  return (
    <>
      <span>{BANNER_TEXT}</span>{sep}
      <span>{BANNER_TEXT}</span>{sep}
      <span>{BANNER_TEXT}</span>{sep}
      <span>{BANNER_TEXT}</span>{sep}
      <span>{BANNER_TEXT}</span>{sep}
      <span>{BANNER_TEXT}</span>{sep}
    </>
  )
}

export function PromoBanner() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 101,
      height: 36, background: LAVENDER, overflow: 'hidden',
      display: 'flex', alignItems: 'center',
    }}>
      <div
        className="marquee-track"
        style={{
          display: 'inline-flex', alignItems: 'center',
          whiteSpace: 'nowrap',
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 800, fontSize: 12,
          letterSpacing: '0.10em', color: PURPLE,
          textTransform: 'uppercase',
        }}
      >
        <Track /><Track />
      </div>
    </div>
  )
}