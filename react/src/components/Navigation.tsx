import { useRef, useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useResumeStore } from '../stores/useResumeStore';

const ITEMS = [
  { path: '/',          label: '简历',   icon: 'CV' },
  { path: '/tech-stack', label: '技术栈', icon: 'TS' },
  { path: '/timeline',   label: '时间线', icon: 'TL' },
  { path: '/about',      label: '关于',   icon: 'AB' },
];

/**
 * Nav children layout (index in navRef.current.children):
 *   0: div.nav-mono (monogram)
 *   1: div.nav-indicator (the indicator itself — skip)
 *   2–5: div.nav-item × 4 (the nav entries)
 *   6: div.nav-spacer
 *   7: a.nav-item (GitHub link)
 *   8: button.nav-btn (theme toggle)
 */
const NAV_ITEM_OFFSET = 2; // first real nav item is at children[2]

export default function Navigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useResumeStore((s) => s.theme);
  const toggleTheme = useResumeStore((s) => s.toggleTheme);
  const [spinning, setSpinning] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

  const activeIndex = ITEMS.findIndex((item) => item.path === pathname);

  const updateIndicator = useCallback(() => {
    const container = navRef.current;
    if (!container) return;

    const activeEl = itemRefs.current[activeIndex];
    if (!activeEl) {
      setIndicatorStyle({ opacity: 0 });
      return;
    }

    const isMobile = window.innerWidth <= 840;
    const containerRect = container.getBoundingClientRect();
    const childRect = activeEl.getBoundingClientRect();

    if (isMobile) {
      // Horizontal indicator centered under the active item
      setIndicatorStyle({
        left: `${childRect.left - containerRect.left + (childRect.width - 20) / 2}px`,
        top: 'auto',
        bottom: '2px',
        width: '20px',
        height: '3px',
        borderRadius: '2px 2px 0 0',
        opacity: 1,
      });
    } else {
      // Vertical indicator aligned with the active item
      setIndicatorStyle({
        top: `${childRect.top - containerRect.top + (childRect.height - 20) / 2}px`,
        left: '6px',
        bottom: 'auto',
        width: '3px',
        height: '20px',
        borderRadius: '0 2px 2px 0',
        opacity: 1,
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    updateIndicator();
    const onResize = () => updateIndicator();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [updateIndicator]);

  const handleToggleTheme = () => {
    setSpinning(true);
    toggleTheme();
    setTimeout(() => setSpinning(false), 350);
  };

  return (
    <nav ref={navRef} className="nav-rail no-print" role="navigation" aria-label="主导航">
      <div className="nav-mono" aria-hidden="true">WF</div>

      {/* Sliding indicator */}
      <div className="nav-indicator" style={indicatorStyle} aria-hidden="true" />

      {ITEMS.map((item, i) => {
        const active = pathname === item.path;
        return (
          <div
            key={item.path}
            ref={(el) => { itemRefs.current[i] = el; }}
            className={`nav-item${active ? ' active' : ''}`}
            onClick={() => navigate(item.path)}
            role="button"
            tabIndex={0}
            aria-label={item.label}
            aria-current={active ? 'page' : undefined}
            onKeyDown={(e) => { if (e.key === 'Enter') navigate(item.path); }}
          >
            <span style={{
              fontSize: '0.7rem',
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: active ? 500 : 400,
            }}>
              {item.icon}
            </span>
            <span className="nav-tip">{item.label}</span>
          </div>
        );
      })}

      <div className="nav-spacer" />

      {/* GitHub link */}
      <a
        href="https://github.com/OneFeiFan/web-resume"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-item"
        title="GitHub"
        aria-label="GitHub 开源仓库"
        style={{ textDecoration: 'none' }}
      >
        <span style={{
          fontSize: '0.7rem',
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 400,
        }}>
          GH
        </span>
        <span className="nav-tip">GitHub</span>
      </a>

      {/* Theme toggle */}
      <button
        className={`nav-btn${spinning ? ' spinning' : ''}`}
        onClick={handleToggleTheme}
        title={theme === 'light' ? '深色模式' : '浅色模式'}
        aria-label={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
      >
        {theme === 'light' ? '◐' : '◑'}
      </button>
    </nav>
  );
}
