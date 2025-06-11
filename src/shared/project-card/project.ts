export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  links: {
    demo?: string;
    source?: string;
  };
  featured?: boolean;
}