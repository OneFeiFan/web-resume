import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../hooks/useResume';

const METRIC_KEYS: Record<string, string> = {
  commits: '提交', insertions: '+行', deletions: '−行', files: '文件',
  domains: '业务域', total_repo_commits: '总提交', contribution: '贡献占比', team_size: '团队',
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProjectById } = useResume();
  const project = getProjectById(id!);

  if (!project) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <p style={{ color: 'var(--ink-muted)' }}>项目未找到</p>
        <a onClick={() => navigate('/')} style={{ cursor: 'pointer', color: 'var(--red)' }}>
          ← 返回首页
        </a>
      </div>
    );
  }

  return (
    <div>
      <a onClick={() => navigate('/')} style={{
        fontSize: 'var(--text-sm)', display: 'inline-block', marginBottom: 'var(--sp-8)',
        cursor: 'pointer', color: 'var(--ink-muted)',
      }}>
        ← 返回首页
      </a>

      <h1 style={{ fontFamily: "'Noto Serif SC', serif" }}>{project.name}</h1>
      <p className="card-period" style={{ marginTop: 'var(--sp-1)' }}>{project.period} · {project.role}</p>
      <p style={{ fontSize: 'var(--text-base)', color: 'var(--ink-soft)', marginTop: 'var(--sp-4)', marginBottom: 'var(--sp-6)', lineHeight: 1.7 }}>
        {project.summary}
      </p>

      <div className="metrics-bar" style={{ marginBottom: 'var(--sp-6)' }}>
        {Object.entries(project.metrics).filter(([, v]) => v !== undefined).map(([k, v]) => (
          <div className="metric" key={k}>
            <div className="metric-num">{v}</div>
            <div className="metric-lbl">{METRIC_KEYS[k] || k}</div>
          </div>
        ))}
      </div>

      <div className="card-tags" style={{ marginBottom: 'var(--sp-8)' }}>
        {project.techStack.map((t) => (
          <span key={t} className="card-tag">{t}</span>
        ))}
      </div>

      <div className="section-head">
        <span className="section-label">Deep Dive Cases ({project.cases.length})</span>
        <span className="section-rule" />
      </div>
      {project.cases.map((c, i) => (
        <div className="card-case" key={i} style={{ marginBottom: 'var(--sp-4)' }}>
          <h4>{String(i + 1).padStart(2, '0')} · {c.title}</h4>
          <p><span className="card-case-label">背景</span> {c.background}</p>
          <p><span className="card-case-label">决策</span> {c.decision}</p>
          <p><span className="card-case-label">成果</span> {c.impact}</p>
          {c.commits.length > 0 && (
            <div className="card-tags" style={{ marginTop: 'var(--sp-2)' }}>
              {c.commits.map((cm) => (
                <span key={cm.slice(0, 8)} className="card-tag">{cm.slice(0, 7)}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
