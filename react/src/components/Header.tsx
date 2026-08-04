import { useResume } from '../hooks/useResume';

export default function Header() {
  const { data } = useResume();
  const { personal } = data;

  return (
    <header className="hero">
      <h1 className="hero-name">{personal.name}</h1>
      <p className="hero-sub">{personal.title} · {personal.location}</p>
      <p className="hero-contact">
        <span>{personal.email}</span>
        <span>{personal.phone}</span>
        <span>{personal.education}</span>
      </p>
      <p className="hero-summary">{personal.summary}</p>
    </header>
  );
}
