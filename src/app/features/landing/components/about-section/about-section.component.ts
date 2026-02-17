import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteConfigService } from '../../services/site-config.service';
import { SectionHeaderComponent } from '../section-header/section-header.component';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  template: `
    <section id="about" class="about-section">
      <div class="container">
        <div class="about-grid">
          <div class="about-image-wrapper">
            <div class="about-image-decoration"></div>
            <div class="about-image-container">
              <img [src]="about.image" alt="About us" class="about-image" loading="lazy">
            </div>
            <div class="experience-badge">
              <span class="experience-number">5+</span>
              <span class="experience-text">Years Experience</span>
            </div>
          </div>
          
          <div class="about-content">
            <app-section-header
              [title]="about.sectionTitle"
              [subtitle]="about.sectionSubtitle"
              [centered]="false">
            </app-section-header>
            
            <h3 class="about-headline">{{ about.headline }}</h3>
            <p class="about-description">{{ about.description }}</p>
            
            <div class="about-values">
              @for (value of about.values; track value.title) {
                <div class="value-item">
                  <div class="value-icon">
                    <ng-container [ngSwitch]="value.icon">
                      <svg *ngSwitchCase="'lightbulb'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"/>
                      </svg>
                      <svg *ngSwitchCase="'people'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                      <svg *ngSwitchCase="'trophy'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 22V9M14 22V9M6 2h12v7a6 6 0 0 1-12 0V2Z"/>
                      </svg>
                      <svg *ngSwitchDefault viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                      </svg>
                    </ng-container>
                  </div>
                  <div class="value-content">
                    <h4 class="value-title">{{ value.title }}</h4>
                    <p class="value-description">{{ value.description }}</p>
                  </div>
                </div>
              }
            </div>
            
            <a href="#contact" class="btn btn-primary btn-lg">
              Work With Us
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-section {
      padding: 100px 2rem;
      background: var(--bg-secondary);
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
    }

    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5rem;
      align-items: center;

      @media (max-width: 968px) {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
    }

    .about-image-wrapper {
      position: relative;

      @media (max-width: 968px) {
        max-width: 500px;
        margin: 0 auto;
      }
    }

    .about-image-decoration {
      position: absolute;
      inset: 20px -20px -20px 20px;
      background: linear-gradient(135deg, var(--primary), #e94560);
      border-radius: 1.5rem;
      z-index: 0;
    }

    .about-image-container {
      position: relative;
      border-radius: 1.5rem;
      overflow: hidden;
      z-index: 1;
    }

    .about-image {
      width: 100%;
      height: auto;
      display: block;
    }

    .experience-badge {
      position: absolute;
      bottom: -20px;
      right: -20px;
      background: white;
      padding: 1.5rem 2rem;
      border-radius: 1rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      text-align: center;
      z-index: 2;

      @media (max-width: 968px) {
        bottom: -15px;
        right: 20px;
      }
    }

    .experience-number {
      display: block;
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--primary);
      line-height: 1;
    }

    .experience-text {
      font-size: 0.875rem;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .about-content {
      @media (max-width: 968px) {
        text-align: center;
      }
    }

    .about-headline {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
      line-height: 1.3;
    }

    .about-description {
      color: var(--text-secondary);
      line-height: 1.8;
      margin-bottom: 2rem;
    }

    .about-values {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .value-item {
      display: flex;
      gap: 1rem;
      align-items: flex-start;

      @media (max-width: 968px) {
        text-align: left;
      }
    }

    .value-icon {
      width: 50px;
      height: 50px;
      border-radius: 0.75rem;
      background: var(--primary-light);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      svg {
        width: 24px;
        height: 24px;
        stroke: var(--primary);
      }
    }

    .value-content {
      flex: 1;
    }

    .value-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .value-description {
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.6;
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
      border: none;
    }

    .btn-lg {
      padding: 1rem 2rem;
    }

    .btn-primary {
      background: var(--primary);
      color: white;

      &:hover {
        background: var(--primary-dark);
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(var(--primary-rgb), 0.4);
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutSectionComponent {
  private configService = inject(SiteConfigService);
  about = this.configService.getAbout();
}
