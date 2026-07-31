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
      <div className="sec"><h2>Experience</h2></div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 className="t1">{experience.company}</h3>
        <p className="proj-period">{experience.role} · {experience.period}</p>
      </div>
      {experience.bullets.map((b, i) => (
        <div className="exp-item" key={i}>
          <div className="exp-title">{b.title}</div>
          <div className="exp-text">{b.content}</div>
        </div>
      ))}

      {/* Projects */}
      <div className="sec">
        <h2>Projects ({filteredProjects.length}/{data.projects.length})</h2>
      </div>
      {filteredProjects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}

      {/* Awards */}
      <div className="sec"><h2>Honors</h2></div>
      {awards.map((a, i) => (
        <div className="award" key={i}>
          <span className="award-badge">{a.title}</span>
          <span>{a.event}</span>
          <span className="award-year">{a.year}</span>
        </div>
      ))}

      <div className="print-only" style={{display:'none',marginTop:'2rem',fontSize:'.7rem',color:'var(--t4)',borderTop:'1px solid #ddd',paddingTop:'.8rem'}}>
        此简历由真实 Git 工程数据生成 · 基于 4 个项目 369 条提交
      </div>
    </div>
  );
}
