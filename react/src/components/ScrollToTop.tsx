import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const scrollCache = new Map<string, number>();

/**
 * Scroll management:
 * - New page (PUSH/REPLACE from nav bar or card click) → scroll to top
 * - Returning to visited page (PUSH from "返回首页" link) → restore scroll
 * - Browser back/forward (POP) → browser handles it naturally
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (navType === 'POP') {
      // Browser back/forward — browser handles scroll naturally
    } else if (scrollCache.has(pathname)) {
      // Returning to a previously visited page — restore scroll
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollCache.get(pathname)!);
      });
    } else {
      // First visit — scroll to top
      window.scrollTo(0, 0);
    }

    // Save current scroll before leaving
    const prev = prevPath.current;
    return () => {
      scrollCache.set(prev, window.scrollY);
    };
  }, [pathname, navType]);

  return null;
}
