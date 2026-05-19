import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </svg>
          <span style={{ fontSize: '36px', fontWeight: 700, color: '#fff', letterSpacing: '-1px' }}>
            Margin<span style={{ color: '#34d399' }}>Log</span>
          </span>
        </div>

        <div style={{ fontSize: '60px', fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-2px', marginBottom: '28px' }}>
          Stop guessing<br />
          <span style={{ color: '#34d399' }}>what you made.</span>
        </div>

        <div style={{ fontSize: '26px', color: '#a1a1aa', maxWidth: '700px', lineHeight: 1.4 }}>
          Track true profit across eBay, Poshmark, Mercari, Depop, and more — after every fee.
        </div>

        {/* Platform tags */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '48px' }}>
          {['eBay', 'Poshmark', 'Mercari', 'Depop', 'Etsy'].map((p) => (
            <div key={p} style={{
              background: '#18181b',
              border: '1px solid #27272a',
              borderRadius: '8px',
              padding: '8px 18px',
              color: '#a1a1aa',
              fontSize: '18px',
            }}>{p}</div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
