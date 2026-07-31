import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../hooks/useResume';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProjectById } = useResume();
  const project = getProjectById(id!);

  if (!project) {
    return (
      <div className="text-center py-20">
        <p className="text-secondary-50 mb-4">项目未找到</p>
        <button onClick={() => navigate('/')} className="m3-chip">← 返回首页</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <button
        onClick={() => navigate('/')}
        className="text-sm text-primary-50 hover:text-primary-30 mb-6 inline-block transition-colors"
      >
        ← 返回首页
      </button>

      <header className="mb-8">
        <h1 className="text-m3-headline text-primary-20 mb-2">{project.name}</h1>
        <div className="flex flex-wrap gap-3 text-sm text-secondary-50 font-mono mb-4">
          <span>{project.period}</span>
          <span>·</span>
          <span>{project.role}</span>
        </div>
        <p className="text-secondary-30 leading-relaxed">{project.summary}</p>
      </header>

      {/* Metrics bar */}
      <div className="m3-card p-4 mb-8 flex flex-wrap gap-4">
        {Object.entries(project.metrics).map(([k, v]) => (
          <div key={k} className="text-center min-w-[80px]">
            <div className="text-m3-title text-primary-40 font-bold font-mono">{v}</div>
            <div className="text-xs text-secondary-50 mt-0.5">{k}</div>
          </div>
        ))}
        <div className="flex flex-wrap gap-1.5 ml-auto items-center">
          {project.techStack.map(t => (
            <span key={t} className="text-xs bg-primary-95 text-primary-30 px-2 py-0.5 rounded font-mono">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Deep dive cases */}
      <section>
        <h2 className="section-heading">深度案例 ({project.cases.length})</h2>
        <div className="space-y-6">
          {project.cases.map((c, i) => (
            <div key={i} className="m3-card p-6">
              <h3 className="text-m3-title text-secondary-20 mb-4">
                <span className="text-primary-40 font-mono mr-2">0{i+1}</span>
                {c.title}
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="text-primary-40 font-medium mb-1">背景</h4>
                  <p className="text-secondary-40 leading-relaxed">{c.background}</p>
                </div>
                <div>
                  <h4 className="text-primary-40 font-medium mb-1">技术决策</h4>
                  <p className="text-secondary-40 leading-relaxed">{c.decision}</p>
                </div>
                <div>
                  <h4 className="text-primary-40 font-medium mb-1">成果与影响</h4>
                  <p className="text-secondary-40 leading-relaxed">{c.impact}</p>
                </div>
              </div>
              {c.commits.length > 0 && (
                <div className="mt-4 pt-3 border-t border-outline-variant">
                  <span className="text-xs text-secondary-50 font-mono">关联提交：</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {c.commits.map(cm => (
                      <code key={cm.slice(0,8)} className="text-xs bg-surface-container px-2 py-1 rounded font-mono text-secondary-40">
                        {cm}
                      </code>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
