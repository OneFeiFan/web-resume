import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../hooks/useResume';
import { useScrollReveal } from '../hooks/useScrollReveal';

const METRIC_KEYS: Record<string, string> = {
  commits: '提交', insertions: '+行', deletions: '−行', files: '文件',
  domains: '业务域', total_repo_commits: '总提交', contribution: '贡献占比', team_size: '团队',
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProjectById } = useResume();
  const project = getProjectById(id!);

  const headerRef = useScrollReveal<HTMLDivElement>();
  const casesRef = useScrollReveal<HTMLDivElement>();

  if (!project) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <p style={{ color: 'var(--t3)' }}>项目未找到</p>
        <a onClick={() => navigate('/')} className="chip" style={{ marginTop: '0.5rem', display: 'inline-flex' }}>
          ← 返回首页
        </a>
      </div>
    );
  }

  return (
    <div>
      <a onClick={() => navigate('/')} style={{
        fontSize: '0.78rem', display: 'inline-block', marginBottom: '2rem',
        cursor: 'pointer', color: 'var(--accent)',
      }}>
        ← 返回首页
      </a>

      <div ref={headerRef} className="reveal">
        <h1 style={{ fontWeight: 300, letterSpacing: '-0.02em' }}>{project.name}</h1>
        <p className="card-period" style={{ marginTop: '0.3rem' }}>{project.period} · {project.role}</p>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--t2)', marginTop: '0.8rem', marginBottom: '1.5rem', lineHeight: 1.7 }}>
          {project.summary}
        </p>

        {/* Metrics */}
        <div className="metrics-bar" style={{ marginBottom: '2rem' }}>
          {Object.entries(project.metrics).filter(([, v]) => v !== undefined).map(([k, v]) => (
            <div className="metric" key={k}>
              <div className="metric-num">{v}</div>
              <div className="metric-lbl">{METRIC_KEYS[k] || k}</div>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="card-tags" style={{ marginBottom: '2rem' }}>
          {project.techStack.map((t) => (
            <span key={t} className="card-tag">{t}</span>
          ))}
        </div>
      </div>

      {/* Deep dive cases */}
      <div ref={casesRef} className="reveal">
        <div className="sec">
          <h2>Deep Dive Cases ({project.cases.length})</h2>
          <div className="sec-line" />
        </div>
        {project.cases.map((c, i) => (
          <div className="card-case" key={i} style={{ opacity: 1, transform: 'none', marginBottom: '0.6rem' }}>
            <h4>
              <span className="card-case-label">{String(i + 1).padStart(2, '0')}</span>
              {' '}{c.title}
            </h4>
            <p><span className="card-case-label">背景</span> {c.background}</p>
            <p><span className="card-case-label">决策</span> {c.decision}</p>
            <p><span className="card-case-label">成果</span> {c.impact}</p>
            {c.commits.length > 0 && (
              <div className="card-tags" style={{ marginTop: '0.5rem' }}>
                {c.commits.map((cm) => (
                  <span key={cm.slice(0, 8)} className="card-tag">{cm.slice(0, 7)}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
