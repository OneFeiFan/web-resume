import { useLocation, useNavigate } from 'react-router-dom';
import { useResumeStore } from '../stores/useResumeStore';

const ITEMS = [
  { path: '/', label: '简历', icon: 'CV' },
  { path: '/tech-stack', label: '技术栈', icon: 'TS' },
  { path: '/timeline', label: '时间线', icon: 'TL' },
  { path: '/about', label: '关于', icon: 'AB' },
];

export default function Navigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useResumeStore((s) => s.theme);
  const toggleTheme = useResumeStore((s) => s.toggleTheme);

  return (
    <nav className="nav-rail no-print">
      <div className="nav-mono">WF</div>
      {ITEMS.map((item) => {
        const active = pathname === item.path;
        return (
          <div
            key={item.path}
            className={`nav-item${active ? ' active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span style={{fontSize:'.7rem',fontFamily:'JetBrains Mono,monospace',fontWeight:active?600:400}}>
              {item.icon}
            </span>
            <span className="nav-tip">{item.label}</span>
          </div>
        );
      })}
      <div className="nav-spacer" />
      <a
        href="https://github.com/OneFeiFan/web-resume"
        target="_blank" rel="noopener noreferrer"
        className="nav-item"
        title="GitHub 开源"
        style={{ textDecoration: 'none' }}
      >
        <span style={{fontSize:'.7rem',fontFamily:'JetBrains Mono,monospace',fontWeight:400}}>GH</span>
        <span className="nav-tip">GitHub</span>
      </a>
      <button className="nav-btn" onClick={toggleTheme} title={theme==='light'?'深色模式':'浅色模式'}>
        {theme==='light'?'◐':'◑'}
      </button>
    </nav>
  );
}
