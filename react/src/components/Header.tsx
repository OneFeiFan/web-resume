import { useResume } from '../hooks/useResume';

export default function Header() {
  const { data, viewMode, toggleViewMode } = useResume();
  const { personal } = data;

  return (
    <header className="mb-10">
      {viewMode === 'interactive' && (
        <div className="flex justify-end mb-4 no-print">
          <button
            onClick={toggleViewMode}
            className="m3-chip text-xs"
            title="切换到打印模式"
          >
            🖨 打印模式
          </button>
        </div>
      )}

      {viewMode === 'print' && (
        <div className="flex justify-end mb-4 no-print">
          <button
            onClick={toggleViewMode}
            className="m3-chip text-xs"
          >
            ✕ 退出打印
          </button>
        </div>
      )}

      <div className="text-center sm:text-left">
        <h1 className="text-m3-display text-primary-20 mb-2 tracking-tight">
          {personal.name}
        </h1>
        <p className="text-m3-title text-secondary-40 mb-3">{personal.title}</p>
        <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-sm text-secondary-50 font-mono">
          <span>{personal.email}</span>
          <span className="text-outline-variant">|</span>
          <span>{personal.phone}</span>
          <span className="text-outline-variant">|</span>
          <span>{personal.location}</span>
        </div>
        <p className="mt-4 text-sm text-secondary-40">{personal.education}</p>
      </div>
    </header>
  );
}
