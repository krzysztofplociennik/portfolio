export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  links: {
    demo?: string;
    source?: string;
    case_study?: string;
    download?: string;
  };
  featured?: boolean;
  
  longDescription?: string;
  features?: string[];
  imageUrl?: string;
  compatibility?: string[];
  statusLabel?: string;
  statusValue?: string;
}