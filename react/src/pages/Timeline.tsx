import { useResume } from '../hooks/useResume';

const TYPE_STYLE: Record<string, { dot: string; line: string; badge: string }> = {
  start:     { dot: 'tl-dot-start',    line: 'solid', badge: '开始' },
  end:       { dot: 'tl-dot-end',      line: 'solid', badge: '结束' },
  milestone: { dot: 'tl-dot-milestone',line: 'solid', badge: '里程碑' },
  gap:       { dot: 'tl-dot-gap',      line: 'dashed', badge: '过渡期' },
};

export default function Timeline() {
  const { data } = useResume();
  const { timeline, projects } = data;
  const totalCommits = projects.reduce((s, p) => s + (Number(p.metrics.commits) || 0), 0);

  return (
    <div>
      <h1 style={{color:'var(--c-primary)'}}>时间线</h1>

      {/* Connected timeline */}
      <div className="sec"><h2>Journey</h2></div>
      <div className="tl-track">
        {[...timeline].reverse().map((e, i) => {
          const style = TYPE_STYLE[e.type] || TYPE_STYLE.milestone;
          return (
            <div className={`tl-node ${style.line === 'dashed' ? 'tl-gap' : ''}`} key={i}>
              <div className={`tl-dot-v2 ${style.dot}`} />
              <div className="tl-body">
                <span className="tl-date-v2">{e.date}</span>
                <span className="tl-label t2">{e.label}</span>
                <span className="tl-badge">{style.badge}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="tl-legend">
        {Object.entries(TYPE_STYLE).map(([key, s]) => (
          <span key={key} className="tl-legend-item">
            <span className={`tl-dot-v2 tl-dot-mini ${s.dot}`} />
            <span className="t4">{s.badge}</span>
          </span>
        ))}
      </div>

      {/* Stats snapshot */}
      <div className="sec"><h2>Stats</h2></div>
      <div className="mets">
        {projects.map((p) => (
          <div key={p.id} className="card" style={{textAlign:'center',padding:'1rem'}}>
            <div className="met-num">{p.metrics.commits || '-'}</div>
            <div className="met-lbl">{p.name.split('(')[0].trim()}</div>
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
