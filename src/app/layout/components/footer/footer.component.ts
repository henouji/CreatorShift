import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="footer__content">
        <div class="footer__left">
          <span class="footer__copyright">
            © {{ currentYear }} Automation. All rights reserved.
          </span>
        </div>
        
        <div class="footer__center">
          <nav class="footer__nav">
            <a routerLink="/privacy" class="footer__link">Privacy Policy</a>
            <span class="footer__divider">•</span>
            <a routerLink="/terms" class="footer__link">Terms of Service</a>
            <span class="footer__divider">•</span>
            <a routerLink="/support" class="footer__link">Support</a>
          </nav>
        </div>
        
        <div class="footer__right">
          <span class="footer__version">v1.0.0</span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      padding: 1rem 1.5rem;
      background-color: var(--footer-bg);
      border-top: 1px solid var(--border-color);

      &__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 1400px;
        margin: 0 auto;
        flex-wrap: wrap;
        gap: 1rem;
      }

      &__left,
      &__right {
        display: flex;
        align-items: center;
      }

      &__center {
        display: flex;
        justify-content: center;
      }

      &__copyright {
        font-size: 0.8125rem;
        color: var(--text-muted);
      }

      &__nav {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      &__link {
        font-size: 0.8125rem;
        color: var(--text-muted);
        text-decoration: none;
        transition: color 0.2s;

        &:hover {
          color: var(--primary-color);
        }
      }

      &__divider {
        color: var(--border-color);
        font-size: 0.625rem;
      }

      &__version {
        font-size: 0.75rem;
        color: var(--text-muted);
        padding: 0.25rem 0.5rem;
        background-color: var(--hover-bg);
        border-radius: 0.25rem;
      }
    }

    @media (max-width: 640px) {
      .footer {
        &__content {
          flex-direction: column;
          text-align: center;
        }

        &__left,
        &__right {
          justify-content: center;
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
