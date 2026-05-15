import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="section-header" [class.centered]="centered">
      <div class="section-eyebrow">{{ eyebrow }}</div>
      <h2 class="section-title" [innerHTML]="title"></h2>
    </div>
  `,
  styles: [`
    .section-header { margin-bottom: 3.5rem; }
    .section-header.centered { text-align: center; }
    .section-header.centered .section-eyebrow { justify-content: center; }
    .section-eyebrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem;
      color: var(--c-cyan);
      letter-spacing: 0.25em;
      text-transform: uppercase;
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .section-eyebrow::before {
      content: '';
      display: inline-block;
      width: 30px;
      height: 1px;
      background: var(--c-cyan);
      box-shadow: var(--glow-cyan);
    }
    .section-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(1.8rem, 3vw, 3rem);
      font-weight: 700;
      background: linear-gradient(135deg, var(--c-text) 0%, var(--c-blue) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1.15;
    }
  `],
})

export class SelectionHeader {
   @Input({ required: true }) eyebrow = '';
  @Input({ required: true }) title = '';
  @Input() centered = false;
}
