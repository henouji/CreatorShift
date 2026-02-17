import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastContainerComponent } from '../../../shared/components';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ToastContainerComponent],
  template: `
    <div class="auth-layout">
      <div class="auth-layout__container">
        <div class="auth-layout__brand">
          <a routerLink="/" class="auth-layout__logo">
            <span class="auth-layout__logo-text">Automation</span>
          </a>
        </div>
        
        <div class="auth-layout__content">
          <router-outlet />
        </div>
        
        <div class="auth-layout__footer">
          <span>© {{ currentYear }} Automation. All rights reserved.</span>
        </div>
      </div>
      
      <div class="auth-layout__illustration">
        <div class="auth-layout__illustration-content">
          <h2>Welcome to Automation</h2>
          <p>Streamline your workflow with our powerful automation tools.</p>
        </div>
      </div>
      
      <app-toast-container />
    </div>
  `,
  styles: [`
    .auth-layout {
      display: flex;
      min-height: 100vh;
      background-color: var(--body-bg);

      &__container {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 480px;
        padding: 2rem;

        @media (min-width: 1024px) {
          padding: 3rem;
        }
      }

      &__brand {
        margin-bottom: 2rem;
      }

      &__logo {
        display: inline-flex;
        text-decoration: none;
      }

      &__logo-text {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--primary-color);
      }

      &__content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      &__footer {
        margin-top: 2rem;
        font-size: 0.8125rem;
        color: var(--text-muted);
      }

      &__illustration {
        display: none;
        flex: 1;
        background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
        padding: 3rem;

        @media (min-width: 1024px) {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      &__illustration-content {
        max-width: 400px;
        text-align: center;
        color: white;

        h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        p {
          font-size: 1.125rem;
          opacity: 0.9;
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthLayoutComponent {
  currentYear = new Date().getFullYear();
}
