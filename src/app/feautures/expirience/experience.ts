import { Component, ChangeDetectionStrategy, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioData } from '../../core/services/portfolio-data';
import { SelectionHeader } from '../../shared/components/selection-header/selection-header';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, SelectionHeader, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './experience.html',
  styleUrls: ['./experience.scss'],
})
export class Experience {
  readonly data = inject(PortfolioData);

  lang = inject(LanguageService);

  splitMissions(missions: string[]): string[] {
    return missions.map((m) => m.trim());
  }
}
