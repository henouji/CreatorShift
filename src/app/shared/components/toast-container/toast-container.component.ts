import { Component, Input, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Toast } from '../../../core/services/notification.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of notificationService.toasts(); track toast.id) {
        <div [class]="'toast toast--' + toast.type" role="alert">
          <div class="toast__icon">
            {{ getIcon(toast.type) }}
          </div>
          <div class="toast__content">
            <strong class="toast__title">{{ toast.title }}</strong>
            <p class="toast__message">{{ toast.message }}</p>
          </div>
          @if (toast.dismissible) {
            <button 
              class="toast__close" 
              (click)="notificationService.dismiss(toast.id)"
              aria-label="Dismiss"
            >
              ✕
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 24rem;
    }

    .toast {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 1rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      animation: slideIn 0.3s ease-out;
      background-color: var(--card-bg);
      border: 1px solid var(--border-color);

      &--success {
        border-left: 4px solid var(--success-color);
      }

      &--error {
        border-left: 4px solid var(--danger-color);
      }

      &--warning {
        border-left: 4px solid var(--warning-color);
      }

      &--info {
        border-left: 4px solid var(--info-color);
      }

      &__icon {
        flex-shrink: 0;
        font-size: 1.25rem;
      }

      &__content {
        flex: 1;
        min-width: 0;
      }

      &__title {
        display: block;
        font-weight: 600;
        color: var(--text-color);
        margin-bottom: 0.25rem;
      }

      &__message {
        margin: 0;
        font-size: 0.875rem;
        color: var(--text-muted);
      }

      &__close {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
        background: none;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        color: var(--text-muted);
        transition: color 0.2s, background-color 0.2s;

        &:hover {
          color: var(--text-color);
          background-color: var(--hover-bg);
        }
      }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastContainerComponent {
  readonly notificationService = inject(NotificationService);

  getIcon(type: Toast['type']): string {
    const icons: Record<Toast['type'], string> = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };
    return icons[type];
  }
}
