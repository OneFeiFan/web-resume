import { useState, useCallback } from 'react';
import { useResume } from '../hooks/useResume';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function SkillChips() {
  const { data, activeSkill, toggleSkill, filteredProjects } = useResume();
  const [poppingSkill, setPoppingSkill] = useState<string | null>(null);
  const sectionRef = useScrollReveal<HTMLDivElement>();

  const handleToggle = useCallback((skill: string) => {
    setPoppingSkill(skill);
    toggleSkill(skill);
    setTimeout(() => setPoppingSkill(null), 300);
  }, [toggleSkill]);

  return (
    <div ref={sectionRef} className="reveal no-print">
      <div className="sec">
        <h2>Skills</h2>
        <div className="sec-line" />
      </div>

      {data.skills.map((group) => (
        <div className="skill-row" key={group.category}>
          <span className="skill-cat">{group.category}</span>
          {group.items.map((s) => (
            <span
              key={s}
              className={`chip${activeSkill === s ? ' on' : ''}${poppingSkill === s ? ' pop' : ''}`}
              onClick={() => handleToggle(s)}
              role="button"
              tabIndex={0}
              aria-pressed={activeSkill === s}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggle(s); } }}
            >
              {s}
            </span>
          ))}
        </div>
      ))}

      {activeSkill && (
        <p className="filter-hint">
          已筛选「{activeSkill}」— 匹配 {filteredProjects.length} 个项目
          <a onClick={() => handleToggle(activeSkill)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleToggle(activeSkill); } }}>
            清除
          </a>
        </p>
      )}
    </div>
  );
}
