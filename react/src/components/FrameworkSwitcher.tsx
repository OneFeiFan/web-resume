/**
 * FrameworkSwitcher — 框架切换横幅
 * 在 React/Vue 版本间切换，展示「同一份数据 + 不同技术栈」的理念
 */

export default function FrameworkSwitcher() {
  return (
    <div className="mb-6 px-4 py-2.5 bg-surface-container rounded-m3-md border border-outline-variant flex items-center justify-between text-xs no-print">
      <div className="flex items-center gap-2 text-secondary-50">
        <span className="font-mono text-primary-40 font-medium">⚛ React</span>
        <span className="text-outline-variant">|</span>
        <span>当前版本</span>
      </div>
      <a
        href={import.meta.env.PROD ? '/vue/' : 'https://onefeifan.gitee.io/web-resume/vue/'}
        className="flex items-center gap-1.5 text-primary-50 hover:text-primary-30 font-medium transition-colors"
      >
        <span>切换到 Vue 3 版</span>
        <span className="text-base">→</span>
      </a>
    </div>
  );
}
