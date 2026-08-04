import { useResume } from '../hooks/useResume';

export default function Header() {
  const { data } = useResume();
  const { personal } = data;

  return (
    <header className="hero">
      <div className="hero-row">
        <img
          src="/avatar.jpg"
          alt="头像"
          width={72} height={72}
          className="hero-avatar"
        />
        <div>
          <h1 className="hero-name">{personal.name}</h1>
          <p className="hero-sub">{personal.title} · {personal.location}</p>
          <div className="hero-meta">
            <span>{personal.email}</span>
            <span>{personal.phone}</span>
          </div>
        </div>
      </div>
      <div className="hero-meta" style={{ marginTop: 'var(--sp-2)' }}>
        {personal.education}
      </div>
      <p className="hero-summary halftone">{personal.summary}</p>
    </header>
  );
}
