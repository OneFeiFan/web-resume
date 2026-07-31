import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const scrollCache = new Map<string, number>();

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  // Save scroll position before leaving current page
  useLayoutEffect(() => {
    const prev = pathname;
    return () => {
      scrollCache.set(prev, window.scrollY);
    };
  }, [pathname]);

  // Restore or scroll-to-top on navigation
  useEffect(() => {
    if (navType === 'POP') return;

    const target = scrollCache.get(pathname);
    if (target !== undefined) {
      let tries = 0;
      const restore = () => {
        window.scrollTo(0, target);
        tries++;
        if (window.scrollY < target - 10 && tries < 8) {
          requestAnimationFrame(restore);
        }
      };
      requestAnimationFrame(restore);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, navType]);

  return null;
}
