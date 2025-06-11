import { Component, OnInit } from '@angular/core';
import { Header, NavLink } from "../../shared/header/header";
import { Landing } from "./landing/landing";
import { Projects } from "./projects/projects";
import { Project } from '../../shared/project-card/project';

@Component({
  selector: 'app-home',
  imports: [Header, Landing, Projects],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  // Header configuration
  headerData = {
    logoText: 'YourName',
    ctaText: 'Get In Touch',
    navLinks: [
      { href: '#', label: 'Home' },
      { href: '#projects', label: 'Projects' },
      { href: '#about', label: 'About' },
      { href: '#contact', label: 'Contact' }
    ] as NavLink[]
  };

  // Profile/Hero section data
  profileData = {
    name: 'Your Full Name',
    title: 'Java Developer',
    description: 'Passionate Java developer with expertise in building scalable enterprise applications. I specialize in Spring Boot, microservices architecture, and creating efficient solutions that drive business growth.',
    profileImage: 'test-cv-photo.png',
    techBadges: ['Java', 'Spring Boot', 'Angular']
  };

  // Projects section data
  projectsData = {
    sectionTitle: 'Featured Projects',
    sectionSubtitle: 'Explore some of my recent work in Java development and web applications',
    categories: ['all', 'java', 'web', 'microservices', 'api'],
    projects: [
      {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution built with Spring Boot and Angular',
        category: 'java',
        technologies: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL'],
        links: { demo: '#', source: '#' }
      },
      {
        id: 2,
        title: 'Task Management System',
        description: 'Collaborative project management tool with real-time updates',
        category: 'web',
        technologies: ['Java', 'Spring Security', 'WebSocket', 'MySQL'],
        links: { demo: '#', source: '#' }
      },
      {
        id: 3,
        title: 'Microservices Architecture',
        description: 'Scalable microservices system with service discovery and load balancing',
        category: 'microservices',
        technologies: ['Spring Cloud', 'Docker', 'Kubernetes', 'Redis'],
        links: { demo: '#', source: '#' }
      }
    ] as Project[]
  };

  constructor() {
    // Force scroll to top
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  ngOnInit() {
    // Ensure scroll to top
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }
}