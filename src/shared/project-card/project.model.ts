// Simplified project.ts interface
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
  };
  featured?: boolean;
  
  // Essential optional fields for enhanced card content
  longDescription?: string;    // Detailed project description
  features?: string[];         // Key features list
  imageUrl?: string;          // Project screenshot/image
  status?: 'completed' | 'in-progress' | 'planned'; // Project status
}

// Example usage with streamlined data:
export const sampleProjects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with advanced features",
    longDescription: "A full-stack e-commerce platform built with Angular and Node.js, featuring real-time inventory management, secure payment processing, and advanced analytics dashboard.",
    category: "Full Stack",
    technologies: ["Angular", "Node.js", "MongoDB", "Stripe API", "Socket.io"],
    features: [
      "Real-time inventory tracking",
      "Multi-vendor support",
      "Advanced search and filtering",
      "Secure payment processing",
      "Analytics dashboard"
    ],
    status: "completed",
    links: {
      demo: "https://demo.ecommerce-platform.com",
      source: "https://github.com/username/ecommerce-platform",
      case_study: "https://portfolio.com/case-studies/ecommerce"
    },
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative project management tool",
    longDescription: "A comprehensive task management application inspired by modern productivity tools, featuring team collaboration, time tracking, and project analytics.",
    category: "Frontend",
    technologies: ["Angular", "TypeScript", "Firebase", "Angular Material"],
    features: [
      "Drag & drop task management",
      "Real-time collaboration",
      "Time tracking integration",
      "Custom project templates"
    ],
    status: "completed",
    links: {
      demo: "https://taskmanager-demo.com",
      source: "https://github.com/username/task-manager"
    }
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Real-time weather tracking application",
    category: "Frontend",
    technologies: ["React", "OpenWeather API", "Chart.js"],
    status: "in-progress",
    links: {
      demo: "https://weather-dashboard-demo.com",
      source: "https://github.com/username/weather-dashboard"
    }
  }
];