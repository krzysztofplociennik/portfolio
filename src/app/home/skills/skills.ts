import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';

interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills implements AfterViewInit {

  cvPathPL: string = 'assets/pdf/Krzysztof-Plociennik-CV-PL.pdf';
  cvPathEN: string = 'assets/pdf/Krzysztof-Plociennik-CV-EN.pdf';

  skillCategories: SkillCategory[] = [
    {
      id: 'backend',
      title: 'Backend',
      skills: ['Java 11+', 'Spring Boot', 'Hibernate', 'JUnit', 'REST APIs', 'Maven', 'Gradle']
    },
    {
      id: 'database',
      title: 'Database',
      skills: ['PostgreSQL', 'Oracle', 'MongoDB']
    },
    {
      id: 'tools',
      title: 'Tools',
      skills: ['Git', 'IntelliJ IDEA', 'VS Code', 'Windows', 'Linux', 'JIRA']
    },
        {
      id: 'frontend',
      title: 'Frontend',
      skills: ['Angular 15+', 'HTML5', 'CSS', 'pdfmake']
    },
  ];

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.initScrollAnimations();
    this.initSkillTagAnimations();
  }

  openCVInBrowser(): void {
    const cvUrl = this.cvPathPL;
    window.open(cvUrl, '_blank');
  }

  private initScrollAnimations(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const skillCategories = this.elementRef.nativeElement.querySelectorAll('.skill-category');
    skillCategories.forEach((category: HTMLElement) => {
      observer.observe(category);
    });

    const summary = this.elementRef.nativeElement.querySelector('.professional-summary');
    if (summary) {
      observer.observe(summary);
    }
  }

  private initSkillTagAnimations(): void {
    const skillTags = this.elementRef.nativeElement.querySelectorAll('.skill-tag');
    skillTags.forEach((tag: HTMLElement, index: number) => {
      tag.style.animationDelay = `${index * 0.1}s`;
      
      tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-3px) scale(1.05)';
      });
      
      tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0) scale(1)';
      });
    });
  }
}