import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark';
export type ViewMode = 'interactive' | 'print';

interface ResumeStore {
  // Filters
  activeSkill: string | null;
  setActiveSkill: (skill: string | null) => void;
  // View
  viewMode: ViewMode;
  toggleViewMode: () => void;
  // Theme
  theme: ThemeMode;
  toggleTheme: () => void;
  // Recently viewed (for HR to see exploration path)
  recentProjects: string[];
  addRecentProject: (id: string) => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      activeSkill: null,
      setActiveSkill: (skill) => set({ activeSkill: skill }),

      viewMode: 'interactive',
      toggleViewMode: () =>
        set((s) => ({ viewMode: s.viewMode === 'interactive' ? 'print' : 'interactive' })),

      theme: 'light',
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),

      recentProjects: [],
      addRecentProject: (id) =>
        set((s) => {
          const next = [id, ...s.recentProjects.filter((p) => p !== id)].slice(0, 5);
          return { recentProjects: next };
        }),
    }),
    {
      name: 'wf-resume-storage',
      partialize: (state) => ({
        theme: state.theme,
        recentProjects: state.recentProjects,
        activeSkill: state.activeSkill,
      }),
    }
  )
);
