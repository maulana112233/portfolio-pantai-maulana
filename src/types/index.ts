export type ProjectCategory = 'all' | 'network' | 'server' | 'web';

export interface ProjectMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'network' | 'server' | 'web';
  badge: string;
  summary: string;
  description: string;
  problem: string;
  solution: string;
  architectureDetails: string[];
  metrics: ProjectMetric[];
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  colorTheme: string;
  icon: string;
}

export interface PipelineStage {
  id: string;
  stepNumber: string;
  title: string;
  categoryName: string;
  description: string;
  color: string;
  items: {
    name: string;
    level: string;
    badge: string;
    icon: string;
    description: string;
  }[];
}

export interface TimelineMilestone {
  period: string;
  title: string;
  institution: string;
  location: string;
  role: string;
  description: string;
  highlights: string[];
  skillsGained: string[];
  isCurrent?: boolean;
}

export interface BeachQuote {
  quote: string;
  speaker: 'crab' | 'duck' | 'seagull';
  mood: string;
}
