import { useResume } from '../hooks/useResume';

/**
 * Hardcoded project counts — based on cross-referencing the 4 analyzed repos.
 * mouse(React+TS后台) / h5_app(Vue2 H5) / xb_wx(WePY小程序) / intelligent-lab(UniApp)
 */
const COUNTS: Record<string, number> = {
  // 语言
  'JavaScript (ES6+)': 4,
  TypeScript: 1,
  HTML5: 4,
  CSS3: 4,
  // 框架
  'React 17': 1,
  'Vue 2/3': 3,
  UniApp: 1,
  WePY: 1,
  'Ant Design Pro': 1,
  Element: 0,
  // 移动端
  '微信小程序': 1,
  '蓝牙 BLE': 1,
  'WiFi 配网': 1,
  'Canvas 海报': 1,
  'H5 适配': 1,
  // 工程化
  Git: 4,
  Webpack: 3,
  Jenkins: 0,
  '蓝湖': 0,
  TAPD: 0,
  '语雀': 0,
  TailwindCSS: 0,
};

export default function TechStack() {
  const { data } = useResume();
  const { skills, projects } = data;

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
              const count = COUNTS[s] ?? 0;
              const isTooling = group.category === '工程化';
              return (
                <div key={s} className="skill-card">
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
                    <span className="t1" style={{fontSize:'.85rem'}}>{s}</span>
                    {!isTooling && (
                      <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'.7rem'}} className="t4">
                        {count} 项目
                      </span>
                    )}
                  </div>
                  {!isTooling && (
                    <div className="skill-bar">
                      <div className="skill-bar-fill"
                        style={{width:`${Math.min(100,(count/projects.length)*100)}%`}} />
                    </div>
                  )}
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
