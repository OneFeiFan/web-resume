import { useResume } from '../hooks/useResume';

export default function SkillChips() {
  const { data, activeSkill, toggleSkill } = useResume();

  return (
    <div className="no-print">
      <div className="sec"><h2>Skills</h2></div>
      {data.skills.map((group) => (
        <div className="skill-row" key={group.category}>
          <span className="cat">{group.category}</span>
          {group.items.map((s) => (
            <span key={s} className={`chip${activeSkill === s ? ' on' : ''}`}
              onClick={() => toggleSkill(s)}>{s}</span>
          ))}
        </div>
      ))}
      {activeSkill && (
        <p className="t4" style={{fontSize:'.72rem',marginTop:'.3rem'}}>
          已筛选「{activeSkill}」·{' '}
          <a onClick={() => toggleSkill(activeSkill)} style={{cursor:'pointer'}}>清除</a>
        </p>
      )}
    </div>
  );
}
