import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Project } from './project.model';
import { TranslatePipe } from '../language/translate.pipe';

@Component({
  selector: 'app-project-card',
  imports: [CommonModule, TranslatePipe],
  providers: [TranslatePipe],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCard {
  @Input() project!: Project;
  @Input() animationDelay: number = 0;

  isExpanded = false;

  onMouseEnter() {
    this.isExpanded = true;
  }

  onMouseLeave() {
    this.isExpanded = false;
  }
}