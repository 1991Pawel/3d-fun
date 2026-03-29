export function Loader() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#0a0a0f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <span style={{
        fontFamily: 'Orbitron, system-ui, sans-serif',
        fontSize: 'clamp(2rem, 8vw, 6rem)',
        color: '#ffffff',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        opacity: 0.9,
      }}>
        Loading
      </span>
    </div>
  )
}
