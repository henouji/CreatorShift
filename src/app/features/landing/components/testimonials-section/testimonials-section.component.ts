import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteConfigService } from '../../services/site-config.service';
import { SectionHeaderComponent } from '../section-header/section-header.component';
import { TestimonialCardComponent } from '../testimonial-card/testimonial-card.component';

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, TestimonialCardComponent],
  template: `
    <section id="testimonials" class="testimonials-section">
      <div class="container">
        <app-section-header
          [title]="testimonials.sectionTitle"
          [subtitle]="testimonials.sectionSubtitle"
          [centered]="true">
        </app-section-header>
        
        <div class="testimonials-wrapper">
          <div class="testimonials-grid" [style.transform]="'translateX(-' + currentSlide() * 100 + '%)'">
            @for (testimonial of testimonials.items; track testimonial.id) {
              <div class="testimonial-slide">
                <app-testimonial-card [testimonial]="testimonial"></app-testimonial-card>
              </div>
            }
          </div>
          
          <!-- Navigation -->
          <div class="testimonials-nav">
            <button class="nav-btn prev" (click)="prevSlide()" [disabled]="currentSlide() === 0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            
            <div class="nav-dots">
              @for (dot of testimonials.items; track dot.id; let i = $index) {
                <button 
                  class="nav-dot" 
                  [class.active]="currentSlide() === i"
                  (click)="goToSlide(i)">
                </button>
              }
            </div>
            
            <button class="nav-btn next" (click)="nextSlide()" [disabled]="currentSlide() === testimonials.items.length - 1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Desktop Grid View -->
        <div class="testimonials-desktop-grid">
          @for (testimonial of testimonials.items; track testimonial.id) {
            <app-testimonial-card [testimonial]="testimonial"></app-testimonial-card>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials-section {
      padding: 100px 2rem;
      background: white;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
    }

    .testimonials-wrapper {
      display: none;
      
      @media (max-width: 968px) {
        display: block;
        overflow: hidden;
      }
    }

    .testimonials-grid {
      display: flex;
      transition: transform 0.5s ease;
    }

    .testimonial-slide {
      min-width: 100%;
      padding: 0 1rem;
    }

    .testimonials-nav {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .nav-btn {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 2px solid var(--border-color);
      background: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      svg {
        width: 20px;
        height: 20px;
        stroke: var(--text-primary);
      }

      &:hover:not(:disabled) {
        border-color: var(--primary);
        background: var(--primary);

        svg {
          stroke: white;
        }
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .nav-dots {
      display: flex;
      gap: 0.5rem;
    }

    .nav-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: none;
      background: var(--border-color);
      cursor: pointer;
      transition: all 0.3s ease;

      &.active {
        background: var(--primary);
        transform: scale(1.2);
      }

      &:hover:not(.active) {
        background: var(--text-secondary);
      }
    }

    .testimonials-desktop-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;

      @media (max-width: 968px) {
        display: none;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestimonialsSectionComponent {
  private configService = inject(SiteConfigService);
  testimonials = this.configService.getTestimonials();

  currentSlide = signal(0);

  prevSlide() {
    if (this.currentSlide() > 0) {
      this.currentSlide.update((v) => v - 1);
    }
  }

  nextSlide() {
    if (this.currentSlide() < this.testimonials.items.length - 1) {
      this.currentSlide.update((v) => v + 1);
    }
  }

  goToSlide(index: number) {
    this.currentSlide.set(index);
  }
}
