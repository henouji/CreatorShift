import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [class]="buttonClasses"
      (click)="handleClick($event)"
    >
      @if (loading) {
        <span class="button__spinner"></span>
      }
      @if (icon && iconPosition === 'left') {
        <span class="button__icon button__icon--left">{{ icon }}</span>
      }
      <span class="button__content">
        <ng-content></ng-content>
      </span>
      @if (icon && iconPosition === 'right') {
        <span class="button__icon button__icon--right">{{ icon }}</span>
      }
    </button>
  `,
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    const classes = [
      'button',
      `button--${this.variant}`,
      `button--${this.size}`
    ];

    if (this.fullWidth) {
      classes.push('button--full-width');
    }

    if (this.loading) {
      classes.push('button--loading');
    }

    if (this.disabled) {
      classes.push('button--disabled');
    }

    return classes.join(' ');
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.buttonClick.emit(event);
    }
  }
}
