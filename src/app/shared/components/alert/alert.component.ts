import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="alertClasses" role="alert">
      <div class="alert__icon">
        {{ getIcon() }}
      </div>
      <div class="alert__content">
        @if (title) {
          <strong class="alert__title">{{ title }}</strong>
        }
        <p class="alert__message">{{ message }}</p>
      </div>
      @if (dismissible) {
        <button 
          class="alert__close" 
          (click)="dismiss()"
          aria-label="Dismiss alert"
        >
          ✕
        </button>
      }
    </div>
  `,
  styleUrl: './alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent {
  @Input() type: AlertType = 'info';
  @Input() title?: string;
  @Input() message = '';
  @Input() dismissible = false;

  @Output() dismissed = new EventEmitter<void>();

  get alertClasses(): string {
    return `alert alert--${this.type}`;
  }

  getIcon(): string {
    const icons: Record<AlertType, string> = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };
    return icons[this.type];
  }

  dismiss(): void {
    this.dismissed.emit();
  }
}
