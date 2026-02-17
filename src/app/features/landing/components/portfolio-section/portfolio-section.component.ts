import { Component, inject, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteConfigService } from '../../services/site-config.service';
import { SectionHeaderComponent } from '../section-header/section-header.component';
import { PortfolioCardComponent } from '../portfolio-card/portfolio-card.component';
import { PortfolioItem } from '../../models/site-config.model';

@Component({
  selector: 'app-portfolio-section',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, PortfolioCardComponent],
  template: `
    <section id="portfolio" class="portfolio-section">
      <div class="container">
        <app-section-header
          [title]="portfolio.sectionTitle"
          [subtitle]="portfolio.sectionSubtitle"
          [centered]="true">
        </app-section-header>
        
        <!-- Category Filter -->
        <div class="portfolio-filters">
          @for (category of portfolio.categories; track category) {
            <button 
              class="filter-btn" 
              [class.active]="activeCategory() === category"
              (click)="setCategory(category)">
              {{ category }}
            </button>
          }
        </div>
        
        <!-- Portfolio Grid -->
        <div class="portfolio-grid">
          @for (item of filteredItems(); track item.id; let i = $index) {
            <app-portfolio-card 
              [item]="item"
              (cardClick)="openPortfolioModal($event)"
              class="portfolio-item"
              [style.animation-delay]="i * 100 + 'ms'">
            </app-portfolio-card>
          }
        </div>
        
        <!-- View All Button -->
        <div class="portfolio-actions">
          <a href="#contact" class="btn btn-outline-dark btn-lg">
            View All Projects
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
      
      <!-- Portfolio Modal -->
      @if (selectedItem()) {
        <div class="portfolio-modal" (click)="closeModal()">
          <div class="modal-content" (click)="$event.stopPropagation()">
            <button class="modal-close" (click)="closeModal()">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <div class="modal-image">
              <img [src]="selectedItem()!.image" [alt]="selectedItem()!.title">
            </div>
            <div class="modal-info">
              <span class="modal-category">{{ selectedItem()!.category }}</span>
              <h3 class="modal-title">{{ selectedItem()!.title }}</h3>
              <p class="modal-client">Client: {{ selectedItem()!.client }}</p>
              <p class="modal-description">{{ selectedItem()!.description }}</p>
              <a href="#contact" class="btn btn-primary">Start Similar Project</a>
            </div>
          </div>
        </div>
      }
    </section>
  `,
  styles: [`
    .portfolio-section {
      padding: 100px 2rem;
      background: white;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
    }

    .portfolio-filters {
      display: flex;
      justify-content: center;
      gap: 0.75rem;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 0.75rem 1.5rem;
      border: 2px solid var(--border-color);
      background: white;
      border-radius: 2rem;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
      color: var(--text-secondary);

      &:hover {
        border-color: var(--primary);
        color: var(--primary);
      }

      &.active {
        background: var(--primary);
        border-color: var(--primary);
        color: white;
      }
    }

    .portfolio-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;

      @media (max-width: 968px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }

    .portfolio-item {
      opacity: 0;
      animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .portfolio-actions {
      text-align: center;
      margin-top: 3rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      border-radius: 0.75rem;
      font-weight: 600;
      font-size: 1rem;
      text-decoration: none;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .btn-lg {
      padding: 1rem 2rem;
    }

    .btn-outline-dark {
      background: transparent;
      border: 2px solid var(--text-primary);
      color: var(--text-primary);

      &:hover {
        background: var(--text-primary);
        color: white;
      }
    }

    .btn-primary {
      background: var(--primary);
      color: white;
      border: none;

      &:hover {
        background: var(--primary-dark);
      }
    }

    .btn-icon {
      width: 18px;
      height: 18px;
      transition: transform 0.3s ease;
    }

    .btn:hover .btn-icon {
      transform: translateX(4px);
    }

    /* Modal */
    .portfolio-modal {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-content {
      background: white;
      border-radius: 1.5rem;
      max-width: 800px;
      width: 100%;
      max-height: 90vh;
      overflow: hidden;
      display: grid;
      grid-template-columns: 1fr 1fr;
      animation: slideUp 0.4s ease;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        max-height: 80vh;
        overflow-y: auto;
      }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: white;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      z-index: 10;

      svg {
        width: 20px;
        height: 20px;
      }

      &:hover {
        background: var(--bg-secondary);
        transform: rotate(90deg);
      }
    }

    .modal-image {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .modal-info {
      padding: 2rem;
      display: flex;
      flex-direction: column;
    }

    .modal-category {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: var(--primary-light);
      color: var(--primary);
      border-radius: 2rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      width: fit-content;
      margin-bottom: 1rem;
    }

    .modal-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .modal-client {
      color: var(--text-secondary);
      margin-bottom: 1rem;
    }

    .modal-description {
      color: var(--text-secondary);
      line-height: 1.7;
      flex-grow: 1;
      margin-bottom: 1.5rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioSectionComponent {
  private configService = inject(SiteConfigService);
  portfolio = this.configService.getPortfolio();

  activeCategory = signal('All');
  selectedItem = signal<PortfolioItem | null>(null);

  filteredItems = computed(() => {
    const category = this.activeCategory();
    if (category === 'All') {
      return this.portfolio.items;
    }
    return this.portfolio.items.filter(item => item.category === category);
  });

  setCategory(category: string) {
    this.activeCategory.set(category);
  }

  openPortfolioModal(item: PortfolioItem) {
    this.selectedItem.set(item);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedItem.set(null);
    document.body.style.overflow = '';
  }
}
