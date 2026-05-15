import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { PortfolioData } from '../../../../core/services/portfolio-data';
import { Scroll } from '../../../../core/services/scroll';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer>
      <div class="footer-copy">
        © {{ currentYear }} {{ dataService.profile().name }} — {{ 'profile.title' | translate }}
      </div>
      <div class="footer-links">
        <a class="footer-link" (click)="scrollService.scrollToTop()">{{ 'footer.title' | translate }} <i class="fa-solid fa-chevron-up"></i></a>
        <a class="footer-link" href="https://{{ dataService.profile().github }}" target="_blank"
          >GitHub</a
        >
      </div>
    </footer>
  `,
  styles: [
    `
      footer {
        padding: 2rem 3rem;
        border-top: 1px solid rgba(0, 212, 255, 0.08);
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        z-index: 1;
      }
      .footer-copy {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.65rem;
        color: var(--c-muted);
      }
      .footer-links {
        display: flex;
        gap: 1.5rem;
      }
      .footer-link {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.65rem;
        color: var(--c-muted);
        text-decoration: none;
        cursor: pointer;
        transition: color 0.3s;
        &:hover {
          color: var(--c-blue);
        }
      }
      @media (max-width: 768px) {
        footer {
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }
      }
    `,
  ],
})
export class Footer {
  readonly dataService = inject(PortfolioData);
  readonly scrollService = inject(Scroll);
  currentYear = new Date().getFullYear();
  lang = inject(LanguageService);
}
