import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-landing',
  imports: [CommonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing implements AfterViewInit {

  @Input() name: string = 'Krzysztof Płóciennik';
  @Input() title: string = 'Java Developer';
  @Input() description: string = 'Passionate Java developer with expertise in building scalable enterprise applications.';
  @Input() profileImage: string = 'assets/images/png/test-cv-photo.png';
  @Input() techBadges: string[] = ['Java', 'Spring Boot', 'Angular'];

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.initSmoothScrolling();
    this.initInteractiveEffects();
  }

  private initSmoothScrolling(): void {
    const anchors = this.elementRef.nativeElement.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor: HTMLAnchorElement) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href')!);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  private initInteractiveEffects(): void {
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
}
