import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  
  @Input() name: string = 'Krzysztof Płóciennik';
  @Input() title: string = 'Java Developer';
  @Input() email: string = 'your.email@example.com';
  @Input() phone: string = '+48 123 456 789';
  @Input() location: string = 'Warsaw, Poland';
  
  @Input() socialLinks: SocialLink[] = [
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile', icon: '💼' },
    { platform: 'GitHub', url: 'https://github.com/yourusername', icon: '💻' },
    { platform: 'Email', url: 'mailto:your.email@example.com', icon: '📧' }
  ];
  
  @Input() quickLinks: FooterLink[] = [
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  currentYear = new Date().getFullYear();

  onSocialClick(link: SocialLink): void {
    if (link.platform === 'Email') {
      window.location.href = link.url;
    } else {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    }
  }

  onQuickLinkClick(link: FooterLink): void {
    const target = document.querySelector(link.href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
}