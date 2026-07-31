/**
 * FrameworkSwitcher — 轻量框架切换提示
 * Vue 版部署后指向实际 URL
 */

export default function FrameworkSwitcher() {
  return (
    <div className="switcher no-print">
      <span>⚛ React</span>
      <span style={{color:'#ccc'}}>Vue 3 版即将上线</span>
    </div>
  );
}
