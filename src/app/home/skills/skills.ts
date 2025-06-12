import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    this.initScrollAnimations();
    this.initSkillTagAnimations();
  }

  // CV Download Function
  downloadCV(): void {
    // Replace this with your actual CV file path
    const cvUrl = 'assets/cv/YourName_Java_Developer_CV.pdf';
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'YourName_Java_Developer_CV.pdf';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // For demo purposes, show an alert (remove this in production)
    alert('CV download would start here. Please add your actual CV file to assets/cv/ folder.');
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

    // Observe skill categories
    const skillCategories = this.elementRef.nativeElement.querySelectorAll('.skill-category');
    skillCategories.forEach((category: HTMLElement) => {
      observer.observe(category);
    });

    // Observe professional summary
    const summary = this.elementRef.nativeElement.querySelector('.professional-summary');
    if (summary) {
      observer.observe(summary);
    }

    // Observe timeline items
    const timelineItems = this.elementRef.nativeElement.querySelectorAll('.timeline-item');
    timelineItems.forEach((item: HTMLElement) => {
      observer.observe(item);
    });
  }

  private initSkillTagAnimations(): void {
    // Add hover effects to skill tags
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