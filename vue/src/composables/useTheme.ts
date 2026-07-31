import { watch } from 'vue';
import { useResumeStore } from '../stores/useResumeStore';

export function useTheme() {
  const store = useResumeStore();

  watch(() => store.theme, (t) => {
    document.documentElement.classList.toggle('dark', t === 'dark');
    document.documentElement.style.colorScheme = t;
  }, { immediate: true });
}
