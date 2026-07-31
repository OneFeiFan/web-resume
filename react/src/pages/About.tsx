import { useResumeStore } from '../stores/useResumeStore';

const DECISIONS = [
  {
    title: '状态管理：为什么选 Zustand 而不是 Redux/Context？',
    tags: ['Zustand', 'Redux', 'Context API'],
    why: 'Zustand API 极小（<1KB），无需 Provider 包裹，selector 精准订阅避免不必要渲染。',
    tradeoff: 'Redux Toolkit 生态更成熟但样板多。Context 高频更新导致全子树重渲染。个人 Portfolio 规模，Zustand 在简洁与性能间取得最佳平衡。',
  },
  {
    title: '数据持久化：Zustand persist vs 手写 localStorage',
    tags: ['Zustand persist', 'localStorage', 'JSON'],
    why: 'Zustand 内置 persist 中间件，一行配置自动 JSON 序列化/反序列化，支持 partialize 选择存储字段。同时展示了手写 useLocalStorage hook。',
    tradeoff: '手写更灵活但需自行处理序列化错误、存储配额溢出。persist 中间件覆盖 90% 场景。',
  },
  {
    title: '路由懒加载：React.lazy + Suspense 代码分割',
    tags: ['React Router', 'React.lazy', 'Suspense', 'Code Splitting'],
    why: '4 个页面拆分为独立 chunk，首页优先加载，其余按需。Suspense fallback 缓解感知等待。',
    tradeoff: '路由级分割有首次点击延迟，但对 4 页小站点几乎无感知（每页 <5KB chunk）。',
  },
  {
    title: '签名元素：Git Commit Feed',
    tags: ['Git Log', 'VS Code Theme', '真实性'],
    why: '终端风格展示真实 Git 提交记录。这是任何模板化简历都无法复制的差异化元素——每个 commit hash 都可溯源。',
    tradeoff: '非传统简历格式，但作为辅助探索层不影响简历核心信息传达。',
  },
];

export default function About() {
  const recentProjects = useResumeStore((s) => s.recentProjects);

  return (
    <div>
      <h1 style={{color:'var(--c-primary)'}}>关于本站</h1>
      <p className="t3" style={{fontSize:'.88rem',marginTop:'.3rem',marginBottom:'2rem'}}>
        本 Portfolio 不仅是简历展示，更是一个刻意运用现代前端工程技术的示范项目。
        每项技术决策都有其理由和权衡。
      </p>

      <div className="sec"><h2>Architecture Decisions</h2></div>
      {DECISIONS.map((d, i) => (
        <div className="adr" key={i}>
          <h3>
            <span className="adr-num">ADR-{i + 1}</span> {d.title}
          </h3>
          <p style={{marginTop:'.4rem'}}>
            <span className="case-label">选择：</span>{d.why}
          </p>
          <p>
            <span style={{color:'#9B7A3A',fontWeight:500,fontSize:'.72rem'}}>权衡：</span>{d.tradeoff}
          </p>
          <div className="adr-tags">
            {d.tags.map((t) => (
              <span key={t} className="proj-tag">{t}</span>
            ))}
          </div>
        </div>
      ))}

      <div className="sec"><h2>Data Source</h2></div>
      <div className="card">
        <p className="t2" style={{fontSize:'.85rem',lineHeight:1.7}}>
          所有数据来自 <code style={{fontFamily:'JetBrains Mono,monospace',fontSize:'.75rem',background:'var(--c-muted)',padding:'1px 5px',borderRadius:3,color:'var(--t2)'}}>~/career-vault/projects/</code> 下 4 个项目的结构化 JSON 档案，
          由 <code style={{fontFamily:'JetBrains Mono,monospace',fontSize:'.75rem',background:'var(--c-muted)',padding:'1px 5px',borderRadius:3,color:'var(--t2)'}}>/analyze-my-history</code> 和
          <code style={{fontFamily:'JetBrains Mono,monospace',fontSize:'.75rem',background:'var(--c-muted)',padding:'1px 5px',borderRadius:3,color:'var(--t2)'}}>/extract-career-data</code> 从 369 条 Git 提交中自动提取。
          每一条数据都可追溯到具体的 commit hash。
        </p>
      </div>

      {recentProjects.length > 0 && (
        <>
          <div className="sec"><h2>Your Trail</h2></div>
          <p className="t4" style={{fontSize:'.78rem',marginBottom:'.5rem'}}>
            存储在浏览器 localStorage · 不上传任何数据
          </p>
          <div className="skill-row">
            {recentProjects.map((id) => (
              <a key={id} href={`/project/${id}`} className="chip">{id}</a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
