import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-wrapper" [class]="wrapperClasses">
      <div [class]="spinnerClasses"></div>
      @if (message) {
        <span class="spinner-wrapper__message">{{ message }}</span>
      }
    </div>
  `,
  styles: [`
    .spinner-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;

      &--fullscreen {
        position: fixed;
        inset: 0;
        background-color: rgba(var(--overlay-rgb), 0.5);
        z-index: 9999;
      }

      &--inline {
        display: inline-flex;
        flex-direction: row;
      }

      &__message {
        font-size: 0.875rem;
        color: var(--text-muted);
      }
    }

    .spinner {
      border-radius: 50%;
      border-style: solid;
      border-color: var(--spinner-track);
      border-top-color: var(--primary-color);
      animation: spin 0.8s linear infinite;

      &--sm {
        width: 1rem;
        height: 1rem;
        border-width: 2px;
      }

      &--md {
        width: 1.5rem;
        height: 1.5rem;
        border-width: 2px;
      }

      &--lg {
        width: 2rem;
        height: 2rem;
        border-width: 3px;
      }

      &--xl {
        width: 3rem;
        height: 3rem;
        border-width: 4px;
      }
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
  @Input() size: SpinnerSize = 'md';
  @Input() message?: string;
  @Input() fullscreen = false;
  @Input() inline = false;

  get wrapperClasses(): string {
    const classes = ['spinner-wrapper'];

    if (this.fullscreen) {
      classes.push('spinner-wrapper--fullscreen');
    }

    if (this.inline) {
      classes.push('spinner-wrapper--inline');
    }

    return classes.join(' ');
  }

  get spinnerClasses(): string {
    return `spinner spinner--${this.size}`;
  }
}
