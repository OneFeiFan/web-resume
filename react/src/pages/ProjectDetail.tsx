import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../hooks/useResume';

const METRIC_KEYS: Record<string, string> = {
  commits: '提交', insertions: '+行', deletions: '-行', files: '文件',
  domains: '业务域', total_repo_commits: '总提交', contribution: '贡献占比', team_size: '团队',
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProjectById } = useResume();
  const project = getProjectById(id!);

  if (!project) return (
    <div style={{textAlign:'center',padding:'4rem 0'}}>
      <p className="t3">项目未找到</p>
      <a onClick={() => navigate('/')} className="chip" style={{marginTop:'.5rem',display:'inline-flex'}}>← 返回首页</a>
    </div>
  );

  return (
    <div>
      <a onClick={() => navigate('/')} style={{fontSize:'.78rem',display:'inline-block',marginBottom:'2rem',cursor:'pointer'}}>← 返回首页</a>

      <h1 style={{color:'var(--c-primary)'}}>{project.name}</h1>
      <p className="proj-period" style={{marginTop:'.3rem'}}>{project.period} · {project.role}</p>
      <p className="t2" style={{fontSize:'.85rem',marginTop:'.8rem',marginBottom:'1.5rem',lineHeight:1.7}}>{project.summary}</p>

      <div className="mets" style={{marginBottom:'2rem'}}>
        {Object.entries(project.metrics).filter(([,v]) => v !== undefined).map(([k, v]) => (
          <div key={k} style={{textAlign:'center',background:'var(--c-muted)',borderRadius:6,padding:'.8rem'}}>
            <div className="met-num">{v}</div>
            <div className="met-lbl">{METRIC_KEYS[k] || k}</div>
          </div>
        ))}
      </div>

      <div className="proj-tags" style={{marginBottom:'2rem'}}>
        {project.techStack.map((t) => (
          <span key={t} className="proj-tag">{t}</span>
        ))}
      </div>

      <div className="sec"><h2>Deep Dive Cases ({project.cases.length})</h2></div>
      {project.cases.map((c, i) => (
        <div className="adr" key={i}>
          <h3><span className="adr-num">0{i + 1}</span> {c.title}</h3>
          <p style={{marginTop:'.5rem'}}><span className="case-label">背景</span> {c.background}</p>
          <p><span className="case-label">决策</span> {c.decision}</p>
          <p><span className="case-label">成果</span> {c.impact}</p>
          {c.commits.length > 0 && (
            <div className="proj-tags" style={{marginTop:'.5rem'}}>
              {c.commits.map((cm) => <span key={cm.slice(0,8)} className="proj-tag">{cm}</span>)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
