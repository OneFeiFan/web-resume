import { useResume } from '../hooks/useResume';

export default function SkillChips() {
  const { data, activeSkill, toggleSkill } = useResume();
  const { skills } = data;

  return (
    <section className="mb-8">
      <h2 className="section-heading">专业技能</h2>
      <div className="space-y-4">
        {skills.map(group => (
          <div key={group.category}>
            <span className="text-m3-label text-secondary-40 mr-3 font-mono">
              {group.category}
            </span>
            <div className="inline-flex flex-wrap gap-2">
              {group.items.map(skill => (
                <span
                  key={skill}
                  className={`m3-chip ${activeSkill === skill ? 'active' : ''}`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {activeSkill && (
        <p className="mt-3 text-xs text-secondary-50">
          已筛选含「{activeSkill}」的项目 ·{' '}
          <button className="underline hover:text-primary-50" onClick={() => toggleSkill(activeSkill)}>
            清除筛选
          </button>
        </p>
      )}
    </section>
  );
}
