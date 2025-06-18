import { Component, OnInit, OnDestroy } from '@angular/core';
import { Home } from "./home/home";

@Component({
  selector: 'app-root',
  imports: [
    Home
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected title = 'portfolio';
  private cursor: HTMLElement | null = null;
  private isMouseDown = false;

  ngOnInit() {
    this.initCustomCursor();
  }

  ngOnDestroy() {
    this.removeCustomCursor();
  }

  private initCustomCursor(): void {
    if (window.matchMedia('(hover: hover)').matches) {
      this.createCursor();
      this.addEventListeners();
    }
  }

  private createCursor(): void {
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    document.body.appendChild(this.cursor);
  }

  private addEventListeners(): void {
    document.addEventListener('mousemove', this.onMouseMove.bind(this), { passive: true });
    
    document.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
    
    this.addHoverListeners();
  }

  private onMouseMove(e: MouseEvent): void {
    if (this.cursor) {
      this.cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
    }
  }

  private onMouseDown(): void {
    this.isMouseDown = true;
    this.cursor?.classList.add('click');
  }

  private onMouseUp(): void {
    this.isMouseDown = false;
    this.cursor?.classList.remove('click');
  }

  private addHoverListeners(): void {
    const interactiveElements = 'a, button, .btn, .nav-link, .project-card, .skill-tag, .filter-btn, input, textarea, [role="button"], [tabindex]';
    
    document.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches(interactiveElements) || target.closest(interactiveElements)) {
        this.cursor?.classList.add('hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches(interactiveElements) || target.closest(interactiveElements)) {
        this.cursor?.classList.remove('hover');
      }
    });

    document.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches('p, h1, h2, h3, h4, h5, h6, span:not(.skill-tag), .description, .summary-text, .project-title, .project-category, .project-description-short')) {
        this.cursor?.classList.add('text');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches('p, h1, h2, h3, h4, h5, h6, span:not(.skill-tag), .description, .summary-text, .project-title, .project-category, .project-description-short')) {
        this.cursor?.classList.remove('text');
      }
    });
  }

  private removeCustomCursor(): void {
    if (this.cursor) {
      this.cursor.remove();
      this.cursor = null;
    }
    
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mousedown', this.onMouseDown.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));
  }
}