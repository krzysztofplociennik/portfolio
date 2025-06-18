import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslatePipe } from '../language/translate.pipe';

export interface FooterLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-footer',
  imports: [CommonModule, TranslatePipe],
  providers: [TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

  @Input() name: string = 'Krzysztof Płóciennik';
  @Input() title: string = 'Java Developer';
  @Input() email: string = 'krzysztofplociennik6@gmail.com';
  @Input() phone: string = '+48 603 093 744';
  @Input() location: string = 'Mikstat, Poland';

  @Input() quickLinks: FooterLink[] = [
    { label: 'footer.home-link-label', href: '#home' },
    { label: 'footer.skills-link-label', href: '#skills' },
    { label: 'footer.projects-link-label', href: '#projects' }
  ];

  currentYear = new Date().getFullYear();

onQuickLinkClick(link: FooterLink, event?: Event): void {
  event?.preventDefault();
  
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
}
}