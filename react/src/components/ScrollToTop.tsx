import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scroll to top on every route change.
 * Prevents arriving mid-page after navigating from a scrolled parent page.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
