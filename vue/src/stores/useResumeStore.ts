import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

const KEY = 'wf-resume-storage';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}

export const useResumeStore = defineStore('resume', () => {
  const saved = load();

  const activeSkill = ref<string | null>(null);
  const theme = ref<'light' | 'dark'>(saved.theme || 'light');
  const viewMode = ref<'interactive' | 'print'>('interactive');
  const recentProjects = ref<string[]>(saved.recentProjects || []);

  watch([theme, recentProjects], () => {
    localStorage.setItem(KEY, JSON.stringify({
      theme: theme.value,
      recentProjects: recentProjects.value,
    }));
  }, { deep: true });

  function setActiveSkill(skill: string | null) { activeSkill.value = skill; }
  function toggleTheme() { theme.value = theme.value === 'light' ? 'dark' : 'light'; }
  function toggleViewMode() { viewMode.value = viewMode.value === 'interactive' ? 'print' : 'interactive'; }
  function addRecentProject(id: string) {
    recentProjects.value = [id, ...recentProjects.value.filter(p => p !== id)].slice(0, 5);
  }

  return { activeSkill, setActiveSkill, theme, toggleTheme, viewMode, toggleViewMode, recentProjects, addRecentProject };
});
