/**
 * FrameworkSwitcher — 框架切换横幅
 * Vue 版部署后将独立 URL 填入下方链接
 */

export default function FrameworkSwitcher() {
  return (
    <div className="mb-6 px-4 py-2.5 bg-surface-container rounded-m3-md border border-outline-variant flex items-center justify-between text-xs no-print">
      <div className="flex items-center gap-2 text-secondary-50">
        <span className="font-mono text-primary-40 font-medium">⚛ React</span>
        <span className="text-outline-variant">|</span>
        <span>当前版本</span>
      </div>
      <span className="flex items-center gap-1.5 text-secondary-40">
        <span>Vue 3 版即将上线</span>
        <span className="text-base">🔜</span>
      </span>
    </div>
  );
}
