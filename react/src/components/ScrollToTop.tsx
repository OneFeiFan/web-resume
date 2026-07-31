import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const scrollCache = new Map<string, number>();

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();
  const saved = useRef(scrollCache.get(pathname));

  // Save current scroll BEFORE unmount (useLayoutEffect runs synchronously)
  useLayoutEffect(() => {
    const prev = pathname;
    return () => {
      scrollCache.set(prev, window.scrollY);
    };
  }, [pathname]);

  // Handle scroll on mount
  useEffect(() => {
    if (navType === 'POP') return;

    if (saved.current !== undefined) {
      // Returning to visited page — restore with retry
      const target = saved.current;
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
