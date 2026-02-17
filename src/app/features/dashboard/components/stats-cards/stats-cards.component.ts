import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../shared/components';

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: 'primary' | 'success' | 'warning' | 'info';
}

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="stats-cards">
      @for (stat of stats; track stat.title) {
        <app-card variant="outlined" class="stats-card" [class]="'stats-card--' + stat.color">
          <div class="stats-card__content">
            <div class="stats-card__info">
              <span class="stats-card__title">{{ stat.title }}</span>
              <span class="stats-card__value">{{ stat.value }}</span>
              <span 
                class="stats-card__change" 
                [class.stats-card__change--positive]="stat.change >= 0"
                [class.stats-card__change--negative]="stat.change < 0"
              >
                {{ stat.change >= 0 ? '↑' : '↓' }} {{ stat.change | number:'1.1-1' }}% from last month
              </span>
            </div>
            <div class="stats-card__icon" [class]="'stats-card__icon--' + stat.color">
              {{ stat.icon }}
            </div>
          </div>
        </app-card>
      }
    </div>
  `,
  styles: [`
    .stats-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1rem;
    }

    .stats-card {
      &__content {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
      }

      &__info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      &__title {
        font-size: 0.8125rem;
        font-weight: 500;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.025em;
      }

      &__value {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--text-color);
        line-height: 1.2;
      }

      &__change {
        font-size: 0.75rem;
        margin-top: 0.25rem;

        &--positive {
          color: var(--success-color);
        }

        &--negative {
          color: var(--danger-color);
        }
      }

      &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3rem;
        height: 3rem;
        border-radius: 0.5rem;
        font-size: 1.5rem;

        &--primary {
          background-color: var(--primary-bg);
        }

        &--success {
          background-color: var(--success-bg);
        }

        &--warning {
          background-color: var(--warning-bg);
        }

        &--info {
          background-color: var(--info-bg);
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsCardsComponent {
  stats: StatCard[] = [
    { title: 'Total Revenue', value: '$45,231.89', change: 20.1, icon: '💰', color: 'primary' },
    { title: 'Active Users', value: '2,350', change: 15.3, icon: '👥', color: 'success' },
    { title: 'Pending Tasks', value: '12', change: -5.2, icon: '📋', color: 'warning' },
    { title: 'Completed', value: '573', change: 12.5, icon: '✅', color: 'info' }
  ];
}
