// ══ PROFILE ══
export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  subtitle: string;
  description: string;
  email: string;
  linkedin: string;
  github: string;
  available: boolean;
  initials: string;
  id: string;
  image: string;
}

// ══ STAT ══
export interface Stat {
  value: number;
  label: string;
  suffix: string;
}

// ══ SKILL ══
export interface Skill {
  id: string;
  name: string;
  icon: string;
  level: number; // 0–100
  category: SkillCategory;
}

export type SkillCategory =
  | 'backend'
  | 'frontend'
  | 'devops'
  | 'cloud'
  | 'database'
  | 'tools';

// ══ EXPERIENCE ══
export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  projects: Project[];
  type: string;
}

// ══ PROJECT ══
export interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: string;
  technologies: string[];
  mission: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export type ProjectStatus = 'live' | 'beta' | 'open-source' | 'archived' | 'intern' | 'client';

// ══ CERTIFICATION ══
export interface Certification {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  badgeVariant: 'blue' | 'purple' | 'cyan' | 'gold';
  lifetime?: boolean;
}

// ══ NAV LINK ══
export interface NavLink {
  label: string;
  fragment: string;
}

// ══ HOLO SKILL BAR ══
export interface HoloBar {
  label: string;
  percentage: number;
  colorClass: string;
}

// ══ CONTACT INFO ══
export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  href: string;
}
