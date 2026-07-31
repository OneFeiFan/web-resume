import { useResume } from '../hooks/useResume';

const DOT_COLOR: Record<string, string> = {
  start:     'var(--c-primary)',
  end:       'var(--c-accent)',
  milestone: 'var(--c-primary)',
  gap:       'var(--t4)',
};

export default function Timeline() {
  const { data } = useResume();
  const { timeline, projects } = data;
  const totalCommits = projects.reduce((s, p) => s + (Number(p.metrics.commits) || 0), 0);
  const events = [...timeline].reverse();

  return (
    <div>
      <h1 style={{color:'var(--c-primary)'}}>时间线</h1>

      {/* Horizontal anchored timeline */}
      <div className="sec"><h2>Journey</h2></div>
      <div className="tl-h">
        {/* Horizontal axis */}
        <div className="tl-h-line" />

        {events.map((e, i) => {
          const isAbove = i % 2 === 0;
          const isGap = e.type === 'gap';
          const color = DOT_COLOR[e.type] || DOT_COLOR.milestone;

          return (
            <div
              key={i}
              className={`tl-h-event ${isAbove ? 'tl-above' : 'tl-below'} ${isGap ? 'tl-gap' : ''}`}
              style={{ '--dot-color': color } as React.CSSProperties}
            >
              {/* Anchor dot on the axis */}
              <div className={`tl-h-dot ${isGap ? 'tl-h-dot-gap' : ''}`} />

              {/* Connector from dot to card */}
              <div className={`tl-h-conn ${isAbove ? 'tl-conn-up' : 'tl-conn-down'}`} />

              {/* Event card */}
              <div className="tl-h-card">
                <span className="tl-h-date">{e.date}</span>
                <span className="tl-h-label">{e.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="tl-legend">
        <span className="tl-legend-item">
          <span className="tl-h-dot" style={{position:'static',background:'var(--c-primary)',borderColor:'var(--c-primary)'}} />
          <span className="t4">开始/里程碑</span>
        </span>
        <span className="tl-legend-item">
          <span className="tl-h-dot" style={{position:'static',background:'var(--c-accent)',borderColor:'var(--c-accent)'}} />
          <span className="t4">结束</span>
        </span>
        <span className="tl-legend-item">
          <span className="tl-h-dot tl-h-dot-gap" style={{position:'static'}} />
          <span className="t4">过渡期</span>
        </span>
      </div>

      {/* Stats */}
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
