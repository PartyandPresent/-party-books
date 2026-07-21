import Image from 'next/image'

const GREEN = '#2D4A3E'
const CORAL = '#E8836A'

interface ReviewPhotoProps {
  photo?: string
  avatar: string
  name: string
  aspectRatio?: string
}

export function ReviewPhoto({ photo, avatar, name, aspectRatio = '4/5' }: ReviewPhotoProps) {
  if (photo) {
    return (
      <div style={{ position: 'relative', width: '100%', aspectRatio }}>
        <Image src={photo} alt={`${name} photo`} fill unoptimized style={{ objectFit: 'cover' }} />
      </div>
    )
  }
  return (
    <div style={{
      width: '100%',
      aspectRatio,
      background: `linear-gradient(160deg, ${GREEN} 0%, #3D6B5A 50%, ${CORAL} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <span style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 80,
        fontWeight: 900,
        color: 'rgba(255,255,255,0.18)',
        userSelect: 'none',
      }}>
        {avatar}
      </span>
    </div>
  )
}