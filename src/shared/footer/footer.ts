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
    { label: 'footer.home-link-label', href: '#' },
    { label: 'footer.skills-link-label', href: '#skills' },
    { label: 'footer.projects-link-label', href: '#projects' }
  ];

  currentYear = new Date().getFullYear();

  onQuickLinkClick(link: FooterLink): void {
    const target = document.querySelector(link.href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
}