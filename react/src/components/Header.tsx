import { useResume } from '../hooks/useResume';

export default function Header() {
  const { data } = useResume();
  const { personal } = data;

  return (
    <header style={{ marginBottom: '3rem' }}>
      <h1 style={{ color: 'var(--c-primary)' }}>{personal.name}</h1>
      <p style={{ fontSize: '1rem', marginTop: '.3rem' }} className="t3">
        {personal.title} · {personal.location}
      </p>
      <p style={{ fontSize: '.82rem', marginTop: '.2rem', fontFamily: "'JetBrains Mono',monospace" }} className="t3">
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
