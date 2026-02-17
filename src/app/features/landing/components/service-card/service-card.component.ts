import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceItem } from '../../models/site-config.model';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="service-card" [class.featured]="featured">
      <div class="service-icon-wrapper">
        <div class="service-icon">
          <ng-container [ngSwitch]="service.icon">
            <svg *ngSwitchCase="'videocam'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M23 7l-7 5 7 5V7z"/>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
            <svg *ngSwitchCase="'share_social'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            <svg *ngSwitchCase="'brush'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/>
              <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/>
            </svg>
            <svg *ngSwitchCase="'code_slash'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="16,18 22,12 16,6"/>
              <polyline points="8,6 2,12 8,18"/>
            </svg>
            <svg *ngSwitchDefault viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
          </ng-container>
        </div>
      </div>
      
      <h3 class="service-title">{{ service.title }}</h3>
      <p class="service-description">{{ service.description }}</p>
      
      <ul class="service-features">
        @for (feature of service.features; track feature) {
          <li class="service-feature">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            {{ feature }}
          </li>
        }
      </ul>
      
      <a href="#contact" class="service-link">
        Learn more
        <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
    </div>
  `,
  styles: [`
    .service-card {
      background: white;
      border-radius: 1.5rem;
      padding: 2rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      transition: all 0.4s ease;
      border: 1px solid var(--border-color);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--primary), #e94560);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.4s ease;
      }

      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

        &::before {
          transform: scaleX(1);
        }

        .service-icon-wrapper {
          transform: scale(1.1);
        }

        .service-link {
          color: var(--primary);

          .arrow-icon {
            transform: translateX(4px);
          }
        }
      }

      &.featured {
        background: linear-gradient(135deg, var(--primary) 0%, #e94560 100%);
        color: white;

        .service-title,
        .service-description,
        .service-feature {
          color: white;
        }

        .service-icon-wrapper {
          background: rgba(255, 255, 255, 0.2);
        }

        .service-icon svg {
          stroke: white;
        }

        .check-icon {
          stroke: white;
        }

        .service-link {
          color: white;
        }
      }
    }

    .service-icon-wrapper {
      width: 70px;
      height: 70px;
      border-radius: 1rem;
      background: var(--primary-light);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      transition: transform 0.4s ease;
    }

    .service-icon {
      width: 32px;
      height: 32px;

      svg {
        width: 100%;
        height: 100%;
        stroke: var(--primary);
      }
    }

    .service-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .service-description {
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }

    .service-features {
      list-style: none;
      padding: 0;
      margin: 0 0 1.5rem 0;
    }

    .service-feature {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 0;
      color: var(--text-secondary);
      font-size: 0.95rem;
    }

    .check-icon {
      width: 16px;
      height: 16px;
      stroke: var(--primary);
      flex-shrink: 0;
    }

    .service-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-primary);
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      margin-top: auto;
    }

    .arrow-icon {
      width: 18px;
      height: 18px;
      transition: transform 0.3s ease;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceCardComponent {
  @Input({ required: true }) service!: ServiceItem;
  @Input() featured = false;
}
