import { useResume } from '../hooks/useResume';

const TYPE_STYLES: Record<string, string> = {
  career: 'border-primary-40 bg-primary-90 text-primary-30',
  milestone: 'border-tertiary-50 bg-tertiary-90 text-tertiary-30',
  project: 'border-outline-variant bg-surface-container text-secondary-40',
};

const TYPE_LABELS: Record<string, string> = {
  career: '职业',
  milestone: '里程碑',
  project: '项目',
};

export default function Timeline() {
  const { data } = useResume();
  const { timeline } = data;

  return (
    <div className="max-w-2xl">
      <h1 className="text-m3-headline text-primary-20 mb-8">📅 时间线</h1>

      <div className="timeline-line space-y-8">
        {[...timeline].reverse().map((event, i) => (
          <div key={i} className="relative">
            <div className={`timeline-dot ${event.type}`} />
            <div className="ml-2">
              <span className={`text-xs px-2 py-0.5 rounded-m3-full border font-mono ${TYPE_STYLES[event.type]}`}>
                {TYPE_LABELS[event.type]}
              </span>
              <time className="text-sm text-secondary-50 font-mono ml-2">{event.date}</time>
              <p className="text-secondary-30 mt-1 font-medium">{event.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mini stats */}
      <div className="mt-12 p-6 m3-card">
        <h3 className="text-m3-title text-secondary-20 mb-4">项目数据快照</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {data.projects.map(p => (
            <div key={p.id} className="text-center">
              <div className="text-m3-headline text-primary-40 font-bold font-mono">
                {p.metrics.commits || '-'}
              </div>
              <div className="text-xs text-secondary-50 mt-1">{p.name.split('(')[0].trim()}</div>
              <div className="text-xs text-secondary-50">提交</div>
            </div>
          ))}
          <div className="text-center col-span-2 sm:col-span-4 mt-2">
            <div className="text-m3-display text-primary-30 font-bold font-mono">
              {data.projects.reduce((sum, p) => sum + (Number(p.metrics.commits) || 0), 0)}
            </div>
            <div className="text-sm text-secondary-50">总提交数（4 项目）</div>
          </div>
        </div>
      </div>
    </div>
  );
}
