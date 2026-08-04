import { useMemo } from 'react';
import { useResume } from '../hooks/useResume';
import { useCountUp } from '../hooks/useCountUp';

export default function Header() {
  const { data, activeSkill, filteredProjects } = useResume();
  const { personal } = data;

  // Compute dynamic metrics based on active skill filter
  const metrics = useMemo(() => {
    const projects = filteredProjects;
    const totalCommits = projects.reduce((s, p) => s + (Number(p.metrics.commits) || 0), 0);
    const totalInsertions = projects.reduce((s, p) => {
      const v = p.metrics.insertions;
      return s + (typeof v === 'number' ? v : typeof v === 'string' ? parseInt(v) : 0);
    }, 0);
    const totalDeletions = projects.reduce((s, p) => {
      const v = p.metrics.deletions;
      return s + (typeof v === 'number' ? v : typeof v === 'string' ? parseInt(v) : 0);
    }, 0);
    const totalSkills = new Set(data.skills.flatMap((g) => g.items)).size;
    return {
      projectCount: projects.length,
      totalCommits,
      totalInsertions,
      totalDeletions,
      totalSkills,
    };
  }, [filteredProjects, data.skills]);

  const projectsCount = useCountUp({ end: metrics.projectCount, duration: 600, delay: 400, formatLocale: 'en-US' });
  const commitsCount = useCountUp({ end: metrics.totalCommits, duration: 800, delay: 450, formatLocale: 'en-US' });
  const insertionsCount = useCountUp({ end: metrics.totalInsertions, duration: 800, delay: 500, prefix: '+', formatLocale: 'en-US' });
  const deletionsCount = useCountUp({ end: metrics.totalDeletions, duration: 800, delay: 550, prefix: '−', formatLocale: 'en-US' });

  return (
    <header className="hero">
      {/* Name — display treatment */}
      <h1 className="hero-name">{personal.name}</h1>
      <p className="hero-sub">{personal.title} · {personal.location}</p>
      <p className="hero-contact">
        <span>{personal.email}</span>
        <span>{personal.phone}</span>
        <span>{personal.education}</span>
      </p>

      {/* KPI metrics bar — updates when skill filter changes */}
      <div className="metrics-bar" role="region" aria-label="关键数据指标">
        <div className={`metric${activeSkill ? ' active' : ''}`} aria-label={`${metrics.projectCount} 个项目`}>
          <div className="metric-num">
            <span ref={projectsCount.ref}>{projectsCount.display}</span>
          </div>
          <div className="metric-lbl">项目</div>
        </div>
        <div className="metric" aria-label={`${metrics.totalCommits} 次提交`}>
          <div className="metric-num">
            <span ref={commitsCount.ref}>{commitsCount.display}</span>
          </div>
          <div className="metric-lbl">提交</div>
        </div>
        <div className="metric git-add" aria-label={`新增 ${metrics.totalInsertions} 行`}>
          <div className="metric-num">
            <span ref={insertionsCount.ref}>{insertionsCount.display}</span>
          </div>
          <div className="metric-lbl">新增行</div>
        </div>
        <div className="metric git-del" aria-label={`删除 ${metrics.totalDeletions} 行`}>
          <div className="metric-num">
            <span ref={deletionsCount.ref}>{deletionsCount.display}</span>
          </div>
          <div className="metric-lbl">删除行</div>
        </div>
      </div>

      {/* Self-intro */}
      <p className="hero-summary">{personal.summary}</p>
    </header>
  );
}
