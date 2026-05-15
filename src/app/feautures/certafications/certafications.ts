import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioData } from '../../core/services/portfolio-data';
import { SelectionHeader } from '../../shared/components/selection-header/selection-header';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule, SelectionHeader, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="certifications">
      <div class="section-inner">
        <app-section-header eyebrow="{{ 'education.title' | translate }}" title="{{ 'education.subtitle' | translate }}" appReveal />

        <div class="certs-grid" appReveal>
          @for (cert of data.certifications(); track cert.id) {
            <div class="cert-card">
              <div class="cert-badge" [ngClass]="'cb-' + cert.badgeVariant">
                <div class="cert-icon">
                  <img [src]="'assets/' + cert.icon" [alt]="cert.icon" class="cert-icon-img" />
                </div>
              </div>
              <div>
                <div class="cert-title">{{ cert.title | translate }}</div>
                <div class="cert-description">{{ cert.description | translate }}</div>
                <div class="cert-date">{{ cert.date | translate }}</div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      #certifications {
        background: var(--c-bg2);
        position: relative;
        z-index: 1;
      }
      .section-inner {
        max-width: 1200px;
        margin: 0 auto;
        padding: 6rem 3rem;
      }
      .certs-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.2rem;
      }
      .cert-card {
        background: var(--c-bg);
        border: 1px solid rgba(0, 212, 255, 0.12);
        border-radius: 12px;
        padding: 1.5rem;
        display: flex;
        gap: 1.2rem;
        align-items: flex-start;
        transition: all 0.3s;
        &:hover {
          border-color: rgba(0, 212, 255, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 15px 40px rgba(0, 212, 255, 0.08);
        }
      }
      .cert-badge {
        width: 48px;
        height: 48px;
        border-radius: 10px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
      }

      .cert-icon {
        width: 55px;
        height: 55px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .cert-icon-img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
      .cb-blue {
        background: rgba(0, 212, 255, 0.12);
        border: 1px solid rgba(0, 212, 255, 0.3);
      }
      .cb-purple {
        background: rgba(139, 92, 246, 0.12);
        border: 1px solid rgba(139, 92, 246, 0.3);
      }
      .cb-cyan {
        background: rgba(6, 255, 212, 0.08);
        border: 1px solid rgba(6, 255, 212, 0.2);
      }
      .cb-gold {
        background: rgba(255, 215, 0, 0.08);
        border: 1px solid rgba(255, 215, 0, 0.25);
      }
      .cert-title {
        font-family: 'Inter', system-ui, sans-serif;
        font-size: 0.75rem;
        color: var(--c-blue);
        font-weight: 700;
        margin-bottom: 0.3rem;
      }
      .cert-description {
        font-size: 0.8rem;
        color: var(--c-text);
        margin-bottom: 0.3rem;
      }
      .cert-date {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.65rem;
        color: var(--c-muted);
      }
      @media (max-width: 900px) {
        .section-inner {
          padding: 4rem 1.5rem;
        }
      }
    `,
  ],
})
export class Certifications {
  readonly data = inject(PortfolioData);
  lang = inject(LanguageService);
}
