import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../../../shared/components';

interface QuickAction {
  label: string;
  icon: string;
  route: string;
  color: string;
}

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent],
  template: `
    <app-card [hasHeader]="true">
      <div card-header>
        <h3 class="quick-actions__title">Quick Actions</h3>
      </div>
      
      <div class="quick-actions__list">
        @for (action of actions; track action.label) {
          <a [routerLink]="action.route" class="quick-actions__item">
            <span class="quick-actions__icon" [style.background-color]="action.color + '20'" [style.color]="action.color">
              {{ action.icon }}
            </span>
            <span class="quick-actions__label">{{ action.label }}</span>
            <span class="quick-actions__arrow">→</span>
          </a>
        }
      </div>
    </app-card>
  `,
  styles: [`
    .quick-actions {
      &__title {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-color);
        margin: 0;
      }

      &__list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      &__item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        border-radius: 0.375rem;
        text-decoration: none;
        transition: background-color 0.2s;

        &:hover {
          background-color: var(--hover-bg);

          .quick-actions__arrow {
            opacity: 1;
            transform: translateX(0);
          }
        }
      }

      &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 0.375rem;
        font-size: 1rem;
      }

      &__label {
        flex: 1;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-color);
      }

      &__arrow {
        font-size: 0.875rem;
        color: var(--text-muted);
        opacity: 0;
        transform: translateX(-0.5rem);
        transition: opacity 0.2s, transform 0.2s;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickActionsComponent {
  actions: QuickAction[] = [
    { label: 'Create Project', icon: '📁', route: '/projects/new', color: '#3b82f6' },
    { label: 'Add Team Member', icon: '👤', route: '/team/invite', color: '#10b981' },
    { label: 'Generate Report', icon: '📊', route: '/reports/new', color: '#8b5cf6' },
    { label: 'Schedule Meeting', icon: '📅', route: '/calendar/new', color: '#f59e0b' },
    { label: 'Upload Files', icon: '📤', route: '/files/upload', color: '#ef4444' }
  ];
}
