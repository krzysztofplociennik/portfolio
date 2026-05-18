import { Component, OnInit } from '@angular/core';
import { Header, NavLink } from "../../shared/header/header";
import { Landing } from "./landing/landing";
import { Projects } from "./projects/projects";
import { Skills } from "./skills/skills";
import { Footer } from "../../shared/footer/footer";
import { Visitor } from '../../shared/services/visitor';

@Component({
  selector: 'app-home',
  imports: [Header, Landing, Projects, Skills, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  constructor(
    private visitor: Visitor
  ) {
    document.documentElement.scrollTop = 0;
  }

  ngOnInit(): void {
    this.visitor.notifyVisit();
  }
}