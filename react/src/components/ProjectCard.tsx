import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../types/resume';

interface Props { project: Project; }

const METRIC_KEYS: Record<string, string> = {
  commits: '提交', insertions: '+行', deletions: '−行', files: '文件',
  domains: '业务域', total_repo_commits: '总提交', contribution: '贡献占比', team_size: '团队',
};

export default function ProjectCard({ project }: Props) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <article className="card">
      <div className="card-header">
        <h3>{project.name}</h3>
        <div className="card-mini-metrics">
          {Object.entries(project.metrics)
            .filter(([, v]) => v !== undefined)
            .slice(0, 4)
            .map(([k, v]) => (
              <div className="card-mini-metric" key={k}>
                <div className="card-mini-num">{v}</div>
                <div className="card-mini-lbl">{METRIC_KEYS[k] || k}</div>
              </div>
            ))}
        </div>
      </div>

      <p className="card-period" style={{ marginTop: '0.3rem' }}>
        {project.period} · {project.role}
      </p>

      <p className="card-desc">{project.summary}</p>

      <div className="card-tags">
        {project.techStack.map((t) => (
          <span key={t} className="card-tag">{t}</span>
        ))}
      </div>

      <div className="card-actions no-print">
        {!expanded ? (
          <span className="card-action" onClick={() => setExpanded(true)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); setExpanded(true); } }}>
            展开案例 ({project.cases.length})
          </span>
        ) : (
          <span className="card-action" onClick={() => setExpanded(false)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); setExpanded(false); } }}>
            收起
          </span>
        )}
        <span className="card-action" onClick={() => navigate(`/project/${project.id}`)} role="button" tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); navigate(`/project/${project.id}`); } }}>
          完整项目页 →
        </span>
      </div>

      {expanded && project.cases.map((c, i) => (
        <div className="card-case" key={i}>
          <h4>{String(i + 1).padStart(2, '0')} · {c.title}</h4>
          <p><span className="card-case-label">背景</span> {c.background}</p>
          <p><span className="card-case-label">决策</span> {c.decision}</p>
          <p><span className="card-case-label">成果</span> {c.impact}</p>
          {c.commits.length > 0 && (
            <div className="card-tags" style={{ marginTop: '0.4rem' }}>
              {c.commits.map((cm) => (
                <span key={cm.slice(0, 8)} className="card-tag">{cm.slice(0, 7)}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </article>
  );
}
