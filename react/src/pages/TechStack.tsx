import { useResume } from '../hooks/useResume';

/**
 * Robust match: skill appears in at least one project's techStack.
 * Normalizes both sides (lowercase, strip parens/symbols) and checks
 * word-level overlap — "Vue 2/3" matches "Vue 2", "Canvas 海报" matches "Canvas 2D".
 */
function matchCount(skill: string, projects: { techStack: string[] }[]): number {
  const skillWords = skill.toLowerCase().split(/[\s/()+-]+/).filter(Boolean);
  return projects.filter((p) =>
    p.techStack.some((t) => {
      const tNorm = t.toLowerCase();
      return skillWords.some((w) => tNorm.includes(w));
    })
  ).length;
}

export default function TechStack() {
  const { data } = useResume();
  const { skills, projects } = data;

  return (
    <div>
      <h1 style={{color:'var(--c-primary)'}}>技术栈全景</h1>

      {/* By category with project counts */}
      <div className="sec"><h2>按类别</h2></div>
      {skills.map((group) => (
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
                      {count} 项目
                    </span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-bar-fill"
                      style={{width:`${Math.min(100,(count/projects.length)*100)}%`}} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

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
