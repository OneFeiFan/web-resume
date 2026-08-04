import { useResume } from '../hooks/useResume';

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

  return (
    <div>
      <h1 style={{ fontFamily: "'Noto Serif SC', serif" }}>技术栈全景</h1>

      {skills.map((group) => (
        <div key={group.category} style={{ marginBottom: 'var(--sp-6)' }}>
          <span className="skill-cat">{group.category}</span>
          <div className="skill-grid">
            {group.items.map((s) => {
              const count = COUNTS[s] ?? 0;
              const isTooling = group.category === '工程化';
              const pct = projects.length > 0 ? Math.min(100, (count / projects.length) * 100) : 0;
              return (
                <div className="skill-cell" key={s}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="skill-cell-name">{s}</span>
                    {!isTooling && (
                      <span className="skill-cell-count">{count} 项目</span>
                    )}
                  </div>
                  {!isTooling && (
                    <div className="skill-bar">
                      <div className="skill-bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="section-head">
        <span className="section-label">By Project</span>
        <span className="section-rule" />
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
  );
}
