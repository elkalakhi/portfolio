import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioData } from '../../core/services/portfolio-data';
import { SelectionHeader } from '../../shared/components/selection-header/selection-header';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, SelectionHeader, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss'],
})
export class Projects {
  readonly data = inject(PortfolioData);
  lang = inject(LanguageService);
}
