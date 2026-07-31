import { useResume } from '../hooks/useResume';

export default function Header() {
  const { data } = useResume();
  const { personal } = data;

  return (
    <header style={{ marginBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '1rem' }}>
        <img
          src="/avatar.jpg"
          alt="头像"
          width={80} height={80}
          style={{
            width: 80, height: 80, borderRadius: '50%',
            objectFit: 'cover', flexShrink: 0,
            border: '2px solid var(--c-border)',
            imageRendering: 'auto',
          }}
        />
        <div>
          <h1 style={{ color: 'var(--c-primary)' }}>{personal.name}</h1>
          <p className="t3" style={{ fontSize: '1rem', marginTop: '.3rem' }}>
            {personal.title} · {personal.location}
          </p>
        </div>
      </div>
      <p style={{ fontSize: '.82rem', marginTop: '.5rem', fontFamily: "'JetBrains Mono',monospace" }} className="t3">
        {personal.email} · {personal.phone}
      </p>
      <p style={{ fontSize: '.82rem', marginTop: 0 }} className="t3">
        {personal.education}
      </p>
      <p className="summary" style={{ marginTop: '1.2rem' }}>
        {personal.summary}
      </p>
    </header>
  );
}
