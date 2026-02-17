import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="badgeClasses">
      <ng-content></ng-content>
      @if (removable) {
        <button 
          class="badge__remove" 
          (click)="remove($event)"
          aria-label="Remove"
        >
          ✕
        </button>
      }
    </span>
  `,
  styles: [`
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      font-weight: 500;
      border-radius: 9999px;
      white-space: nowrap;

      &--sm {
        padding: 0.125rem 0.5rem;
        font-size: 0.75rem;
      }

      &--md {
        padding: 0.25rem 0.625rem;
        font-size: 0.8125rem;
      }

      &--lg {
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
      }

      &--primary {
        background-color: var(--primary-bg);
        color: var(--primary-color);
      }

      &--secondary {
        background-color: var(--secondary-bg);
        color: var(--secondary-color);
      }

      &--success {
        background-color: var(--success-bg);
        color: var(--success-color);
      }

      &--danger {
        background-color: var(--danger-bg);
        color: var(--danger-color);
      }

      &--warning {
        background-color: var(--warning-bg);
        color: var(--warning-color);
      }

      &--info {
        background-color: var(--info-bg);
        color: var(--info-color);
      }

      &--dot::before {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background-color: currentColor;
      }

      &__remove {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1rem;
        height: 1rem;
        margin-left: 0.125rem;
        padding: 0;
        background: none;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 0.625rem;
        opacity: 0.7;
        transition: opacity 0.2s, background-color 0.2s;

        &:hover {
          opacity: 1;
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'primary';
  @Input() size: BadgeSize = 'md';
  @Input() removable = false;
  @Input() showDot = false;

  @Output() removed = new EventEmitter<void>();

  get badgeClasses(): string {
    const classes = ['badge', `badge--${this.variant}`, `badge--${this.size}`];
    
    if (this.showDot) {
      classes.push('badge--dot');
    }
    
    return classes.join(' ');
  }

  remove(event: MouseEvent): void {
    event.stopPropagation();
    this.removed.emit();
  }
}
