export type ProjectStatus = 'Planned' | 'In Progress' | 'Completed';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  overview: string;
  problem: string;
  solution: string;
  implementedFeatures: string[];
  plannedFeatures: string[];
  technologies: string[];
  status: ProjectStatus;
  thumbnailUrl: string;
  githubUrl: string;
  liveDemoUrl: string;
  myContribution: string;
  lessonsLearned: string;
  date: string;
  featured?: boolean;
}

export interface SkillItem {
  name: string;
  tag?: string; // e.g. "Currently Learning"
}

export interface SkillCategory {
  category: string;
  description?: string;
  skills: SkillItem[];
}

export interface TechStackItem {
  name: string;
  iconKey: string;
  category: string;
}

export interface TechStackCategory {
  category: string;
  items: TechStackItem[];
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  githubUrl: string;
  leetcodeUsername: string;
  leetcodeUrl: string;
  resumeAvailable: boolean;
  resumeFileName?: string;
}

export interface AboutDetails {
  introduction: string;
  developmentInterests: string;
  problemSolvingJourney: string;
  aiInterest: string;
  learningGoals: string;
}

export interface PortfolioData {
  profile: Profile;
  about: AboutDetails;
  skills: SkillCategory[];
  techStack: TechStackCategory[];
  projects: Project[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}
