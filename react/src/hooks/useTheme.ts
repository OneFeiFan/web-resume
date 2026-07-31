import { useEffect } from 'react';
import { useResumeStore } from '../stores/useResumeStore';

export function useTheme() {
  const theme = useResumeStore((s) => s.theme);
  const toggleTheme = useResumeStore((s) => s.toggleTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return { theme, toggleTheme };
}
