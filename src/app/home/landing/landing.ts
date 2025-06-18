import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { TranslatePipe } from '../../../shared/language/translate.pipe';
import { LanguageService } from '../../../shared/language/language.service';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, TranslatePipe],
  providers: [TranslatePipe],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing implements AfterViewInit, OnInit {

  currentLanguage = 'en';

  @Input() name: string = 'Krzysztof Płóciennik';
  @Input() profileImage: string = 'assets/images/png/test-cv-photo.png';

  constructor(private elementRef: ElementRef,
    private languageService: LanguageService
  ) {}

  async ngOnInit() {
    await this.languageService.initialize();
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

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
