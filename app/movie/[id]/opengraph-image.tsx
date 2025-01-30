import { fetchMovieById } from '@/lib/helpers/movie-api'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Movie Details'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: { id: string } }) {
  try {
    const movie = await fetchMovieById(params.id)

    if (!movie || movie.Response === 'False') {
      return new ImageResponse(
        (
          <div
            style={{
              background: 'linear-gradient(to bottom, #000000, #1a1a1a)',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
            }}
          >
            <h1
              style={{
                fontSize: '48px',
                color: 'white',
                textAlign: 'center',
              }}
            >
              Movie Not Found
            </h1>
          </div>
        ),
        {
          ...size,
        }
      )
    }

    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(to bottom, #000000, #1a1a1a)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            padding: '40px',
            gap: '40px',
          }}
        >
          {movie.Poster !== 'N/A' && (
            <img
              src={movie.Poster}
              alt={movie.Title}
              style={{
                height: '500px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            />
          )}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              flex: 1,
            }}
          >
            <h1
              style={{
                fontSize: '48px',
                color: 'white',
                lineHeight: 1.2,
              }}
            >
              {movie.Title}
            </h1>
            <p
              style={{
                fontSize: '24px',
                color: '#9ca3af',
              }}
            >
              {movie.Year} • {movie.Runtime}
            </p>
            <p
              style={{
                fontSize: '20px',
                color: '#6b7280',
                marginTop: '8px',
              }}
            >
              {movie.Genre}
            </p>
            <div
              style={{
                marginTop: '16px',
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  background: '#fbbf24',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  color: 'black',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                IMDb {movie.imdbRating}
              </div>
            </div>
          </div>
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