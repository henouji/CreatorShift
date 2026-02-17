import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { StatsCardsComponent } from '../stats-cards/stats-cards.component';
import { RecentActivityComponent } from '../recent-activity/recent-activity.component';
import { QuickActionsComponent } from '../quick-actions/quick-actions.component';
import { ChartWidgetComponent } from '../chart-widget/chart-widget.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DashboardHeaderComponent,
    StatsCardsComponent,
    RecentActivityComponent,
    QuickActionsComponent,
    ChartWidgetComponent
  ],
  template: `
    <div class="dashboard">
      <app-dashboard-header />
      
      <app-stats-cards />
      
      <div class="dashboard__grid">
        <div class="dashboard__main">
          <app-chart-widget />
          <app-recent-activity />
        </div>
        
        <aside class="dashboard__sidebar">
          <app-quick-actions />
        </aside>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      &__grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
        margin-top: 1.5rem;

        @media (min-width: 1024px) {
          grid-template-columns: 1fr 20rem;
        }
      }

      &__main {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        min-width: 0;
      }

      &__sidebar {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {}
