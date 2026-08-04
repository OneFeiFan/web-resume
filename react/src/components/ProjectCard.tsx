import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../types/resume';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface Props { project: Project; index?: number; }

const METRIC_KEYS: Record<string, string> = {
  commits: '提交', insertions: '+行', deletions: '−行', files: '文件',
  domains: '业务域', total_repo_commits: '总提交', contribution: '贡献占比', team_size: '团队',
};

export default function ProjectCard({ project, index = 0 }: Props) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const cardRef = useScrollReveal<HTMLElement>();

  const handleToggle = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const handleNavigate = useCallback(() => {
    navigate(`/project/${project.id}`);
  }, [navigate, project.id]);

  return (
    <article
      ref={cardRef}
      className={`card reveal${expanded ? ' expanded' : ''}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Header row */}
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

      {/* Period + role */}
      <p className="card-period" style={{ marginTop: '0.3rem' }}>
        {project.period} · {project.role}
      </p>

      {/* Description */}
      <p className="card-desc">{project.summary}</p>

      {/* Tech tags */}
      <div className="card-tags">
        {project.techStack.map((t) => (
          <span key={t} className="card-tag">{t}</span>
        ))}
      </div>

      {/* Actions */}
      <div className="card-actions no-print">
        {!expanded ? (
          <span className="card-action" onClick={handleToggle} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleToggle(); } }}>
            ▸ 展开深度案例 ({project.cases.length})
          </span>
        ) : (
          <span className="card-action" onClick={handleToggle} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleToggle(); } }}>
            ▾ 收起
          </span>
        )}
        <span className="card-action" onClick={handleNavigate} role="button" tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleNavigate(); } }}>
          → 完整项目页
        </span>
      </div>

      {/* Expanded case studies — staggered entry */}
      {expanded && project.cases.map((c, i) => (
        <div className="card-case" key={i}>
          <h4>
            <span className="card-case-label">{String(i + 1).padStart(2, '0')}</span>
            {' '}{c.title}
          </h4>
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
