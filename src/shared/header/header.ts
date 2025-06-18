import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { TranslatePipe } from '../language/translate.pipe';
import { LanguageService } from '../language/language.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, TranslatePipe],
  providers: [TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements AfterViewInit, OnInit {

  currentLanguage = 'en';

  @Input() logoText: string = 'KP';
  @Input() ctaText: string = 'Get In Touch';
  @Input() navLinks: NavLink[] = [
    { href: '#skills', label: 'header.skills-label' },
    { href: '#projects', label: 'header.projects-label' }
  ];

  constructor(private elementRef: ElementRef,
    private languageService: LanguageService
  ) { }

  async ngOnInit() {
    await this.languageService.initialize();
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  ngAfterViewInit() {
    this.initStickyHeader();
  }

  async toggleLanguage() {
    const newLang = this.currentLanguage === 'en' ? 'pl' : 'en';
    await this.languageService.changeLanguage(newLang);
    this.currentLanguage = newLang;

    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }

  private initStickyHeader(): void {
    const stickyHeader = this.elementRef.nativeElement.querySelector('#stickyHeader');
    const mobileMenuBtn = this.elementRef.nativeElement.querySelector('#mobileMenuBtn');
    const mobileNav = this.elementRef.nativeElement.querySelector('#mobileNav');

    if (!stickyHeader) return;

    let lastScrollY = 0;
    let ticking = false;

    const updateHeader = () => {
      const scrollY = window.scrollY;

      if (scrollY < lastScrollY || scrollY < 100) {
        stickyHeader.classList.add('visible');
      } else {
        stickyHeader.classList.remove('visible');
        if (mobileNav) {
          mobileNav.classList.remove('active');
          mobileMenuBtn?.classList.remove('active');
        }
      }

      lastScrollY = scrollY;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    setTimeout(() => {
      stickyHeader.classList.add('visible');
    }, 1000);

    window.addEventListener('scroll', requestTick, { passive: true });

    if (mobileMenuBtn && mobileNav) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
      });
    }

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!stickyHeader.contains(target)) {
        mobileNav?.classList.remove('active');
        mobileMenuBtn?.classList.remove('active');
      }
    });
  }

  onNavLinkClick(link: NavLink, event: Event): void {
    event.preventDefault();

    if (link.href === '#' || link.href === '#home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    const targetId = link.href.replace('#', '');
    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      console.warn(`Target element with id "${targetId}" not found`);
      const fallbackTarget = document.querySelector(link.href);
      if (fallbackTarget) {
        fallbackTarget.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }

    const mobileNav = this.elementRef.nativeElement.querySelector('#mobileNav');
    const mobileMenuBtn = this.elementRef.nativeElement.querySelector('#mobileMenuBtn');
    if (mobileNav && mobileMenuBtn) {
      mobileNav.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    }
  }
}

export interface NavLink {
  href: string;
  label: string;
}
