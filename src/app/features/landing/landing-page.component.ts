import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingNavbarComponent } from './components/landing-navbar/landing-navbar.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ServicesSectionComponent } from './components/services-section/services-section.component';
import { PortfolioSectionComponent } from './components/portfolio-section/portfolio-section.component';
import { StatsSectionComponent } from './components/stats-section/stats-section.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { TestimonialsSectionComponent } from './components/testimonials-section/testimonials-section.component';
import { CtaSectionComponent } from './components/cta-section/cta-section.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';
import { LandingFooterComponent } from './components/landing-footer/landing-footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    LandingNavbarComponent,
    HeroSectionComponent,
    ServicesSectionComponent,
    PortfolioSectionComponent,
    StatsSectionComponent,
    AboutSectionComponent,
    TestimonialsSectionComponent,
    CtaSectionComponent,
    ContactSectionComponent,
    LandingFooterComponent
  ],
  template: `
    <div class="landing-page">
      <app-landing-navbar></app-landing-navbar>
      <main>
        <app-hero-section></app-hero-section>
        <app-services-section></app-services-section>
        <app-portfolio-section></app-portfolio-section>
        <app-stats-section></app-stats-section>
        <app-about-section></app-about-section>
        <app-testimonials-section></app-testimonials-section>
        <app-cta-section></app-cta-section>
        <app-contact-section></app-contact-section>
      </main>
      <app-landing-footer></app-landing-footer>
    </div>
  `,
  styles: [`
    .landing-page {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    main {
      flex: 1;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent {}
