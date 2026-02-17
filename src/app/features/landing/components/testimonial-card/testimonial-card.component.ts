import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialItem } from '../../models/site-config.model';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="testimonial-card">
      <div class="testimonial-rating">
        @for (star of [1,2,3,4,5]; track star) {
          <span class="star" [class.filled]="star <= testimonial.rating">★</span>
        }
      </div>
      <blockquote class="testimonial-content">
        "{{ testimonial.content }}"
      </blockquote>
      <div class="testimonial-author">
        <div class="author-avatar">
          <img [src]="testimonial.avatar" [alt]="testimonial.author" *ngIf="testimonial.avatar">
          <span class="avatar-fallback" *ngIf="!testimonial.avatar">{{ getInitials(testimonial.author) }}</span>
        </div>
        <div class="author-info">
          <h4 class="author-name">{{ testimonial.author }}</h4>
          <p class="author-role">{{ testimonial.role }}</p>
        </div>
      </div>
      <div class="quote-icon">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
        </svg>
      </div>
    </div>
  `,
  styles: [`
    .testimonial-card {
      background: white;
      border-radius: 1.5rem;
      padding: 2rem;
      position: relative;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      border: 1px solid var(--border-color);
      height: 100%;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
      }
    }

    .testimonial-rating {
      margin-bottom: 1rem;
    }

    .star {
      font-size: 1.25rem;
      color: #e0e0e0;

      &.filled {
        color: #ffc107;
      }
    }

    .testimonial-content {
      font-size: 1.1rem;
      line-height: 1.7;
      color: var(--text-primary);
      margin: 0 0 1.5rem 0;
      flex-grow: 1;
      font-style: italic;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .author-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      background: linear-gradient(135deg, var(--primary), #e94560);
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .avatar-fallback {
      color: white;
      font-weight: 600;
      font-size: 1.1rem;
    }

    .author-info {
      flex: 1;
    }

    .author-name {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.125rem;
    }

    .author-role {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .quote-icon {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      opacity: 0.1;

      svg {
        width: 48px;
        height: 48px;
        fill: var(--primary);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestimonialCardComponent {
  @Input({ required: true }) testimonial!: TestimonialItem;

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
