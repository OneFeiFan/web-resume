import { computed } from 'vue';
import { useResumeStore } from '../stores/useResumeStore';
import type { Project } from '../types/resume';
import data from '../data/resume.json';

const resume = data as any;

export function useResume() {
  const store = useResumeStore();

  const allSkills = computed(() =>
    Array.from(new Set(resume.skills.flatMap((g: any) => g.items))).sort() as string[]
  );

  const filteredProjects = computed(() => {
    if (!store.activeSkill) return resume.projects;
    return resume.projects.filter((p: any) =>
      p.techStack.some((t: string) =>
        t.toLowerCase().includes(store.activeSkill!.toLowerCase())
      )
    );
  });

  function getProjectById(id: string): Project | undefined {
    const p = resume.projects.find((proj: any) => proj.id === id);
    if (p) store.addRecentProject(id);
    return p as Project | undefined;
  }

  function toggleSkill(skill: string) {
    store.setActiveSkill(store.activeSkill === skill ? null : skill);
  }

  return {
    data: resume as any,
    allSkills,
    activeSkill: computed(() => store.activeSkill),
    filteredProjects,
    viewMode: computed(() => store.viewMode),
    getProjectById,
    toggleSkill,
    toggleViewMode: store.toggleViewMode,
  };
}
