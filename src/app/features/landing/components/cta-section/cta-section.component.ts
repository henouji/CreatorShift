import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteConfigService } from '../../services/site-config.service';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="cta-section">
      <div class="cta-background">
        <div class="cta-gradient"></div>
        <div class="cta-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
        </div>
      </div>
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-headline">{{ cta.headline }}</h2>
          <p class="cta-subheadline">{{ cta.subheadline }}</p>
          <div class="cta-actions">
            <a [href]="cta.buttonLink" class="btn btn-white btn-lg">
              {{ cta.buttonLabel }}
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#contact" class="btn btn-outline-white btn-lg">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .cta-section {
      position: relative;
      padding: 100px 2rem;
      overflow: hidden;
    }

    .cta-background {
      position: absolute;
      inset: 0;
    }

    .cta-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--primary) 0%, #e94560 50%, #ff6b6b 100%);
    }

    .cta-shapes {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .shape {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
    }

    .shape-1 {
      width: 400px;
      height: 400px;
      top: -150px;
      left: -100px;
      animation: float 8s ease-in-out infinite;
    }

    .shape-2 {
      width: 300px;
      height: 300px;
      bottom: -100px;
      right: -50px;
      animation: float 10s ease-in-out infinite reverse;
    }

    @keyframes float {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(30px, -30px) rotate(10deg); }
    }

    .container {
      position: relative;
      z-index: 1;
      max-width: 1280px;
      margin: 0 auto;
    }

    .cta-content {
      text-align: center;
      color: white;
    }

    .cta-headline {
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 800;
      margin-bottom: 1rem;
      line-height: 1.2;
    }

    .cta-subheadline {
      font-size: 1.25rem;
      opacity: 0.9;
      margin-bottom: 2.5rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.6;
    }

    .cta-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
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
      padding: 1rem 2.5rem;
      font-size: 1.1rem;
    }

    .btn-white {
      background: white;
      color: var(--primary);
      border: 2px solid white;

      &:hover {
        background: transparent;
        color: white;
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      }
    }

    .btn-outline-white {
      background: transparent;
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.5);

      &:hover {
        background: white;
        color: var(--primary);
        border-color: white;
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
export class CtaSectionComponent {
  private configService = inject(SiteConfigService);
  cta = this.configService.getCta();
}
