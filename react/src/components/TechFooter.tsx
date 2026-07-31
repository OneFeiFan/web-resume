/**
 * TechFooter — 技术栈可见化条。
 * 每个页面底部展示当前项目使用的核心技术，让HR/面试官一眼看到技术深度。
 */

const TECHS = [
  { name: 'React 19', desc: 'UI框架 · Concurrent Features' },
  { name: 'TypeScript 5', desc: '类型系统 · Strict Mode' },
  { name: 'Zustand', desc: '状态管理 · localStorage持久化' },
  { name: 'TanStack Query', desc: '服务端状态 · 缓存策略' },
  { name: 'React Router 7', desc: '路由管理 · 懒加载' },
  { name: 'TailwindCSS 3', desc: '原子化CSS · M3 Design Tokens' },
  { name: 'Vite 8', desc: '构建工具 · HMR' },
];

export default function TechFooter() {
  return (
    <footer className="mt-16 pt-6 border-t border-outline-variant">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-mono text-secondary-50">Tech Stack</span>
        <div className="flex-1 h-px bg-outline-variant" />
      </div>
      <div className="flex flex-wrap gap-2">
        {TECHS.map((t) => (
          <span
            key={t.name}
            className="text-xs bg-surface-container text-secondary-40 px-2.5 py-1 rounded-m3-sm font-mono border border-outline-variant"
            title={t.desc}
          >
            {t.name}
          </span>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-secondary-50">
        基于真实 Git 工程数据构建 · 4 项目 369 条提交 ·{' '}
        <a href="/about" className="underline hover:text-primary-50">架构决策记录 →</a>
      </p>
    </footer>
  );
}
