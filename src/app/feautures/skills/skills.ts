import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioData } from '../../core/services/portfolio-data';
import { SelectionHeader } from '../../shared/components/selection-header/selection-header';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';


@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SelectionHeader, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills">
      <div class="section-inner">
        <app-section-header
          eyebrow="{{ 'skills.subtitle' | translate }}"
          title="{{ 'skills.title' | translate }}"
          appReveal
        />

        <div class="skills-grid" appReveal>
          @for (skill of data.skills(); track skill.id) {
            <div class="skill-card" appTilt>
              <!-- <span  class="skill-icon">{{ skill.icon }}</span> -->
              <span class="skill-icon">
                <img [src]="'assets/' + skill.icon" [alt]="skill.name" class="skill-icon-img" />
              </span>
              <div class="skill-name">{{ skill.name }}</div>
              <div class="skill-level">
                <div
                  class="skill-level-fill"
                  [style.width.%]="skill.level"
                  [style.background]="getSkillGradient(skill.level)"
                ></div>
              </div>
              <div class="skill-pct">{{ skill.level }}%</div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      #skills {
        background: var(--c-bg);
        position: relative;
        z-index: 1;
      }
      .section-inner {
        max-width: 1200px;
        margin: 0 auto;
        padding: 6rem 3rem;
      }
      .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        gap: 1.2rem;
      }
      .skill-card {
        background: var(--glow-cart-project);
        border: 1px solid rgba(0, 212, 255, 0.12);
        border-radius: 12px;
        padding: 1.5rem 1rem;
        text-align: center;
        position: relative;
        overflow: hidden;
        transition: all 0.4s;
        cursor: default;
        transform-style: preserve-3d;
        &::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 212, 255, 0.05), rgba(139, 92, 246, 0.05));
          opacity: 0;
          transition: opacity 0.3s;
        }
        &:hover {
          border-color: rgba(0, 212, 255, 0.4);
          box-shadow:
            0 20px 60px rgba(0, 212, 255, 0.15),
            0 0 30px rgba(139, 92, 246, 0.1);
          &::before {
            opacity: 1;
          }
          .skill-icon {
            filter: drop-shadow(0 0 16px rgba(0, 212, 255, 0.7));
          }
        }
      }
      .skill-icon {
        font-size: 2.5rem;
        margin-bottom: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.4));
        transition: filter 0.3s;

        .skill-icon-img {
          width: 2.5rem;
          height: 2.5rem;
          object-fit: contain;
          border-radius: 20px;
        }
      }
      .skill-name {
        font-family: 'Orbitron', monospace;
        font-size: 0.65rem;
        color: var(--c-cyan);
        letter-spacing: 0.08em;
        margin-bottom: 0.6rem;
      }
      .skill-level {
        height: 2px;
        background: var(--c-bg);
        border-radius: 1px;
        overflow: hidden;
        margin-bottom: 0.3rem;
      }
      .skill-level-fill {
        height: 100%;
        border-radius: 1px;
        background: linear-gradient(90deg, var(--c-blue), var(--c-cyan));
        box-shadow: 0 0 8px var(--c-blue);
        transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .skill-pct {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.55rem;
        color: var(--c-text);
      }
      @media (max-width: 900px) {
        .section-inner {
          padding: 4rem 1.5rem;
        }
      }
    `,
  ],
})
export class Skills {
  readonly data = inject(PortfolioData);
   lang = inject(LanguageService);

  getSkillGradient(level: number): string {
    if (level < 40) {
      return 'var(--skill-low)';
    }

    if (level < 70) {
      return 'var(--skill-medium)';
    }

    if (level < 90) {
      return 'var(--skill-good)';
    }

    return 'var(--skill-expert)';
  }
}
