import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section-header" [class.centered]="centered" [class.light]="light">
      <span class="section-label" *ngIf="label">{{ label }}</span>
      <h2 class="section-title">{{ title }}</h2>
      <p class="section-subtitle" *ngIf="subtitle">{{ subtitle }}</p>
    </div>
  `,
  styles: [`
    .section-header {
      margin-bottom: 3rem;

      &.centered {
        text-align: center;

        .section-subtitle {
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
      }

      &.light {
        .section-title,
        .section-subtitle,
        .section-label {
          color: white;
        }

        .section-label {
          background: rgba(255, 255, 255, 0.2);
        }
      }
    }

    .section-label {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: var(--primary-light);
      color: var(--primary);
      border-radius: 2rem;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .section-title {
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
      line-height: 1.2;
    }

    .section-subtitle {
      font-size: 1.125rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionHeaderComponent {
  @Input() label?: string;
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
  @Input() centered = true;
  @Input() light = false;
}
