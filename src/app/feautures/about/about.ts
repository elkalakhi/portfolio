import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioData } from '../../core/services/portfolio-data';
import { SelectionHeader } from '../../shared/components/selection-header/selection-header';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SelectionHeader, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
  styleUrls: ['./about.scss'],
})
export class About {
  readonly data = inject(PortfolioData);
  lang = inject(LanguageService);

  readonly highlights = [
    {
      icon: 'fa-solid fa-gears',
      title: 'about.items.0',
      desc: 'Java · Spring Boot · Microservices · Hexagonal · Domain-Driven Design',
    },
    {
      icon: 'fa-solid fa-globe',
      title: 'about.items.1',
      desc: 'Angular · React · TypeScript'
    },
    {
      icon: 'fa-solid fa-cloud',
      title: 'about.items.2',
      desc: 'MINIO · Docker'
    },
    {
      icon: 'fa-solid fa-shield-halved',
      title: 'about.items.3',
      desc: 'OAuth2 · JWT'
    },
  ];
}
