/**
 * CommitFeed — Git commit log displayed as a VS Code terminal snippet.
 * Signature element: no other portfolio can replicate real git history.
 */

const COMMITS = [
  { h:'33b44369', d:'2026-05-19', t:'feat', m:'feat(财务中心): 添加财务对账相关功能', s:'+3,837 / -5 / 43 files' },
  { h:'19a6bb7d', d:'2026-05-27', t:'feat', m:'feat(活动管理): part2 — BookPlanConfig + TaskItem拆分', s:'+2,304 / -564 / 16 files' },
  { h:'226bfeef', d:'2026-04-23', t:'feat', m:'Feature/circle — 圈子社区从零搭建', s:'+5,041 / -47 / 18 files' },
  { h:'9cebca9', d:'2024-10-19', t:'feat', m:'几乎重写了主页', s:'+399 / -855 / 1 file (-68%)' },
  { h:'c46174a', d:'2026-04-29', t:'feat', m:'feat(C/B端排行榜): 添加C端和B端排行榜', s:'+2,044 / 4 files' },
  { h:'45eb54b4', d:'2024-04-23', t:'refactor', m:'refactor: 拆掉mixin，合并入文件', s:'+1,230 / 8 files' },
  { h:'79b0964', d:'2024-11-16', t:'feat', m:'控制大修改，加入权限控制', s:'+320 / -537 / 3 files' },
  { h:'b3d5443', d:'2025-01-19', t:'perf', m:'Excel导出精简 — 148行→11行 (-92%)', s:'+11 / -137 / 1 file' },
  { h:'fe8b2d6', d:'2026-05-07', t:'fix', m:'fix: 全局限制微信调整H5字体大小', s:'' },
  { h:'e8f87b9', d:'2026-06-12', t:'feat', m:'同步亲近母语 — 5新页面+3新组件', s:'+5,375 / -269 / 18 files' },
];

const TYPE_CLASS: Record<string, string> = {
  feat: 'c-feat', fix: 'c-fix', perf: 'c-perf', refactor: 'c-refactor',
};

export default function CommitFeed() {
  return (
    <div className="commit-box no-print" aria-label="Git commit history sample">
      <div className="c-meta" style={{marginBottom:6}}>$ git log --author="3022504358@qq.com" --oneline --since="2024-01" --until="2026-06" | head -10</div>
      {COMMITS.map((c) => (
        <div key={c.h}>
          <span className="c-hash">{c.h.slice(0,7)}</span>
          {'  '}
          <span className="c-date">{c.d}</span>
          {'  '}
          <span className={TYPE_CLASS[c.t] || 'c-msg'}>{c.m}</span>
          {c.s && <span className="c-meta">{'  // '}{c.s}</span>}
        </div>
      ))}
      <div className="c-meta" style={{marginTop:6}}>... 369 total commits across 4 repositories</div>
    </div>
  );
}
