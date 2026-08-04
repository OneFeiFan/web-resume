export default function FrameworkSwitcher() {
  return (
    <div className="switcher no-print">
      <span>⚛ React 版</span>
      <a href="/vue/" style={{ fontSize: 'var(--text-sm)' }}>Vue 3 版 →</a>
    </div>
  );
}
