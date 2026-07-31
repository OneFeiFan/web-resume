import { useResume } from '../hooks/useResume';
import { useImageColor } from '../hooks/useImageColor';

export default function Header() {
  const { data } = useResume();
  const { personal } = data;

  // Extract palette from avatar (falls back to default)
  useImageColor('/avatar.jpg');

  return (
    <header style={{ marginBottom: '3rem' }}>
      <h1 style={{ color: 'var(--c-primary)' }}>{personal.name}</h1>
      <p style={{ fontSize: '1rem', color: '#999', marginTop: '.3rem' }}>
        {personal.title} · {personal.location}
      </p>
      <p style={{ fontSize: '.82rem', color: '#aaa', marginTop: '.2rem', fontFamily: "'JetBrains Mono',monospace" }}>
        {personal.email} · {personal.phone}
      </p>
      <p style={{ fontSize: '.82rem', color: '#aaa', marginTop: 0 }}>
        {personal.education}
      </p>
      <p style={{
        fontSize: '.88rem', color: 'var(--c-on-surface)', lineHeight: 1.7,
        marginTop: '1.2rem', padding: '1rem 1.2rem',
        background: 'var(--c-muted)', borderRadius: 6,
        borderLeft: '3px solid var(--c-primary)',
      }}>
        {personal.summary}
      </p>
    </header>
  );
}
