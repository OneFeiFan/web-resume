import { useResumeStore } from '../stores/useResumeStore';

const DECISIONS = [
  {
    title: '状态管理：为什么选 Zustand 而不是 Redux/Context？',
    tags: ['Zustand', 'Redux', 'Context API'],
    rationale:
      'Zustand 的 API 极小（<1KB），不需要 Provider 包裹，天然支持 selector 精准订阅避免不必要渲染。',
    tradeoff:
      'Redux Toolkit 生态更成熟但样板代码多。Context 在小规模场景够用，但高频更新下会导致整个子树重渲染。对于个人 Portfolio 规模，Zustand 在简洁与性能间取得最佳平衡。',
  },
  {
    title: '数据持久化：Zustand persist 中间件 vs 手写 localStorage',
    tags: ['Zustand persist', 'localStorage'],
    rationale:
      'Zustand 内置 persist 中间件只需一行配置，自动 JSON 序列化/反序列化、支持 partialize 选择存储字段。',
    tradeoff:
      '手写 useLocalStorage hook 更灵活但需要自行处理序列化错误、存储配额溢出、SSR 安全等边界情况。这里两者都用——persist 负责全局配置持久化，useLocalStorage hook 演示自定义 hook 能力。',
  },
  {
    title: '路由：React Router v7 懒加载策略',
    tags: ['React Router', 'React.lazy', 'Suspense'],
    rationale:
      '使用 React.lazy + Suspense 将 4 个页面拆分为独立 chunk。首页为 Landing 注入点（优先加载），其余页面按需加载。',
    tradeoff:
      '路由级代码分割的代价是首次点击时的网络延迟，用 Suspense fallback（骨架屏）缓解感知等待。对于 4 页面的小站点，分割后每个页面 chunk < 5KB，几乎无感知。',
  },
  {
    title: '主题系统：CSS 变量 + Tailwind dark: 前缀 vs CSS-in-JS',
    tags: ['TailwindCSS', 'CSS Variables', 'Material 3'],
    rationale:
      'Tailwind 的 dark: 前缀 + class 策略切换（document.documentElement.classList.toggle）是零运行时方案。Material 3 的 tonal palette 通过 CSS 自定义属性映射到 Tailwind 颜色 token。',
    tradeoff:
      'CSS-in-JS（如 styled-components）运行时开销大且 SSR 复杂。Tailwind 方案零 JS 运行时、构建时生成，配合 M3 设计 tokens 可同时服务于 React 和 Vue 版本。',
  },
  {
    title: '自定义 Hook 设计：useLocalStorage vs useDebounce 的职责分离',
    tags: ['Custom Hooks', 'useLocalStorage', 'useDebounce', 'SOLID'],
    rationale:
      '每个 hook 只做一件事。useLocalStorage 封装 JSON 序列化+错误处理+quota 兜底，useDebounce 封装 setTimeout 清理模式。',
    tradeoff:
      '可以写一个通用 useStorage 支持 localStorage/sessionStorage/memory fallback，但对当前规模属过度设计。保留扩展点但不提前实现。',
  },
];

export default function About() {
  const recentProjects = useResumeStore((s) => s.recentProjects);

  return (
    <div className="max-w-3xl">
      <h1 className="text-m3-headline text-primary-20 mb-2">关于本站</h1>
      <p className="text-sm text-secondary-50 mb-8">
        本 Portfolio 不仅是简历展示，更是一个刻意运用现代化前端工程技术的示范项目。
        每项技术决策都有其理由和权衡。
      </p>

      {/* Architecture Decisions */}
      <section className="mb-10">
        <h2 className="section-heading">架构决策记录 (ADR)</h2>
        <div className="space-y-4">
          {DECISIONS.map((d, i) => (
            <div key={i} className="m3-card-outlined p-5">
              <h3 className="font-medium text-secondary-20 mb-2">
                <span className="text-primary-40 font-mono text-xs mr-2">ADR-{i + 1}</span>
                {d.title}
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-primary-40 font-medium">选择：</span>
                  <span className="text-secondary-40">{d.rationale}</span>
                </p>
                <p>
                  <span className="text-tertiary-30 font-medium">权衡：</span>
                  <span className="text-secondary-40">{d.tradeoff}</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {d.tags.map((t) => (
                  <span key={t} className="text-xs bg-primary-95 text-primary-30 px-2 py-0.5 rounded-m3-sm font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Data Source */}
      <section className="mb-10 m3-card p-6">
        <h2 className="section-heading">数据来源</h2>
        <p className="text-sm text-secondary-40 leading-relaxed">
          本 Portfolio 的所有数据来自{' '}
          <code className="bg-surface-container px-1.5 py-0.5 rounded text-xs">~/career-vault/projects/</code>
          {' '}下 4 个项目的结构化 JSON 档案——由{' '}
          <code className="bg-surface-container px-1.5 py-0.5 rounded text-xs">/analyze-my-history</code>
          {' '}和{' '}
          <code className="bg-surface-container px-1.5 py-0.5 rounded text-xs">/extract-career-data</code>
          {' '}两个 Skill 从 369 条 Git 提交中自动提取。
          一条数据都不捏造，全部可追溯到具体的 commit hash。
        </p>
      </section>

      {/* Visitor insight — what HR would have explored */}
      {recentProjects.length > 0 && (
        <section className="mb-10">
          <h2 className="section-heading">你的浏览足迹</h2>
          <p className="text-xs text-secondary-50 mb-2">
            存储在浏览器 localStorage 中，仅用于展示浏览历史。不上传任何数据。
          </p>
          <div className="flex flex-wrap gap-2">
            {recentProjects.map((id) => (
              <a
                key={id}
                href={`/project/${id}`}
                className="m3-chip text-xs"
              >
                📂 {id}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
