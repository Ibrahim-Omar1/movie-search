import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #000000, #1a1a1a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '22%',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(to bottom right, #ffffff, #e2e8f0)',
            width: '82%',
            height: '82%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '18%',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(to bottom right, #000000, #1a1a1a)',
              width: '76%',
              height: '76%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '15%',
              color: 'white',
              fontSize: '72px',
              fontWeight: 'bold',
              fontFamily: 'sans-serif',
            }}
          >
            M
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 