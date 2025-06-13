import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { ProjectCard } from "../../../shared/project-card/project-card";
import { Project } from '../../../shared/project-card/project.model';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements AfterViewInit {
  
  @Input() sectionTitle: string = 'Featured Projects';
  @Input() sectionSubtitle: string = 'Explore some of my recent work in Java development and web applications';
  @Input() projects: Project[] = [
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
  ];
  @Input() categories: string[] = ['all', 'java', 'web', 'microservices', 'api'];

  activeFilter: string = 'all';
  filteredProjects: Project[] = [];

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.filteredProjects = [...this.projects];
    this.initScrollAnimations();
  }

  onFilterChange(filter: string): void {
    this.activeFilter = filter;
    
    if (filter === 'all') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(project => project.category === filter);
    }
  }

  private initScrollAnimations(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const projectCards = this.elementRef.nativeElement.querySelectorAll('.project-card');
    projectCards.forEach((card: HTMLElement) => {
      observer.observe(card);
    });

    const sectionHeader = this.elementRef.nativeElement.querySelector('.section-header');
    if (sectionHeader) {
      observer.observe(sectionHeader);
    }
  }
}
