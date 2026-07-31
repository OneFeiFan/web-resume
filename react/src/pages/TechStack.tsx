import { useResume } from '../hooks/useResume';

export default function TechStack() {
  const { data } = useResume();
  const { skills, projects } = data;

  const projectSkillCount: Record<string, number> = {};
  skills.flatMap(g => g.items).forEach(s => {
    projectSkillCount[s] = projects.filter(p =>
      p.techStack.some(t => t.toLowerCase().includes(s.toLowerCase()))
    ).length;
  });

  return (
    <div className="max-w-3xl">
      <h1 className="text-m3-headline text-primary-20 mb-8">🛠 技术栈全景</h1>

      {/* By category */}
      <section className="mb-10">
        <h2 className="section-heading">按类别</h2>
        <div className="space-y-6">
          {skills.map(group => (
            <div key={group.category}>
              <h3 className="text-m3-label text-secondary-40 mb-3 font-mono">{group.category}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {group.items.map(skill => {
                  const count = projectSkillCount[skill] || 0;
                  return (
                    <div
                      key={skill}
                      className="m3-card-outlined p-3 flex flex-col items-center text-center gap-1"
                    >
                      <span className="text-sm font-medium text-secondary-20">{skill}</span>
                      <span className="text-xs text-secondary-50 font-mono">
                        {count} 个项目
                      </span>
                      <div className="w-full bg-surface-container rounded-full h-1 mt-1">
                        <div
                          className="bg-primary-60 h-1 rounded-full transition-all"
                          style={{ width: `${Math.min(100, (count / projects.length) * 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* By project */}
      <section>
        <h2 className="section-heading">按项目</h2>
        <div className="space-y-4">
          {projects.map(project => (
            <div key={project.id} className="m3-card p-5">
              <h3 className="font-medium text-secondary-20 mb-2">{project.name}</h3>
              <p className="text-xs text-secondary-50 mb-3">{project.period}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map(t => (
                  <span key={t} className="text-xs bg-primary-95 text-primary-30 px-2 py-0.5 rounded-m3-sm font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
