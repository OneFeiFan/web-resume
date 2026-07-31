import { useMemo, useCallback } from 'react';
import { useResumeStore } from '../stores/useResumeStore';
import type { ResumeData, Project } from '../types/resume';
import resumeJson from '../data/resume.json';

const data = resumeJson as unknown as ResumeData;

export function useResume() {
  const activeSkill = useResumeStore((s) => s.activeSkill);
  const setActiveSkill = useResumeStore((s) => s.setActiveSkill);
  const viewMode = useResumeStore((s) => s.viewMode);
  const toggleViewMode = useResumeStore((s) => s.toggleViewMode);
  const addRecentProject = useResumeStore((s) => s.addRecentProject);

  const allSkills = useMemo(
    () => Array.from(new Set(data.skills.flatMap((g) => g.items))).sort(),
    []
  );

  const filteredProjects = useMemo(() => {
    if (!activeSkill) return data.projects;
    return data.projects.filter((p) =>
      p.techStack.some((t) => t.toLowerCase().includes(activeSkill.toLowerCase()))
    );
  }, [activeSkill]);

  const getProjectById = useCallback(
    (id: string): Project | undefined => {
      const p = data.projects.find((proj) => proj.id === id);
      if (p) addRecentProject(id);
      return p;
    },
    [addRecentProject]
  );

  const toggleSkill = useCallback(
    (skill: string) => setActiveSkill(activeSkill === skill ? null : skill),
    [activeSkill, setActiveSkill]
  );

  return {
    data,
    allSkills,
    activeSkill,
    filteredProjects,
    viewMode,
    getProjectById,
    toggleSkill,
    toggleViewMode,
  };
}
