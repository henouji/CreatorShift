import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent, ButtonComponent } from '../../shared/components';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, ButtonComponent],
  template: `
    <div class="profile">
      <h1 class="profile__title">Profile</h1>
      <p class="profile__subtitle">Manage your profile information</p>
      
      <app-card>
        <div class="profile__content">
          <p>Profile page content coming soon...</p>
          <app-button routerLink="/dashboard">Back to Dashboard</app-button>
        </div>
      </app-card>
    </div>
  `,
  styles: [`
    .profile {
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
export class ProfileComponent {}
