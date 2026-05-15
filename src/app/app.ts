import { Component, signal } from '@angular/core';
import { About } from './feautures/about/about';
import { Certifications } from './feautures/certafications/certafications';
import { Contact } from './feautures/contact/contact';
import { Experience } from './feautures/expirience/experience';
import { Hero } from './feautures/hero/hero';
import { Projects } from './feautures/projects/projects';
import { Skills } from './feautures/skills/skills';
import { Navbar } from './shared/components/layout/navbar/navbar';
import { Footer } from './shared/components/layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Navbar, Hero, About, Experience, Projects, Skills, Certifications, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');
}
