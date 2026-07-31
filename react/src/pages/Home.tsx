import { useResume } from '../hooks/useResume';
import Header from '../components/Header';
import SkillChips from '../components/SkillChips';
import ProjectCard from '../components/ProjectCard';

export default function Home() {
  const { data, filteredProjects, viewMode } = useResume();
  const { personal, experience, awards } = data;

  return (
    <div className={viewMode === 'print' ? 'max-w-3xl mx-auto' : ''}>
      <Header />

      {/* Summary */}
      <section className="mb-8">
        <p className="text-m3-body text-secondary-30 leading-relaxed bg-primary-99 rounded-m3-lg p-5 border-l-4 border-primary-60">
          {personal.summary}
        </p>
      </section>

      {/* Skills */}
      {viewMode === 'interactive' && <SkillChips />}

      {/* Experience */}
      <section className="mb-8">
        <h2 className="section-heading">实习经历</h2>
        <div className="mb-3">
          <span className="text-m3-title text-secondary-20 font-medium">{experience.company}</span>
          <span className="text-sm text-secondary-50 ml-3 font-mono">{experience.role}</span>
          <span className="text-sm text-secondary-50 ml-3">{experience.period}</span>
        </div>
        <div className="space-y-4">
          {experience.bullets.map((b, i) => (
            <div key={i} className="m3-card-outlined p-4">
              <h3 className="font-medium text-secondary-20 mb-1.5 text-sm">{b.title}</h3>
              <p className="text-sm text-secondary-40 leading-relaxed">{b.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mb-8">
        <h2 className="section-heading">
          项目经历
          {viewMode === 'interactive' && (
            <span className="text-sm font-normal text-secondary-50 ml-3">
              ({filteredProjects.length}/{data.projects.length})
            </span>
          )}
        </h2>
        {filteredProjects.map(p => (
          <ProjectCard key={p.id} project={p} viewMode={viewMode} />
        ))}
      </section>

      {/* Awards */}
      <section className="mb-8">
        <h2 className="section-heading">荣誉奖项</h2>
        <div className="space-y-2">
          {awards.map((a, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className="bg-tertiary-90 text-tertiary-30 px-2 py-0.5 rounded-m3-sm font-medium text-xs">
                {a.title}
              </span>
              <span className="text-secondary-40">{a.event}</span>
              <span className="text-secondary-50 font-mono text-xs">{a.year}</span>
            </div>
          ))}
        </div>
      </section>

      {viewMode === 'print' && (
        <footer className="text-center text-xs text-secondary-50 mt-10 pt-4 border-t border-outline-variant">
          此简历由真实 Git 工程数据自动生成 · 基于 4 个项目 369 条提交
        </footer>
      )}
    </div>
  );
}
