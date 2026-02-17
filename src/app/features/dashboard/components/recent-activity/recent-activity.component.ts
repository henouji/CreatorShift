import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, AvatarComponent, BadgeComponent } from '../../../../shared/components';
import { TimeAgoPipe } from '../../../../shared/pipes';

interface Activity {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  target: string;
  timestamp: Date;
  type: 'create' | 'update' | 'delete' | 'comment';
}

@Component({
  selector: 'app-recent-activity',
  standalone: true,
  imports: [CommonModule, CardComponent, AvatarComponent, BadgeComponent, TimeAgoPipe],
  template: `
    <app-card [hasHeader]="true">
      <div card-header class="activity__header">
        <h3 class="activity__title">Recent Activity</h3>
        <button class="activity__view-all">View all</button>
      </div>
      
      <div class="activity__list">
        @for (activity of activities; track activity.id) {
          <div class="activity__item">
            <app-avatar 
              [name]="activity.user.name" 
              [src]="activity.user.avatar"
              size="sm"
            />
            <div class="activity__content">
              <p class="activity__description">
                <strong>{{ activity.user.name }}</strong>
                {{ activity.action }}
                <span class="activity__target">{{ activity.target }}</span>
              </p>
              <span class="activity__time">{{ activity.timestamp | timeAgo }}</span>
            </div>
            <app-badge [variant]="getBadgeVariant(activity.type)" size="sm">
              {{ activity.type }}
            </app-badge>
          </div>
        }
      </div>
    </app-card>
  `,
  styles: [`
    .activity {
      &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      &__title {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-color);
        margin: 0;
      }

      &__view-all {
        background: none;
        border: none;
        font-size: 0.8125rem;
        color: var(--primary-color);
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }

      &__list {
        display: flex;
        flex-direction: column;
      }

      &__item {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0.875rem 0;
        border-bottom: 1px solid var(--border-color);

        &:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        &:first-child {
          padding-top: 0;
        }
      }

      &__content {
        flex: 1;
        min-width: 0;
      }

      &__description {
        font-size: 0.875rem;
        color: var(--text-color);
        margin: 0 0 0.25rem;
        line-height: 1.4;

        strong {
          font-weight: 600;
        }
      }

      &__target {
        color: var(--primary-color);
        font-weight: 500;
      }

      &__time {
        font-size: 0.75rem;
        color: var(--text-muted);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentActivityComponent {
  activities: Activity[] = [
    {
      id: '1',
      user: { name: 'John Doe' },
      action: 'created a new project',
      target: 'Website Redesign',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      type: 'create'
    },
    {
      id: '2',
      user: { name: 'Jane Smith' },
      action: 'commented on',
      target: 'Marketing Campaign',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: 'comment'
    },
    {
      id: '3',
      user: { name: 'Mike Johnson' },
      action: 'updated task in',
      target: 'Mobile App',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      type: 'update'
    },
    {
      id: '4',
      user: { name: 'Sarah Wilson' },
      action: 'deleted file from',
      target: 'Old Backups',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      type: 'delete'
    }
  ];

  getBadgeVariant(type: Activity['type']): 'success' | 'info' | 'danger' | 'warning' {
    const variants: Record<Activity['type'], 'success' | 'info' | 'danger' | 'warning'> = {
      create: 'success',
      update: 'info',
      delete: 'danger',
      comment: 'warning'
    };
    return variants[type];
  }
}
