import { Component, inject, ChangeDetectionStrategy, signal, ElementRef, viewChildren, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SiteConfigService } from '../../services/site-config.service';

@Component({
  selector: 'app-stats-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="stats-section">
      <div class="stats-background">
        <div class="stats-gradient"></div>
      </div>
      <div class="container">
        <div class="stats-grid">
          @for (stat of stats.items; track stat.label; let i = $index) {
            <div class="stat-item" #statItem>
              <div class="stat-value">
                <span class="stat-number">{{ animatedValues()[i] }}</span>
                <span class="stat-suffix">{{ stat.suffix }}</span>
              </div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .stats-section {
      position: relative;
      padding: 80px 2rem;
      overflow: hidden;
    }

    .stats-background {
      position: absolute;
      inset: 0;
    }

    .stats-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    }

    .container {
      position: relative;
      z-index: 1;
      max-width: 1280px;
      margin: 0 auto;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;

      @media (max-width: 968px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
      }
    }

    .stat-item {
      text-align: center;
      padding: 2rem;
      border-radius: 1rem;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.1);
      }
    }

    .stat-value {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 0.25rem;
      margin-bottom: 0.5rem;
    }

    .stat-number {
      font-size: 3.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--primary) 0%, #e94560 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
    }

    .stat-suffix {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary);
    }

    .stat-label {
      color: rgba(255, 255, 255, 0.8);
      font-size: 1rem;
      font-weight: 500;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsSectionComponent implements AfterViewInit {
  private configService = inject(SiteConfigService);
  private platformId = inject(PLATFORM_ID);
  
  stats = this.configService.getStats();

  statItems = viewChildren<ElementRef>('statItem');
  animatedValues = signal<number[]>(this.stats.items.map((stat) => stat.value));
  private hasAnimated = false;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  private setupIntersectionObserver() {
    // Reset values to 0 for animation
    this.animatedValues.set(this.stats.items.map(() => 0));
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true;
            this.animateStats();
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = this.statItems();
    if (items.length > 0) {
      observer.observe(items[0].nativeElement);
    }
  }

  private animateStats() {
    const duration = 2000;
    const frameRate = 60;
    const totalFrames = duration / (1000 / frameRate);
    let currentFrame = 0;

    const animate = () => {
      currentFrame++;
      const progress = this.easeOutQuart(currentFrame / totalFrames);

      const newValues = this.stats.items.map((stat) =>
        Math.floor(progress * stat.value)
      );
      this.animatedValues.set(newValues);

      if (currentFrame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        this.animatedValues.set(this.stats.items.map((stat) => stat.value));
      }
    };

    requestAnimationFrame(animate);
  }

  private easeOutQuart(x: number): number {
    return 1 - Math.pow(1 - x, 4);
  }
}
