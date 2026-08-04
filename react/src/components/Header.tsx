import { useResume } from '../hooks/useResume';

export default function Header() {
  const { data } = useResume();
  const { personal } = data;

  return (
    <header className="hero">
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '1rem' }}>
        <img
          src="/avatar.jpg"
          alt="头像"
          width={80} height={80}
          style={{
            width: 80, height: 80, borderRadius: '50%',
            objectFit: 'cover', flexShrink: 0,
            border: '2px solid var(--border)',
          }}
        />
        <div>
          <h1 className="hero-name">{personal.name}</h1>
          <p className="hero-sub">{personal.title} · {personal.location}</p>
          <p className="hero-contact">
            <span>{personal.email}</span>
            <span>{personal.phone}</span>
          </p>
        </div>
      </div>
      <p className="hero-contact" style={{ marginTop: 0 }}>
        {personal.education}
      </p>
      <p className="hero-summary">{personal.summary}</p>
    </header>
  );
}
