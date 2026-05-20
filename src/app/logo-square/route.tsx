import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
        }}
      >
        <svg
          width="160"
          height="160"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#34d399"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0px' }}>
          <span style={{ fontSize: '96px', fontWeight: 800, color: '#ffffff', fontFamily: 'sans-serif', letterSpacing: '-3px' }}>
            Margin
          </span>
          <span style={{ fontSize: '96px', fontWeight: 800, color: '#34d399', fontFamily: 'sans-serif', letterSpacing: '-3px' }}>
            Log
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 1200 }
  )
}
