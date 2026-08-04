import { useResume } from '../hooks/useResume';

const DOT_CLASS: Record<string, string> = {
  start:     'solid',
  end:       'end',
  milestone: 'solid',
  gap:       'dash',
};

export default function Timeline() {
  const { data } = useResume();
  const { timeline, projects } = data;
  const totalCommits = projects.reduce((s, p) => s + (Number(p.metrics.commits) || 0), 0);
  const events = [...timeline].reverse();

  return (
    <div>
      <h1 style={{ fontFamily: "'Noto Serif SC', serif" }}>时间线</h1>

      <div className="section-head">
        <span className="section-label">Journey</span>
        <span className="section-rule" />
      </div>

      <div className="tl-track">
        {events.map((e, i) => {
          const isAbove = i % 2 === 0;
          const isGap = e.type === 'gap';
          const dotCls = DOT_CLASS[e.type] || 'solid';
          return (
            <div key={i} className={`tl-slot ${isAbove ? 'tl-up' : 'tl-down'} ${isGap ? 'tl-ghost' : ''}`}>
              {isAbove ? (
                <>
                  <div className="tl-card">
                    <span className="tl-date">{e.date}</span>
                    <span className="tl-label">{e.label}</span>
                  </div>
                  <div className="tl-stem" />
                  <div className={`tl-dot ${dotCls}`} />
                  <div className="tl-spacer" />
                </>
              ) : (
                <>
                  <div className="tl-spacer" />
                  <div className={`tl-dot ${dotCls}`} />
                  <div className="tl-stem" />
                  <div className="tl-card">
                    <span className="tl-date">{e.date}</span>
                    <span className="tl-label">{e.label}</span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="tl-legend">
        <span>
          <span className="tl-legend-dot" style={{ background: 'var(--ink)' }} />
          里程碑
        </span>
        <span>
          <span className="tl-legend-dot" style={{ background: 'var(--red)' }} />
          结束
        </span>
        <span>
          <span className="tl-legend-dot" style={{ background: 'var(--paper)', border: '2px dashed var(--ink-muted)' }} />
          过渡期
        </span>
      </div>

      <div className="section-head">
        <span className="section-label">Stats</span>
        <span className="section-rule" />
      </div>
      <div className="metrics-bar">
        {projects.map((p) => (
          <div className="metric" key={p.id}>
            <div className="metric-num">{p.metrics.commits || '-'}</div>
            <div className="metric-lbl">{p.name.split('(')[0].trim()}</div>
            <div className="card-period" style={{ fontSize: '0.62rem', marginTop: '2px' }}>{p.period}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ textAlign: 'center', marginTop: 'var(--sp-2)', background: 'var(--paper-deeper)' }}>
        <div className="metric-num" style={{ fontSize: '2rem' }}>{totalCommits}</div>
        <div className="metric-lbl">总提交数（{projects.length} 项目）</div>
      </div>
    </div>
  );
}
