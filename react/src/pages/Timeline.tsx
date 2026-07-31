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

      <div className="sec"><h2>Journey</h2></div>

      <div className="tl-track-new">
        {events.map((e, i) => {
          const isAbove = i % 2 === 0;
          const isGap = e.type === 'gap';
          const color = DOT_COLOR[e.type] || DOT_COLOR.milestone;
          return (
            <div key={i} className={`tl-slot ${isAbove ? 'tl-up' : 'tl-down'} ${isGap ? 'tl-ghost' : ''}`}>
              {isAbove ? (
                <>
                  <div className="tl-card-new">
                    <span className="tl-card-date">{e.date}</span>
                    <span className="tl-card-label">{e.label}</span>
                  </div>
                  <div className="tl-spacer" />
                  <div className="tl-stem" />
                  <div className="tl-spacer2" />
                  <div
                    className={`tl-dot-new ${isGap ? 'tl-dot-dash' : ''}`}
                    style={{ borderColor: color, background: isGap ? 'var(--c-surface)' : color }}
                  />
                </>
              ) : (
                <>
                  <div
                    className={`tl-dot-new ${isGap ? 'tl-dot-dash' : ''}`}
                    style={{ borderColor: color, background: isGap ? 'var(--c-surface)' : color }}
                  />
                  <div className="tl-spacer" />
                  <div className="tl-stem" />
                  <div className="tl-spacer2" />
                  <div className="tl-card-new">
                    <span className="tl-card-date">{e.date}</span>
                    <span className="tl-card-label">{e.label}</span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="tl-legend">
        <span className="tl-legend-item">
          <span className="tl-dot-new" style={{position:'static',display:'inline-block',background:'var(--c-primary)',borderColor:'var(--c-primary)'}} />
          <span className="t4">开始/里程碑</span>
        </span>
        <span className="tl-legend-item">
          <span className="tl-dot-new" style={{position:'static',display:'inline-block',background:'var(--c-accent)',borderColor:'var(--c-accent)'}} />
          <span className="t4">结束</span>
        </span>
        <span className="tl-legend-item">
          <span className="tl-dot-new tl-dot-dash" style={{position:'static',display:'inline-block'}} />
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
