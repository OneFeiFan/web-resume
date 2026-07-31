import { useResume } from '../hooks/useResume';

/**
 * Match a skill to projects — uses normalized comparison.
 */
function matchCount(skill: string, projects: { techStack: string[] }[]): number {
  const s = skill.toLowerCase().replace(/[^a-z0-9一-鿿]/g, '');
  return projects.filter((p) =>
    p.techStack.some((t) => t.toLowerCase().replace(/[^a-z0-9一-鿿]/g, '').includes(s))
  ).length;
}

const TOOLING = ['Git', 'Webpack', 'Jenkins', '蓝湖', 'TAPD', '语雀', 'TailwindCSS'];

export default function TechStack() {
  const { data } = useResume();
  const { skills, projects } = data;

  return (
    <div>
      <h1 style={{color:'var(--c-primary)'}}>技术栈全景</h1>

      {/* Framework & language — matched to projects */}
      <div className="sec"><h2>核心技术</h2></div>
      {skills.filter((g) => g.category !== '工程化').map((group) => (
        <div key={group.category} style={{marginBottom:'1.5rem'}}>
          <h3 style={{fontSize:'.78rem',marginBottom:'.5rem',fontFamily:'JetBrains Mono,monospace'}} className="t4">
            {group.category}
          </h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:'.5rem'}}>
            {group.items.map((s) => {
              const count = matchCount(s, projects);
              return (
                <div key={s} className="skill-card">
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
                    <span className="t1" style={{fontSize:'.85rem'}}>{s}</span>
                    <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'.7rem'}} className="t4">
                      {count > 0 ? `${count} 项目` : '—'}
                    </span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-bar-fill" style={{width:`${Math.min(100,(count/projects.length)*100)}%`}} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Tooling — no project count, just list */}
      <div className="sec"><h2>工程化 & 工具</h2></div>
      <div className="skill-row">
        {TOOLING.map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>
      <p className="t4" style={{fontSize:'.72rem',marginTop:'.3rem'}}>
        以上工具在实习与项目开发中使用，Git 证据来自提交记录与协作流程。
      </p>

      {/* Per-project breakdown */}
      <div className="sec"><h2>按项目</h2></div>
      {projects.map((p) => (
        <div className="card" key={p.id}>
          <div className="proj-hdr">
            <h3>{p.name}</h3>
            <span className="proj-period">{p.period}</span>
          </div>
          <div className="proj-tags">
            {p.techStack.map((t) => (
              <span key={t} className="proj-tag">{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
