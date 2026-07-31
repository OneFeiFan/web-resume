import { useResume } from '../hooks/useResume';

export default function Timeline() {
  const { data } = useResume();
  const { timeline, projects } = data;
  const totalCommits = projects.reduce((s, p) => s + (Number(p.metrics.commits) || 0), 0);

  return (
    <div>
      <h1 style={{color:'var(--c-primary)'}}>时间线</h1>

      <div className="sec"><h2>Timeline</h2></div>
      {[...timeline].reverse().map((e, i) => (
        <div className="tl" key={i}>
          <div className={`tl-dot${e.type !== 'project' ? ' on' : ''}`} />
          <span className="tl-date">{e.date}</span>
          <span className="t2" style={{fontSize:'.85rem'}}>{e.label}</span>
        </div>
      ))}

      <div className="sec"><h2>Overview</h2></div>
      <div className="mets">
        {projects.map((p) => (
          <div key={p.id} className="card" style={{textAlign:'center',padding:'1rem'}}>
            <div className="met-num">{p.metrics.commits || '-'}</div>
            <div className="met-lbl">{p.name}</div>
            <div className="proj-period">{p.period}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{textAlign:'center',marginTop:'.5rem',background:'var(--c-muted)'}}>
        <div className="met-num" style={{fontSize:'2.4rem'}}>{totalCommits}</div>
        <div className="met-lbl">总提交数（4 项目）</div>
      </div>
    </div>
  );
}
