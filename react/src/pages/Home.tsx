import { useResume } from '../hooks/useResume';
import Header from '../components/Header';
import SkillChips from '../components/SkillChips';
import ProjectCard from '../components/ProjectCard';

export default function Home() {
  const { data, filteredProjects } = useResume();
  const { experience, awards } = data;

  return (
    <div>
      <Header />
      <SkillChips />

      {/* Experience */}
      <div className="section-head">
        <span className="section-label">Experience</span>
        <span className="section-rule" />
      </div>
      <div className="exp-header">
        <h3>{experience.company}</h3>
        <p className="exp-period">{experience.role} · {experience.period}</p>
      </div>
      {experience.bullets.map((b, i) => (
        <div className="exp-item" key={i}>
          <div className="exp-item-title">{b.title}</div>
          <div className="exp-item-content">{b.content}</div>
        </div>
      ))}

      {/* Projects */}
      <div className="section-head">
        <span className="section-label">Projects</span>
        <span className="section-count">{filteredProjects.length}/{data.projects.length}</span>
        <span className="section-rule" />
      </div>
      {filteredProjects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}

      {/* Awards */}
      <div className="section-head">
        <span className="section-label">Honors</span>
        <span className="section-rule" />
      </div>
      {awards.map((a, i) => (
        <div className="award-row" key={i}>
          <span className="award-badge">{a.title}</span>
          <span>{a.event}</span>
          <span className="award-year">{a.year}</span>
        </div>
      ))}

      <div className="print-only" style={{ display: 'none', marginTop: '2rem', fontSize: '.7rem', color: 'var(--ink-faint)', borderTop: '1px solid var(--rule)', paddingTop: '.8rem' }}>
        此简历由真实 Git 工程数据生成 · 基于 {data.projects.length} 个项目构建
      </div>
    </div>
  );
}
