import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProjectCard } from "../../../shared/project-card/project-card";
import { Project } from '../../../shared/project-card/project.model';
import { TranslatePipe } from '../../../shared/language/translate.pipe';
import { LanguageService } from '../../../shared/language/language.service';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, ProjectCard, TranslatePipe],
  providers: [TranslatePipe],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements AfterViewInit, OnInit, OnChanges {

  currentLanguage = '';

  projects: Project[] = [];

  constructor(
    private elementRef: ElementRef, 
    private languageService: LanguageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change');
    
  }

  async ngOnInit() {
    await this.languageService.initialize();
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.loadProjectsData();
  }

  private loadProjectsData() {
    this.projects = [
    {
      id: 1,
      title: 'Inko',
      description: 'projects.project-one-description',
      category: 'projects.project-type-web',
      technologies: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL'],
      links: { 
        demo: 'https://inkodemo.vercel.app/search-articles', 
        source: 'https://github.com/krzysztofplociennik/inko-backend' 
      },
      imageUrl: 'assets/images/png/inko.png',
      statusLabel: 'in-progress',
      statusValue: 'projects.status-in-progress-label'
    },
    {
      id: 2,
      title: 'Custom Size File Generator',
      description: 'projects.project-two-description',
      category: 'projects.project-type-web',
      technologies: ['Angular'],
      links: { 
        demo: 'https://custom-size-file.vercel.app/', 
        source: 'https://github.com/krzysztofplociennik/custom-size-file' 
      },
      imageUrl: 'assets/images/png/csf.png',
      statusLabel: 'in-progress',
      statusValue: 'projects.status-in-progress-label'
    },
    {
      id: 3,
      title: 'Copy-Paste Anonymizer',
      description: 'projects.project-three-description',
      category: 'projects.project-type-desktop',
      technologies: ['Java', 'JavaFX'],
      compatibility: ['Windows 10/11'],
      links: { 
        source: 'https://github.com/krzysztofplociennik/copy-paste-anonymizer', 
        download: 'assets/cpa/cpa.zip' 
      },
      imageUrl: 'assets/images/png/cpa.png',
      statusLabel: 'in-progress',
      statusValue: 'projects.status-in-progress-label'
    }
    ];
  }

  ngAfterViewInit() {
    this.initScrollAnimations();
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
