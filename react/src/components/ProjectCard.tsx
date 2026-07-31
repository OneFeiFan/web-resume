import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../types/resume';

interface Props { project: Project; }

const METRIC_KEYS: Record<string, string> = {
  commits: '提交', insertions: '+行', deletions: '-行', files: '文件',
  domains: '业务域', total_repo_commits: '总提交', contribution: '贡献占比', team_size: '团队',
};

export default function ProjectCard({ project }: Props) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <article className="card">
      <div className="proj-hdr">
        <h3>{project.name}</h3>
        <div style={{display:'flex',gap:'.6rem',flexWrap:'wrap'}}>
          {Object.entries(project.metrics).filter(([,v]) => v !== undefined).map(([k, v]) => (
            <div key={k} style={{textAlign:'center'}}>
              <div className="met-num" style={{fontSize:'1.1rem'}}>{v}</div>
              <div className="met-lbl">{METRIC_KEYS[k] || k}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="proj-period">{project.period} · {project.role}</p>
      <p className="t2" style={{fontSize:'.85rem',marginTop:'.4rem',lineHeight:1.7}}>{project.summary}</p>

      <div className="proj-tags">
        {project.techStack.map((t) => (
          <span key={t} className="proj-tag">{t}</span>
        ))}
      </div>

      <div className="no-print" style={{marginTop:'.8rem',display:'flex',gap:'1rem'}}>
        {!expanded ? (
          <a onClick={() => setExpanded(true)} style={{fontSize:'.78rem',cursor:'pointer'}}>
            ▸ 展开深度案例 ({project.cases.length})
          </a>
        ) : (
          <a onClick={() => setExpanded(false)} style={{fontSize:'.78rem',cursor:'pointer'}}>
            ▾ 收起
          </a>
        )}
        <a onClick={() => navigate(`/project/${project.id}`)} style={{fontSize:'.78rem',cursor:'pointer'}}>
          → 完整项目页
        </a>
      </div>

      {expanded && (
        <div style={{marginTop:'.8rem'}}>
          {project.cases.map((c, i) => (
            <div className="case" key={i}>
              <h4><span className="case-label">0{i + 1}</span> {c.title}</h4>
              <p><span className="case-label">背景</span> {c.background}</p>
              <p><span className="case-label">决策</span> {c.decision}</p>
              <p><span className="case-label">成果</span> {c.impact}</p>
              {c.commits.length > 0 && (
                <div className="proj-tags">
                  {c.commits.map((cm) => (
                    <span key={cm.slice(0,8)} className="proj-tag">{cm}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
