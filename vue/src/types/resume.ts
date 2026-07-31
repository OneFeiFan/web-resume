export interface Personal {
  name: string; title: string; email: string; phone: string;
  location: string; education: string; summary: string;
}

export interface SkillGroup {
  category: string; items: string[];
}

export interface ExperienceBullet {
  title: string; content: string;
}

export interface Experience {
  company: string; role: string; period: string; bullets: ExperienceBullet[];
}

export interface DeepCase {
  title: string; background: string; decision: string; impact: string; commits: string[];
}

export interface Project {
  id: string; name: string; period: string; role: string;
  summary: string; techStack: string[];
  metrics: Record<string, number | string | undefined>;
  cases: DeepCase[];
}

export interface TimelineEvent {
  date: string; label: string; type: 'start' | 'end' | 'milestone' | 'gap';
}

export interface Award {
  title: string; event: string; year: number;
}

export interface ResumeData {
  personal: Personal;
  skills: SkillGroup[];
  experience: Experience;
  projects: Project[];
  awards: Award[];
  timeline: TimelineEvent[];
}
