import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../shared/components';

@Component({
  selector: 'app-chart-widget',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <app-card [hasHeader]="true">
      <div card-header class="chart__header">
        <div class="chart__header-left">
          <h3 class="chart__title">Performance Overview</h3>
          <p class="chart__subtitle">Monthly revenue and growth metrics</p>
        </div>
        <div class="chart__header-right">
          <select class="chart__select">
            <option>Last 7 days</option>
            <option selected>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </div>
      </div>
      
      <div class="chart__content">
        <div class="chart__placeholder">
          <div class="chart__bars">
            @for (bar of chartData; track bar.label) {
              <div class="chart__bar-wrapper">
                <div 
                  class="chart__bar" 
                  [style.height.%]="bar.value"
                  [class.chart__bar--highlight]="bar.highlight"
                >
                  <span class="chart__bar-value">{{ bar.value }}%</span>
                </div>
                <span class="chart__bar-label">{{ bar.label }}</span>
              </div>
            }
          </div>
        </div>
        
        <div class="chart__legend">
          <div class="chart__legend-item">
            <span class="chart__legend-color chart__legend-color--primary"></span>
            <span>Revenue</span>
          </div>
          <div class="chart__legend-item">
            <span class="chart__legend-color chart__legend-color--secondary"></span>
            <span>Target</span>
          </div>
        </div>
      </div>
    </app-card>
  `,
  styles: [`
    .chart {
      &__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1rem;
      }

      &__header-left {
        flex: 1;
        min-width: 200px;
      }

      &__title {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-color);
        margin: 0 0 0.25rem;
      }

      &__subtitle {
        font-size: 0.8125rem;
        color: var(--text-muted);
        margin: 0;
      }

      &__select {
        padding: 0.375rem 0.75rem;
        font-size: 0.8125rem;
        border: 1px solid var(--border-color);
        border-radius: 0.375rem;
        background-color: var(--input-bg);
        color: var(--text-color);
        cursor: pointer;

        &:focus {
          outline: none;
          border-color: var(--primary-color);
        }
      }

      &__content {
        margin-top: 1rem;
      }

      &__placeholder {
        height: 240px;
        display: flex;
        align-items: flex-end;
      }

      &__bars {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        padding-bottom: 1.5rem;
      }

      &__bar-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        height: 100%;
      }

      &__bar {
        width: 60%;
        max-width: 40px;
        background: linear-gradient(180deg, var(--primary-color) 0%, var(--primary-hover) 100%);
        border-radius: 0.25rem 0.25rem 0 0;
        position: relative;
        transition: height 0.3s ease-out;
        margin-top: auto;

        &--highlight {
          background: linear-gradient(180deg, var(--success-color) 0%, #059669 100%);
        }
      }

      &__bar-value {
        position: absolute;
        top: -1.5rem;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--text-color);
        white-space: nowrap;
      }

      &__bar-label {
        margin-top: 0.5rem;
        font-size: 0.75rem;
        color: var(--text-muted);
      }

      &__legend {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid var(--border-color);
      }

      &__legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.8125rem;
        color: var(--text-muted);
      }

      &__legend-color {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 0.125rem;

        &--primary {
          background-color: var(--primary-color);
        }

        &--secondary {
          background-color: var(--success-color);
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartWidgetComponent {
  chartData = [
    { label: 'Jan', value: 45, highlight: false },
    { label: 'Feb', value: 62, highlight: false },
    { label: 'Mar', value: 55, highlight: false },
    { label: 'Apr', value: 78, highlight: true },
    { label: 'May', value: 68, highlight: false },
    { label: 'Jun', value: 85, highlight: true },
    { label: 'Jul', value: 72, highlight: false }
  ];
}
