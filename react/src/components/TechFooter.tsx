const TECHS = [
  'React 19', 'TypeScript 5', 'Zustand', 'TanStack Query',
  'React Router 7', 'TailwindCSS 3',
];

export default function TechFooter() {
  return (
    <footer className="tech-ft no-print">
      <span>Built with {TECHS.join(' · ')}</span>
      <span>
        <a href="https://github.com/OneFeiFan/web-resume" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        {' · '}
        <a href="/about">架构决策 →</a>
      </span>
    </footer>
  );
}
