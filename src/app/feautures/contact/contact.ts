import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioData } from '../../core/services/portfolio-data';
import { SelectionHeader } from '../../shared/components/selection-header/selection-header';
import { Scroll } from '../../core/services/scroll';
import { ResumeViewer } from '../resume-viewer/resume-viewer';
import { LinkdinViewer } from '../linkdin-viewer/linkdin-viewer';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, SelectionHeader, ResumeViewer, LinkdinViewer, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class Contact {
  readonly data = inject(PortfolioData);
  readonly scroll = inject(Scroll);
  lang = inject(LanguageService);
  showModalResume = false;
  showModalLinkdin = false;

  openCv(): void {
    this.showModalResume = true;
    document.body.style.overflow = 'hidden'; // bloque le scroll
  }

  openLinkdin(): void {
    this.showModalLinkdin = true;
    document.body.style.overflow = 'hidden'; // bloque le scroll
  }

  closeModal(): void {
    this.showModalResume = false;
    this.showModalLinkdin = false;
    document.body.style.overflow = '';
  }
}
