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
  
  @Input() sectionTitle: string = 'Side Projects';
  @Input() sectionSubtitle: string = 'Explore some of my recent work in Java development and web applications';
  @Input() projects: Project[] = [
    {
      id: 1,
      title: 'Inko',
      description: 'A side project that serves as a personal collection of handy tips related to tech topics.',
      category: 'web',
      technologies: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL'],
      links: { demo: 'https://inkodemo.vercel.app/search-articles', source: 'https://github.com/krzysztofplociennik/inko-backend' },
      imageUrl: 'assets/images/png/inko.png',
      status: 'in-progress'
    },
    {
      id: 2,
      title: 'Custom Size File Generator',
      description: 'File Generator',
      category: 'web',
      technologies: ['Angular'],
      links: { demo: 'https://custom-size-file.vercel.app/', source: 'https://github.com/krzysztofplociennik/custom-size-file' },
      imageUrl: 'assets/images/png/csf.png',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Copy-Paste Anonymizer',
      description: 'A desktop application that can anonymize your clipboard data.',
      category: 'desktop',
      technologies: ['Java', 'JavaFX'],
      compatibility: ['Windows 10/11'],
      links: { source: 'https://github.com/krzysztofplociennik/copy-paste-anonymizer', download: 'assets/cpa/cpa.zip' },
      imageUrl: 'assets/images/png/cpa.png',
      status: 'in-progress'
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
