import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef) {
    // Force scroll to top immediately in constructor
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  ngOnInit() {
    // Also try in OnInit
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }

  ngAfterViewInit() {
    // Force scroll after view is ready
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);

    this.initSmoothScrolling();
    this.initInteractiveEffects();
    this.initProjectFilters();
    this.initScrollAnimations();
  }

  private initSmoothScrolling(): void {
    // Smooth scrolling for anchor links
    const anchors = this.elementRef.nativeElement.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor: HTMLAnchorElement) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href')!);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }

  private initInteractiveEffects(): void {
    // Add mouse movement effects for tech badges
    document.addEventListener('mousemove', (e) => {
      const techBadges = this.elementRef.nativeElement.querySelectorAll('.tech-badge');
      techBadges.forEach((badge: HTMLElement, index: number) => {
        const speed = (index + 1) * 0.5;
        const x = (e.clientX * speed) / 100;
        const y = (e.clientY * speed) / 100;
        badge.style.transform = `translate(${x}px, ${y}px) translateY(-10px)`;
      });
    });
  }

  private initProjectFilters(): void {
    const filterButtons = this.elementRef.nativeElement.querySelectorAll('.filter-btn');
    const projectCards = this.elementRef.nativeElement.querySelectorAll('.project-card');

    filterButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach((btn: HTMLElement) => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects
        projectCards.forEach((card: HTMLElement) => {
          const category = card.getAttribute('data-category');
          
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.6s ease-out';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
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

    // Observe project cards for scroll animations
    const projectCards = this.elementRef.nativeElement.querySelectorAll('.project-card');
    projectCards.forEach((card: HTMLElement) => {
      observer.observe(card);
    });

    // Observe section header
    const sectionHeader = this.elementRef.nativeElement.querySelector('.section-header');
    if (sectionHeader) {
      observer.observe(sectionHeader);
    }
  }
}