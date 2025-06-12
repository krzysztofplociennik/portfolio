import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements AfterViewInit {

  @Input() logoText: string = 'KP';
  @Input() ctaText: string = 'Get In Touch';
  @Input() navLinks: NavLink[] = [
    // { href: '#', label: 'Home' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ];

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.initStickyHeader();
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

    // Show header initially after a delay
    setTimeout(() => {
      stickyHeader.classList.add('visible');
    }, 1000);

    // Handle scroll events
    window.addEventListener('scroll', requestTick, { passive: true });

    // Mobile menu toggle
    if (mobileMenuBtn && mobileNav) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
      });
    }

    // Close mobile menu when clicking nav links
    const mobileNavLinks = this.elementRef.nativeElement.querySelectorAll('.mobile-nav-link, .nav-link');
    mobileNavLinks.forEach((link: HTMLAnchorElement) => {
      link.addEventListener('click', () => {
        mobileNav?.classList.remove('active');
        mobileMenuBtn?.classList.remove('active');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!stickyHeader.contains(target)) {
        mobileNav?.classList.remove('active');
        mobileMenuBtn?.classList.remove('active');
      }
    });
  }
}

export interface NavLink {
  href: string;
  label: string;
}
