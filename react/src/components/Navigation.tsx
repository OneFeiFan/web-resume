import { useLocation, useNavigate } from 'react-router-dom';
import { useResumeStore } from '../stores/useResumeStore';

const NAV_ITEMS = [
  { path: '/', icon: '📄', label: '简历' },
  { path: '/tech-stack', icon: '🛠', label: '技术栈' },
  { path: '/timeline', icon: '📅', label: '时间线' },
  { path: '/about', icon: '⚙', label: '关于' },
];

export default function Navigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useResumeStore((s) => s.theme);
  const toggleTheme = useResumeStore((s) => s.toggleTheme);

  return (
    <nav className="nav-rail">
      <div className="mb-4 text-xl font-bold text-primary-40 font-mono select-none">WF</div>
      {NAV_ITEMS.map((item) => (
        <div
          key={item.path}
          className={`nav-rail-item ${pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
          title={item.label}
        >
          <span className="text-base">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
      <div className="mt-auto flex flex-col items-center gap-3">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-m3-full flex items-center justify-center
                     hover:bg-surface-container transition-colors text-lg"
          title={theme === 'light' ? '切换深色模式' : '切换浅色模式'}
        >
          {theme === 'light' ? '🌙' : '☀'}
        </button>
        <div className="text-[10px] text-secondary-50 text-center leading-tight">
          M3
        </div>
      </div>
    </nav>
  );
}
