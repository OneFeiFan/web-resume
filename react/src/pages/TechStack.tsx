import { useResume } from '../hooks/useResume';

export default function TechStack() {
  const { data } = useResume();
  const { skills, projects } = data;

  const projectSkillCount: Record<string, number> = {};
  skills.flatMap((g) => g.items).forEach((s) => {
    projectSkillCount[s] = projects.filter((p) =>
      p.techStack.some((t) => t.toLowerCase().includes(s.toLowerCase()))
    ).length;
  });

  return (
    <div>
      <h1 style={{color:'var(--c-primary)'}}>技术栈全景</h1>

      <div className="sec"><h2>按类别</h2></div>
      {skills.map((group) => (
        <div key={group.category} style={{marginBottom:'1.5rem'}}>
          <h3 style={{fontSize:'.78rem',marginBottom:'.5rem',fontFamily:'JetBrains Mono,monospace'}} className="t4">
            {group.category}
          </h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:'.5rem'}}>
            {group.items.map((s) => {
              const count = projectSkillCount[s] || 0;
              return (
                <div key={s} className="skill-card">
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
                    <span style={{fontSize:'.85rem'}} className="t1">{s}</span>
                    <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'.7rem'}} className="t4">
                      {count} 项目
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
