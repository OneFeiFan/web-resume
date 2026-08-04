import { useLocation, useNavigate } from 'react-router-dom';
import { useResumeStore } from '../stores/useResumeStore';

const ITEMS = [
  { path: '/',           label: '简历' },
  { path: '/tech-stack', label: '技术栈' },
  { path: '/timeline',   label: '时间线' },
  { path: '/about',      label: '关于' },
];

export default function Navigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useResumeStore((s) => s.theme);
  const toggleTheme = useResumeStore((s) => s.toggleTheme);

  const isWide = ['/project/', '/tech-stack', '/timeline', '/about'].some((p) =>
    pathname.startsWith(p)
  );

  return (
    <nav className={`nav-bar no-print${isWide ? ' wide' : ''}`}>
      <span className="nav-name" onClick={() => navigate('/')}>陆威帆</span>

      <div className="nav-links">
        {ITEMS.map((item) => (
          <span
            key={item.path}
            className={`nav-link${pathname === item.path ? ' active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </span>
        ))}
      </div>

      <div className="nav-actions">
        <a
          href="https://github.com/OneFeiFan/web-resume"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
          style={{ fontSize: 'var(--text-xs)' }}
        >
          GitHub
        </a>
        <button
          className="nav-icon-btn"
          onClick={toggleTheme}
          title={theme === 'light' ? '深色模式' : '浅色模式'}
        >
          {theme === 'light' ? '◐' : '◑'}
        </button>
      </div>
    </nav>
  );
}
