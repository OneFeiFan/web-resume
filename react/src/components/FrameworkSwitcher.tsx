/**
 * FrameworkSwitcher — 框架版本切换提示
 */
export default function FrameworkSwitcher() {
  return (
    <div className="switcher no-print">
      <span>⚛ React 版</span>
      <a href="/vue/" style={{ fontSize: '0.78rem' }}>
        切换到 Vue 3 版 →
      </a>
    </div>
  );
}
