import { useResume } from '../hooks/useResume';
import { useScrollReveal } from '../hooks/useScrollReveal';

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

  const headerRef = useScrollReveal<HTMLDivElement>();
  const trackRef = useScrollReveal<HTMLDivElement>();
  const statsRef = useScrollReveal<HTMLDivElement>();

  return (
    <div>
      <div ref={headerRef} className="reveal">
        <h1 style={{ fontWeight: 300, letterSpacing: '-0.02em' }}>时间线</h1>
      </div>

      {/* Journey track */}
      <div ref={trackRef} className="reveal">
        <div className="sec">
          <h2>Journey</h2>
          <div className="sec-line" />
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

        {/* Legend */}
        <div className="tl-legend">
          <span className="tl-legend-item">
            <span className="tl-legend-dot" style={{ background: 'var(--accent)' }} />
            开始/里程碑
          </span>
          <span className="tl-legend-item">
            <span className="tl-legend-dot" style={{ background: 'var(--accent-soft)' }} />
            结束
          </span>
          <span className="tl-legend-item">
            <span className="tl-legend-dot" style={{
              background: 'var(--bg)',
              border: '2px dashed var(--t4)',
            }} />
            过渡期
          </span>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="reveal">
        <div className="sec">
          <h2>Stats</h2>
          <div className="sec-line" />
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
        <div className="card" style={{ textAlign: 'center', marginTop: '0.5rem', background: 'var(--overlay)' }}>
          <div className="metric-num" style={{ fontSize: '2.4rem' }}>{totalCommits}</div>
          <div className="metric-lbl">总提交数（{projects.length} 项目）</div>
        </div>
      </div>
    </div>
  );
}
