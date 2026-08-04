import { useState, useCallback } from 'react';
import { useResumeStore } from '../stores/useResumeStore';
import { useScrollReveal } from '../hooks/useScrollReveal';

const DECISIONS = [
  {
    title: '状态管理：为什么选 Zustand 而不是 Redux/Context？',
    tags: ['Zustand', 'Redux', 'Context API'],
    why: 'Zustand API 极小（<1KB），无需 Provider 包裹，selector 精准订阅避免不必要渲染。对于个人 Portfolio 规模，它是简洁与性能的最佳平衡点。',
    tradeoff: 'Redux Toolkit 生态更成熟但样板代码多，Context 高频更新导致全子树重渲染。',
  },
  {
    title: '数据持久化：Zustand persist vs 手写 localStorage',
    tags: ['Zustand persist', 'localStorage', 'JSON'],
    why: 'Zustand 内置 persist 中间件，一行配置自动 JSON 序列化/反序列化，支持 partialize 选择存储字段。',
    tradeoff: '手写更灵活但需自行处理序列化错误、存储配额溢出。persist 中间件覆盖 90% 场景。',
  },
  {
    title: '路由懒加载：React.lazy + Suspense 代码分割',
    tags: ['React Router', 'React.lazy', 'Suspense', 'Code Splitting'],
    why: '4 个页面拆分为独立 chunk，首页优先加载，其余按需。Suspense fallback 缓解感知等待。',
    tradeoff: '路由级分割有首次点击延迟，但对 4 页小站点几乎无感知（每页 <5KB chunk）。',
  },
];

function AdrCard({ decision, index }: { decision: typeof DECISIONS[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const handleToggle = useCallback(() => setExpanded((prev) => !prev), []);

  return (
    <div
      className={`adr-card${expanded ? ' expanded' : ''}`}
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggle(); } }}
    >
      <div className="adr-badge">
        ADR-{String(index + 1).padStart(2, '0')}
      </div>
      <h3>{decision.title}</h3>

      {/* Expandable detail — the "open letter" effect */}
      <div className="adr-detail">
        <div className="adr-detail-inner">
          <p>
            <span className="adr-label">选择</span>
            {' '}{decision.why}
          </p>
          <p>
            <span className="adr-label tradeoff">权衡</span>
            {' '}{decision.tradeoff}
          </p>
          <div className="adr-tags">
            {decision.tags.map((t) => (
              <span key={t} className="adr-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const recentProjects = useResumeStore((s) => s.recentProjects);
  const heroRef = useScrollReveal<HTMLDivElement>();
  const adrRef = useScrollReveal<HTMLDivElement>();
  const dataRef = useScrollReveal<HTMLDivElement>();
  const trailRef = useScrollReveal<HTMLDivElement>();

  return (
    <div>
      <div ref={heroRef} className="reveal">
        <h1 style={{ fontWeight: 300, letterSpacing: '-0.02em' }}>关于本站</h1>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--t3)', marginTop: '0.3rem', marginBottom: '2rem' }}>
          本 Portfolio 不仅是简历展示，更是一个刻意运用现代前端工程技术的示范项目。每项技术决策都有其理由和权衡。
        </p>
      </div>

      {/* ADR — Signature element */}
      <div ref={adrRef} className="reveal">
        <div className="sec">
          <h2>Architecture Decisions</h2>
          <div className="sec-line" />
        </div>
        {DECISIONS.map((d, i) => (
          <AdrCard key={i} decision={d} index={i} />
        ))}
      </div>

      {/* Data Source */}
      <div ref={dataRef} className="reveal">
        <div className="sec">
          <h2>Data Source</h2>
          <div className="sec-line" />
        </div>
        <div className="card">
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--t2)', lineHeight: 1.7 }}>
            所有数据来自 <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', background: 'var(--overlay)', padding: '1px 6px', borderRadius: 3, color: 'var(--t2)' }}>~/career-vault/projects/</code> 下 {4} 个项目的结构化 JSON 档案，
            由 Git 提交历史自动提取。每一条数据都可追溯到具体的 commit hash。
          </p>
        </div>
      </div>

      {/* User trail */}
      {recentProjects.length > 0 && (
        <div ref={trailRef} className="reveal">
          <div className="sec">
            <h2>Your Trail</h2>
            <div className="sec-line" />
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--t4)', marginBottom: '0.5rem' }}>
            存储在浏览器 localStorage · 不上传任何数据
          </p>
          <div className="skill-row">
            {recentProjects.map((id) => (
              <a key={id} href={`/project/${id}`} className="chip">{id}</a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
