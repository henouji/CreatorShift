import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent, ButtonComponent } from '../../shared/components';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, ButtonComponent],
  template: `
    <div class="settings">
      <h1 class="settings__title">Settings</h1>
      <p class="settings__subtitle">Configure your application preferences</p>
      
      <app-card>
        <div class="settings__content">
          <p>Settings page content coming soon...</p>
          <app-button routerLink="/dashboard">Back to Dashboard</app-button>
        </div>
      </app-card>
    </div>
  `,
  styles: [`
    .settings {
      &__title {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-color);
        margin: 0 0 0.5rem;
      }

      &__subtitle {
        font-size: 0.9375rem;
        color: var(--text-muted);
        margin: 0 0 1.5rem;
      }

      &__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 2rem;
        text-align: center;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {}
