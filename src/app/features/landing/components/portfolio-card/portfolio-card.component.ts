import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioItem } from '../../models/site-config.model';

@Component({
  selector: 'app-portfolio-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="portfolio-card" (click)="onCardClick()">
      <div class="portfolio-image-wrapper">
        <img [src]="item.image" [alt]="item.title" class="portfolio-image" loading="lazy">
        <div class="portfolio-overlay">
          <div class="overlay-content">
            <span class="portfolio-category">{{ item.category }}</span>
            <h3 class="portfolio-title">{{ item.title }}</h3>
            <p class="portfolio-client">{{ item.client }}</p>
            <button class="view-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
                <path d="M11 8v6M8 11h6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="portfolio-info">
        <h4 class="portfolio-info-title">{{ item.title }}</h4>
        <span class="portfolio-info-category">{{ item.category }}</span>
      </div>
    </div>
  `,
  styles: [`
    .portfolio-card {
      cursor: pointer;
      border-radius: 1rem;
      overflow: hidden;
      background: white;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      transition: all 0.4s ease;

      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);

        .portfolio-image {
          transform: scale(1.1);
        }

        .portfolio-overlay {
          opacity: 1;
        }

        .overlay-content {
          transform: translateY(0);
        }
      }
    }

    .portfolio-image-wrapper {
      position: relative;
      aspect-ratio: 4 / 3;
      overflow: hidden;
    }

    .portfolio-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }

    .portfolio-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(26, 26, 46, 0.95) 0%, rgba(26, 26, 46, 0.7) 50%, transparent 100%);
      opacity: 0;
      transition: opacity 0.4s ease;
      display: flex;
      align-items: flex-end;
      padding: 1.5rem;
    }

    .overlay-content {
      transform: translateY(20px);
      transition: transform 0.4s ease;
      width: 100%;
    }

    .portfolio-category {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: var(--primary);
      color: white;
      border-radius: 2rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 0.75rem;
    }

    .portfolio-title {
      color: white;
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
    }

    .portfolio-client {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.875rem;
    }

    .view-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: white;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;

      svg {
        width: 20px;
        height: 20px;
        stroke: var(--text-primary);
      }

      &:hover {
        background: var(--primary);
        transform: scale(1.1);

        svg {
          stroke: white;
        }
      }
    }

    .portfolio-info {
      padding: 1.25rem;
    }

    .portfolio-info-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .portfolio-info-category {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioCardComponent {
  @Input({ required: true }) item!: PortfolioItem;
  @Output() cardClick = new EventEmitter<PortfolioItem>();

  onCardClick() {
    this.cardClick.emit(this.item);
  }
}
