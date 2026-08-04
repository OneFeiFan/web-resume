import { useResume } from '../hooks/useResume';

export default function SkillChips() {
  const { data, activeSkill, toggleSkill, filteredProjects } = useResume();

  return (
    <div className="no-print">
      <div className="section-head">
        <span className="section-label">Skills</span>
        <span className="section-rule" />
      </div>

      {data.skills.map((group) => (
        <div className="skill-group" key={group.category}>
          <span className="skill-cat">{group.category}</span>
          <div className="chip-row">
            {group.items.map((s) => (
              <span
                key={s}
                className={`chip${activeSkill === s ? ' on' : ''}`}
                onClick={() => toggleSkill(s)}
                role="button"
                tabIndex={0}
                aria-pressed={activeSkill === s}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); toggleSkill(s); } }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}

      {activeSkill && (
        <p className="filter-hint">
          已筛选「{activeSkill}」— 匹配 {filteredProjects.length} 个项目
          <a onClick={() => toggleSkill(activeSkill)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); toggleSkill(activeSkill); } }}>
            清除
          </a>
        </p>
      )}
    </div>
  );
}
