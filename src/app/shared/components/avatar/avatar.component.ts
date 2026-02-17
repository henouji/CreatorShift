import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="avatarClasses">
      @if (src) {
        <img 
          [src]="src" 
          [alt]="alt" 
          class="avatar__image"
          (error)="onImageError()"
        />
      } @else {
        <span class="avatar__initials">{{ getInitials() }}</span>
      }
      @if (showStatus) {
        <span class="avatar__status" [class]="'avatar__status--' + status"></span>
      }
    </div>
  `,
  styles: [`
    .avatar {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: var(--avatar-bg);
      color: var(--avatar-text);
      font-weight: 500;
      overflow: hidden;

      &--xs {
        width: 1.5rem;
        height: 1.5rem;
        font-size: 0.625rem;
      }

      &--sm {
        width: 2rem;
        height: 2rem;
        font-size: 0.75rem;
      }

      &--md {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 0.875rem;
      }

      &--lg {
        width: 3rem;
        height: 3rem;
        font-size: 1rem;
      }

      &--xl {
        width: 4rem;
        height: 4rem;
        font-size: 1.25rem;
      }

      &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &__initials {
        text-transform: uppercase;
      }

      &__status {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 25%;
        height: 25%;
        min-width: 8px;
        min-height: 8px;
        border-radius: 50%;
        border: 2px solid var(--card-bg);

        &--online {
          background-color: var(--success-color);
        }

        &--offline {
          background-color: var(--text-muted);
        }

        &--busy {
          background-color: var(--danger-color);
        }

        &--away {
          background-color: var(--warning-color);
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  @Input() src?: string;
  @Input() alt = '';
  @Input() name = '';
  @Input() size: AvatarSize = 'md';
  @Input() showStatus = false;
  @Input() status: 'online' | 'offline' | 'busy' | 'away' = 'offline';

  private imageError = false;

  get avatarClasses(): string {
    return `avatar avatar--${this.size}`;
  }

  getInitials(): string {
    if (!this.name) return '?';
    
    const parts = this.name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  onImageError(): void {
    this.imageError = true;
    this.src = undefined;
  }
}
