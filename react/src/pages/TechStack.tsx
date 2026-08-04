import { useEffect, useRef, useState } from 'react';
import { useResume } from '../hooks/useResume';
import { useScrollReveal } from '../hooks/useScrollReveal';

const COUNTS: Record<string, number> = {
  'JavaScript (ES6+)': 4, TypeScript: 1, HTML5: 4, CSS3: 4,
  'React 17': 1, 'Vue 2/3': 3, UniApp: 1, WePY: 1,
  'Ant Design Pro': 1, Element: 0,
  '微信小程序': 1, '蓝牙 BLE': 1, 'WiFi 配网': 1, 'Canvas 海报': 1, 'H5 适配': 1,
  Git: 4, Webpack: 3, Jenkins: 0, '蓝湖': 0, TAPD: 0, '语雀': 0, TailwindCSS: 0,
};

export default function TechStack() {
  const { data } = useResume();
  const { skills, projects } = data;
  const heroRef = useScrollReveal<HTMLDivElement>();

  return (
    <div>
      <div ref={heroRef} className="reveal">
        <h1 style={{ fontWeight: 300, letterSpacing: '-0.02em' }}>技术栈全景</h1>
      </div>

      {/* By category */}
      {skills.map((group, gi) => (
        <SkillGroup key={group.category} group={group} projects={projects} index={gi} />
      ))}

      {/* By project */}
      <div className="reveal" ref={useScrollReveal<HTMLDivElement>()}>
        <div className="sec">
          <h2>By Project</h2>
          <div className="sec-line" />
        </div>
        {projects.map((p) => (
          <div className="card" key={p.id}>
            <div className="card-header">
              <h3>{p.name}</h3>
              <span className="card-period">{p.period}</span>
            </div>
            <div className="card-tags">
              {p.techStack.map((t) => (
                <span key={t} className="card-tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillGroup({ group, projects, index }: {
  group: { category: string; items: string[] };
  projects: { techStack: string[] }[];
  index: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  const [barsAnimated, setBarsAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setBarsAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    // We need to observe the ref element
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal" style={{ marginBottom: '1.5rem', transitionDelay: `${index * 80}ms` }}>
      <h3 style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.72rem',
        fontWeight: 500,
        color: 'var(--t4)',
        marginBottom: '0.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}>
        {group.category}
      </h3>
      <div className="skill-grid">
        {group.items.map((s) => {
          const count = COUNTS[s] ?? 0;
          const isTooling = group.category === '工程化';
          const pct = projects.length > 0 ? Math.min(100, (count / projects.length) * 100) : 0;
          return (
            <div key={s} className="skill-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--t1)' }}>{s}</span>
                {!isTooling && (
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--t4)' }}>
                    {count} 项目
                  </span>
                )}
              </div>
              {!isTooling && (
                <div className="skill-bar">
                  <div
                    className={`skill-bar-fill${barsAnimated ? ' animated' : ''}`}
                    style={{ width: barsAnimated ? `${pct}%` : '0%' }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
