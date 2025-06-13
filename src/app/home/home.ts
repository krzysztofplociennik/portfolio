import { Component } from '@angular/core';
import { Header, NavLink } from "../../shared/header/header";
import { Landing } from "./landing/landing";
import { Projects } from "./projects/projects";
import { Skills } from "./skills/skills";
import { Footer } from "../../shared/footer/footer";

@Component({
  selector: 'app-home',
  imports: [Header, Landing, Projects, Skills, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  constructor() {
    document.documentElement.scrollTop = 0;
  }
}