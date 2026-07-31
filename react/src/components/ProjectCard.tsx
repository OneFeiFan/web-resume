import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../types/resume';

interface Props {
  project: Project;
  viewMode: 'interactive' | 'print';
}

export default function ProjectCard({ project, viewMode }: Props) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const metrics = project.metrics;
  const metricLabels: Record<string, string> = {
    commits: '提交', insertions: '+行', deletions: '-行', files: '文件',
    domains: '业务域', total_repo_commits: '总提交', contribution: '贡献占比',
    team_size: '团队',
  };

  return (
    <article className="m3-card p-6 mb-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
        <div>
          <h3 className="text-m3-title text-secondary-20 font-medium">{project.name}</h3>
          <p className="text-sm text-secondary-50 mt-0.5">
            {project.period} · {project.role}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {Object.entries(metrics).map(([k, v]) => (
            <span key={k} className="bg-primary-95 text-primary-30 px-2 py-0.5 rounded">
              {metricLabels[k] || k}: {v}
            </span>
          ))}
        </div>
      </div>

      <p className="text-sm text-secondary-40 mb-3">{project.summary}</p>

      {viewMode === 'interactive' && (
        <>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.map(t => (
              <span key={t} className="text-xs bg-surface-container text-secondary-50 px-2 py-0.5 rounded-m3-sm font-mono">
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-3 mb-2">
            {!expanded && (
              <button
                onClick={() => setExpanded(true)}
                className="text-sm text-primary-50 hover:text-primary-30 font-medium transition-colors"
              >
                ▸ 展开深度案例 ({project.cases.length})
              </button>
            )}
            <button
              onClick={() => navigate(`/project/${project.id}`)}
              className="text-sm text-primary-50 hover:text-primary-30 font-medium transition-colors"
            >
              → 完整项目页
            </button>
          </div>

          {expanded && (
            <div className="space-y-4 mt-3 pt-3 border-t border-outline-variant">
              <button
                onClick={() => setExpanded(false)}
                className="text-xs text-secondary-50 hover:text-secondary-30 mb-2"
              >
                ▾ 收起
              </button>
              {project.cases.map((c, i) => (
                <div key={i} className="bg-surface-container rounded-m3-md p-4">
                  <h4 className="font-medium text-secondary-20 mb-2">{c.title}</h4>
                  <div className="space-y-2 text-sm text-secondary-40">
                    <p><span className="text-primary-40 font-medium">背景：</span>{c.background}</p>
                    <p><span className="text-primary-40 font-medium">决策：</span>{c.decision}</p>
                    <p><span className="text-primary-40 font-medium">成果：</span>{c.impact}</p>
                  </div>
                  {c.commits.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {c.commits.map(cm => (
                        <code key={cm.slice(0,8)} className="text-xs bg-surface-bright px-1.5 py-0.5 rounded font-mono text-secondary-50">
                          {cm}
                        </code>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </article>
  );
}
