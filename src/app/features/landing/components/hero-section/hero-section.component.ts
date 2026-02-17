import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteConfigService } from '../../services/site-config.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="hero" class="hero-section">
      <div class="hero-background">
        <div class="hero-gradient"></div>
        <div class="hero-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>
      
      <div class="hero-container">
        <div class="hero-content">
          <h1 class="hero-headline">{{ hero.headline }}</h1>
          <p class="hero-subheadline">{{ hero.subheadline }}</p>
          <div class="hero-actions">
            <a [href]="hero.primaryCta.link" class="btn btn-primary btn-lg">
              {{ hero.primaryCta.label }}
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a [href]="hero.secondaryCta.link" class="btn btn-outline btn-lg">
              {{ hero.secondaryCta.label }}
            </a>
          </div>
          
          <!-- Trust indicators -->
          <div class="hero-trust">
            <div class="trust-avatars">
              <div class="trust-avatar"></div>
              <div class="trust-avatar"></div>
              <div class="trust-avatar"></div>
              <div class="trust-avatar"></div>
            </div>
            <div class="trust-text">
              <span class="trust-rating">★★★★★</span>
              <span>Trusted by 50+ creators</span>
            </div>
          </div>
        </div>
        
        <div class="hero-visual">
          <div class="hero-image-wrapper">
            <div class="hero-image-decoration"></div>
            <div class="hero-image-container">
              <div class="hero-gradient-visual">
                <div class="gradient-orb gradient-orb-1"></div>
                <div class="gradient-orb gradient-orb-2"></div>
                <div class="gradient-orb gradient-orb-3"></div>
                <div class="creative-grid">
                  <div class="grid-item"></div>
                  <div class="grid-item"></div>
                  <div class="grid-item"></div>
                  <div class="grid-item"></div>
                  <div class="grid-item"></div>
                  <div class="grid-item"></div>
                </div>
              </div>
            </div>
            <!-- Floating elements -->
            <div class="floating-card floating-card-1">
              <div class="floating-icon">🎨</div>
              <span>Design</span>
            </div>
            <div class="floating-card floating-card-2">
              <div class="floating-icon">📱</div>
              <span>Social</span>
            </div>
            <div class="floating-card floating-card-3">
              <div class="floating-icon">🎬</div>
              <span>Video</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Scroll indicator -->
      <div class="scroll-indicator">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding: 120px 2rem 80px;
      overflow: hidden;
    }

    .hero-background {
      position: absolute;
      inset: 0;
      z-index: 0;
    }

    .hero-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    }

    .hero-shapes {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .shape {
      position: absolute;
      border-radius: 50%;
      filter: blur(60px);
      opacity: 0.5;
    }

    .shape-1 {
      width: 400px;
      height: 400px;
      background: var(--primary);
      top: -100px;
      right: -100px;
      animation: float 8s ease-in-out infinite;
    }

    .shape-2 {
      width: 300px;
      height: 300px;
      background: #e94560;
      bottom: -50px;
      left: -50px;
      animation: float 10s ease-in-out infinite reverse;
    }

    .shape-3 {
      width: 200px;
      height: 200px;
      background: #00d9ff;
      top: 50%;
      left: 50%;
      animation: float 6s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(30px, -30px); }
    }

    .hero-container {
      position: relative;
      z-index: 1;
      max-width: 1280px;
      margin: 0 auto;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;

      @media (max-width: 968px) {
        grid-template-columns: 1fr;
        text-align: center;
      }
    }

    .hero-content {
      color: white;
    }

    .hero-headline {
      font-size: clamp(2.5rem, 6vw, 4rem);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subheadline {
      font-size: 1.25rem;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 2rem;
      max-width: 500px;

      @media (max-width: 968px) {
        margin-left: auto;
        margin-right: auto;
      }
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;

      @media (max-width: 968px) {
        justify-content: center;
      }
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
      border: 2px solid transparent;
    }

    .btn-lg {
      padding: 1rem 2rem;
      font-size: 1.1rem;
    }

    .btn-primary {
      background: var(--primary);
      color: white;
      border-color: var(--primary);

      &:hover {
        background: var(--primary-dark);
        border-color: var(--primary-dark);
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(var(--primary-rgb), 0.4);
      }
    }

    .btn-outline {
      background: transparent;
      color: white;
      border-color: rgba(255, 255, 255, 0.3);

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: white;
      }
    }

    .btn-icon {
      width: 20px;
      height: 20px;
      transition: transform 0.3s ease;
    }

    .btn:hover .btn-icon {
      transform: translateX(4px);
    }

    .hero-trust {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);

      @media (max-width: 968px) {
        justify-content: center;
      }
    }

    .trust-avatars {
      display: flex;
    }

    .trust-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary), #e94560);
      border: 2px solid white;
      margin-left: -10px;

      &:first-child {
        margin-left: 0;
      }
    }

    .trust-text {
      display: flex;
      flex-direction: column;
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.7);
    }

    .trust-rating {
      color: #ffc107;
      letter-spacing: 2px;
    }

    .hero-visual {
      position: relative;
      perspective: 1000px;
      transform-style: preserve-3d;

      @media (max-width: 968px) {
        display: none;
      }
    }

    .hero-image-wrapper {
      position: relative;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
    }

    .hero-image-decoration {
      position: absolute;
      inset: -20px;
      background: linear-gradient(135deg, var(--primary), #e94560);
      border-radius: 2rem;
      transform: rotate(3deg);
      opacity: 0.3;
    }

    .hero-image-container {
      position: relative;
      border-radius: 1.5rem;
      overflow: hidden;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
    }

    .hero-image {
      width: 100%;
      height: auto;
      display: block;
    }

    .hero-gradient-visual {
      position: relative;
      width: 100%;
      height: 400px;
      background: linear-gradient(135deg, 
        rgba(99, 102, 241, 0.1) 0%, 
        rgba(168, 85, 247, 0.1) 50%, 
        rgba(236, 72, 153, 0.1) 100%);
      border-radius: 1.5rem;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .gradient-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(40px);
      opacity: 0.6;
    }

    .gradient-orb-1 {
      width: 200px;
      height: 200px;
      background: linear-gradient(135deg, var(--primary), #8b5cf6);
      top: 20%;
      left: 20%;
      animation: orbFloat 8s ease-in-out infinite;
    }

    .gradient-orb-2 {
      width: 150px;
      height: 150px;
      background: linear-gradient(135deg, #ec4899, #f59e0b);
      bottom: 20%;
      right: 20%;
      animation: orbFloat 10s ease-in-out infinite reverse;
    }

    .gradient-orb-3 {
      width: 120px;
      height: 120px;
      background: linear-gradient(135deg, #06b6d4, #10b981);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: orbPulse 6s ease-in-out infinite;
    }

    .creative-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 2rem;
      padding: 2rem;
      z-index: 2;
      position: relative;
    }

    .grid-item {
      width: 60px;
      height: 60px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 1rem;
      backdrop-filter: blur(10px);
      animation: gridItemFloat 4s ease-in-out infinite;
    }

    .grid-item:nth-child(1) { animation-delay: 0s; }
    .grid-item:nth-child(2) { animation-delay: 0.5s; }
    .grid-item:nth-child(3) { animation-delay: 1s; }
    .grid-item:nth-child(4) { animation-delay: 1.5s; }
    .grid-item:nth-child(5) { animation-delay: 2s; }
    .grid-item:nth-child(6) { animation-delay: 2.5s; }

    @keyframes orbFloat {
      0%, 100% { 
        transform: translate(0, 0) scale(1); 
      }
      50% { 
        transform: translate(20px, -20px) scale(1.1); 
      }
    }

    @keyframes orbPulse {
      0%, 100% { 
        transform: translate(-50%, -50%) scale(1); 
        opacity: 0.6;
      }
      50% { 
        transform: translate(-50%, -50%) scale(1.2); 
        opacity: 0.8;
      }
    }

    @keyframes gridItemFloat {
      0%, 100% { 
        transform: translateY(0) rotate(0deg); 
        background: rgba(255, 255, 255, 0.1);
      }
      50% { 
        transform: translateY(-10px) rotate(5deg); 
        background: rgba(255, 255, 255, 0.2);
      }
    }

    .floating-card {
      position: absolute;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: 1rem 1.5rem;
      border-radius: 1.25rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 600;
      color: var(--text-primary);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      z-index: 10;
    }

    .floating-card:hover {
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.15);
    }

    .floating-icon {
      font-size: 1.75rem;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    }

    .floating-card-1 {
      top: 15%;
      right: -40px;
      animation: floatCard1 6s ease-in-out infinite;
    }

    .floating-card-2 {
      bottom: 40%;
      left: -50px;
      animation: floatCard2 8s ease-in-out infinite;
    }

    .floating-card-3 {
      bottom: 15%;
      right: 15%;
      animation: floatCard3 7s ease-in-out infinite;
    }

    @keyframes floatCard1 {
      0%, 100% { 
        transform: translateY(0) translateX(0) rotate(0deg);
      }
      33% { 
        transform: translateY(-15px) translateX(10px) rotate(2deg);
      }
      66% { 
        transform: translateY(-5px) translateX(-5px) rotate(-1deg);
      }
    }

    @keyframes floatCard2 {
      0%, 100% { 
        transform: translateY(0) translateX(0) rotate(0deg);
      }
      25% { 
        transform: translateY(-10px) translateX(-8px) rotate(-2deg);
      }
      50% { 
        transform: translateY(-20px) translateX(5px) rotate(1deg);
      }
      75% { 
        transform: translateY(-8px) translateX(12px) rotate(-1deg);
      }
    }

    @keyframes floatCard3 {
      0%, 100% { 
        transform: translateY(0) translateX(0) rotate(0deg);
      }
      40% { 
        transform: translateY(-18px) translateX(-10px) rotate(3deg);
      }
      80% { 
        transform: translateY(-12px) translateX(8px) rotate(-2deg);
      }
    }

    .scroll-indicator {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.75rem;
      animation: bounce 2s ease-in-out infinite;
    }

    .mouse {
      width: 24px;
      height: 36px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 12px;
      position: relative;
    }

    .wheel {
      position: absolute;
      top: 6px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 8px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 2px;
      animation: scroll 2s ease-in-out infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50% { transform: translateX(-50%) translateY(5px); }
    }

    @keyframes scroll {
      0%, 100% { opacity: 1; top: 6px; }
      50% { opacity: 0.3; top: 16px; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent {
  private configService = inject(SiteConfigService);
  hero = this.configService.getHero();
}
