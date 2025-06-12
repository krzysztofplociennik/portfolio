import { Component } from '@angular/core';
import { Header, NavLink } from "../../shared/header/header";
import { Landing } from "./landing/landing";
import { Projects } from "./projects/projects";
import { Project } from '../../shared/project-card/project';
import { Skills } from "./skills/skills";

@Component({
  selector: 'app-home',
  imports: [Header, Landing, Projects, Skills],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  constructor() {
    document.documentElement.scrollTop = 0;
  }
}