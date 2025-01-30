import { SearchParams } from '@/lib/types'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Movie Search Results'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ searchParams }: { searchParams: SearchParams }) {
  try {
    const query = searchParams?.q || 'Movies'
    const page = searchParams?.page || '1'

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
              fontSize: '48px',
              color: 'white',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            Search Results
          </h1>
          <p
            style={{
              fontSize: '36px',
              color: '#9ca3af',
              textAlign: 'center',
            }}
          >
            {`"${query}"`}
          </p>
          <p
            style={{
              fontSize: '24px',
              color: '#6b7280',
              marginTop: '20px',
            }}
          >
            Page {page}
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