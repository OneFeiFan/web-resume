import { useState, useEffect } from 'react';

/**
 * Debounce hook — delays value update until after `delay` ms of inactivity.
 * Commonly asked in interviews: "How would you implement debounce in React?"
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
