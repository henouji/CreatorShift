import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../shared/components';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  template: `
    <div class="not-found">
      <div class="not-found__content">
        <span class="not-found__code">404</span>
        <h1 class="not-found__title">Page not found</h1>
        <p class="not-found__description">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div class="not-found__actions">
          <app-button routerLink="/dashboard" variant="primary">
            Go to Dashboard
          </app-button>
          <app-button routerLink="/" variant="outline">
            Go Home
          </app-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .not-found {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
      background-color: var(--body-bg);

      &__content {
        text-align: center;
        max-width: 400px;
      }

      &__code {
        display: block;
        font-size: 6rem;
        font-weight: 700;
        color: var(--primary-color);
        line-height: 1;
        margin-bottom: 1rem;
      }

      &__title {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--text-color);
        margin: 0 0 0.75rem;
      }

      &__description {
        font-size: 0.9375rem;
        color: var(--text-muted);
        margin: 0 0 2rem;
      }

      &__actions {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {}
