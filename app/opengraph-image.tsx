import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Movie Search'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(to bottom, #000000, #1a1a1a)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              color: 'white',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            Movie Search
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#9ca3af',
              textAlign: 'center',
            }}
          >
            Discover Your Next Favorite Movie
          </p>
        </div>
      ),
      {
        ...size,
      }
    )
  } catch (e) {
    console.error('Error generating OpenGraph image:', e)
    return new Response('Error generating image', { status: 500 })
  }
} 