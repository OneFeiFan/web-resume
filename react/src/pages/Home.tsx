import { useResume } from '../hooks/useResume';
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';
import Header from '../components/Header';
import SkillChips from '../components/SkillChips';
import ProjectCard from '../components/ProjectCard';

export default function Home() {
  const { data, filteredProjects } = useResume();
  const { experience, awards } = data;

  const expSectionRef = useScrollReveal<HTMLDivElement>();
  const projectsSectionRef = useScrollReveal<HTMLDivElement>();
  const awardsSectionRef = useScrollReveal<HTMLDivElement>();
  const projectsListRef = useStaggerReveal<HTMLDivElement>();

  return (
    <div>
      <Header />
      <SkillChips />

      {/* Experience */}
      <div ref={expSectionRef} className="reveal">
        <div className="sec">
          <h2>Experience</h2>
          <div className="sec-line" />
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
      </div>

      {/* Projects */}
      <div ref={projectsSectionRef} className="reveal">
        <div className="sec">
          <h2>Projects ({filteredProjects.length}/{data.projects.length})</h2>
          <div className="sec-line" />
        </div>
        <div ref={projectsListRef} className="reveal-stagger">
          {filteredProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>

      {/* Awards */}
      <div ref={awardsSectionRef} className="reveal">
        <div className="sec">
          <h2>Honors</h2>
          <div className="sec-line" />
        </div>
        {awards.map((a, i) => (
          <div className="award-item" key={i}>
            <span className="award-badge">{a.title}</span>
            <span>{a.event}</span>
            <span className="award-year">{a.year}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'none', marginTop: '2rem', fontSize: '.7rem', color: 'var(--t4)', borderTop: '1px solid #ddd', paddingTop: '.8rem' }}
        className="print-only">
        此简历由真实 Git 工程数据生成 · 基于 {data.projects.length} 个项目构建
      </div>
    </div>
  );
}
