/**
 * TechFooter — 技术栈可见化。极简一行，链接到完整 ADR。
 */

const TECHS = [
  'React 19', 'TypeScript 5', 'Zustand', 'TanStack Query',
  'React Router 7', 'TailwindCSS 3', 'Webpack',
];

export default function TechFooter() {
  return (
    <footer className="tech-ft no-print">
      <span>Built with </span>
      {TECHS.join(' · ')}
      <span style={{ marginLeft: '.8rem' }}>
        · <a href="/about" style={{color:'inherit'}}>架构决策记录 →</a>
      </span>
      <span style={{ float: 'right' }}>
        基于 369 条真实 Git 提交构建
      </span>
    </footer>
  );
}
