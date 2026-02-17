import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteConfigService } from '../../services/site-config.service';
import { SectionHeaderComponent } from '../section-header/section-header.component';
import { ServiceCardComponent } from '../service-card/service-card.component';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, ServiceCardComponent],
  template: `
    <section id="services" class="services-section">
      <div class="container">
        <app-section-header
          [title]="services.sectionTitle"
          [subtitle]="services.sectionSubtitle"
          [centered]="true">
        </app-section-header>
        
        <div class="services-grid">
          @for (service of services.items; track service.id; let i = $index) {
            <app-service-card 
              [service]="service"
              [featured]="i === 0"
              class="service-item"
              [style.animation-delay]="i * 100 + 'ms'">
            </app-service-card>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services-section {
      padding: 100px 2rem;
      background: var(--bg-secondary);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: -200px;
        right: -200px;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, var(--primary-light) 0%, transparent 70%);
        pointer-events: none;
      }
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;

      @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }

    .service-item {
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesSectionComponent {
  private configService = inject(SiteConfigService);
  services = this.configService.getServices();
}
