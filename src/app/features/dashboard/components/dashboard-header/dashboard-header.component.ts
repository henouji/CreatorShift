import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-header">
      <div class="dashboard-header__content">
        <h1 class="dashboard-header__title">
          @if (authService.currentUser(); as user) {
            Welcome back, {{ user.firstName }}! 👋
          } @else {
            Welcome to Dashboard
          }
        </h1>
        <p class="dashboard-header__subtitle">
          Here's what's happening with your projects today.
        </p>
      </div>
      
      <div class="dashboard-header__actions">
        <div class="dashboard-header__date">
          <span class="dashboard-header__date-label">Today</span>
          <span class="dashboard-header__date-value">{{ today | date:'EEEE, MMMM d, y' }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1.5rem;

      &__content {
        flex: 1;
        min-width: 200px;
      }

      &__title {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-color);
        margin: 0 0 0.5rem;
      }

      &__subtitle {
        font-size: 0.9375rem;
        color: var(--text-muted);
        margin: 0;
      }

      &__actions {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      &__date {
        text-align: right;
      }

      &__date-label {
        display: block;
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      &__date-value {
        font-size: 0.875rem;
        color: var(--text-color);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeaderComponent {
  readonly authService = inject(AuthService);
  readonly today = new Date();
}
