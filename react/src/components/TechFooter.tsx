/**
 * TechFooter — Colophon（版本记录）
 * 像一本书末尾的印刷信息，低调记录技术栈。
 */
const TECHS = [
  'React 19', 'TypeScript 5', 'Zustand', 'TanStack Query',
  'React Router 7', 'TailwindCSS 3',
];

export default function TechFooter() {
  return (
    <footer className="tech-ft no-print">
      <span>
        Built with {TECHS.join(' · ')}
      </span>
      <span>
        <a href="https://github.com/OneFeiFan/web-resume" target="_blank" rel="noopener noreferrer">
          开源地址 ↗
        </a>
        {' · '}
        <a href="/about">架构决策 →</a>
      </span>
    </footer>
  );
}
