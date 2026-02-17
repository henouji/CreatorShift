import { Component, inject, ChangeDetectionStrategy, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SiteConfigService } from '../../services/site-config.service';

@Component({
  selector: 'app-landing-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled()" [class.mobile-open]="mobileMenuOpen()">
      <div class="navbar-container">
        <!-- Logo -->
        <a routerLink="/" class="navbar-brand">
          <img [src]="brand.logo" [alt]="brand.name" class="navbar-logo" *ngIf="brand.logo">
          <span class="navbar-brand-text">{{ brand.name }}</span>
        </a>

        <!-- Desktop Navigation -->
        <ul class="navbar-nav">
          @for (link of navigation.links; track link.label) {
            <li class="nav-item">
              <a 
                [routerLink]="link.path" 
                [fragment]="link.fragment"
                class="nav-link"
                (click)="scrollToSection(link.fragment)">
                {{ link.label }}
              </a>
            </li>
          }
        </ul>

        <!-- CTA Button -->
        <div class="navbar-actions">
          <a [href]="navigation.ctaButton.link" class="btn btn-primary">
            {{ navigation.ctaButton.label }}
          </a>
        </div>

        <!-- Mobile Menu Toggle -->
        <button class="mobile-toggle" (click)="toggleMobileMenu()" [attr.aria-expanded]="mobileMenuOpen()">
          <span class="hamburger" [class.active]="mobileMenuOpen()">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div class="mobile-menu" [class.open]="mobileMenuOpen()">
        <ul class="mobile-nav">
          @for (link of navigation.links; track link.label) {
            <li class="mobile-nav-item">
              <a 
                [routerLink]="link.path" 
                [fragment]="link.fragment"
                class="mobile-nav-link"
                (click)="scrollToSection(link.fragment); closeMobileMenu()">
                {{ link.label }}
              </a>
            </li>
          }
        </ul>
        <a [href]="navigation.ctaButton.link" class="btn btn-primary btn-block">
          {{ navigation.ctaButton.label }}
        </a>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: transparent;
      transition: all 0.3s ease;
      padding: 1rem 0;

      &.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        padding: 0.75rem 0;

        .nav-link {
          color: var(--text-primary);
        }

        .navbar-brand-text {
          color: var(--text-primary);
        }
      }
    }

    .navbar-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
    }

    .navbar-logo {
      height: 40px;
      width: auto;
    }

    .navbar-brand-text {
      font-size: 1.5rem;
      font-weight: 700;
      color: white;
      transition: color 0.3s ease;
    }

    .navbar-nav {
      display: flex;
      align-items: center;
      gap: 2rem;
      list-style: none;
      margin: 0;
      padding: 0;

      @media (max-width: 968px) {
        display: none;
      }
    }

    .nav-link {
      color: white;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 0;
      position: relative;
      transition: color 0.3s ease;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--primary);
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 100%;
      }
    }

    .navbar-actions {
      @media (max-width: 968px) {
        display: none;
      }
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      cursor: pointer;
      border: none;
    }

    .btn-primary {
      background: var(--primary);
      color: white;

      &:hover {
        background: var(--primary-dark);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.4);
      }
    }

    .btn-block {
      width: 100%;
    }

    .mobile-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;

      @media (max-width: 968px) {
        display: block;
      }
    }

    .hamburger {
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 24px;

      span {
        display: block;
        height: 2px;
        background: white;
        border-radius: 2px;
        transition: all 0.3s ease;

        .scrolled & {
          background: var(--text-primary);
        }
      }

      &.active {
        span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        span:nth-child(2) {
          opacity: 0;
        }
        span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
      }
    }

    .mobile-menu {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      padding: 1.5rem 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      transform: translateY(-10px);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;

      @media (max-width: 968px) {
        display: block;
      }

      &.open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }
    }

    .mobile-nav {
      list-style: none;
      margin: 0 0 1.5rem 0;
      padding: 0;
    }

    .mobile-nav-item {
      border-bottom: 1px solid var(--border-color);
    }

    .mobile-nav-link {
      display: block;
      padding: 1rem 0;
      color: var(--text-primary);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;

      &:hover {
        color: var(--primary);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingNavbarComponent {
  private configService = inject(SiteConfigService);

  brand = this.configService.getBrand();
  navigation = this.configService.getNavigation();

  isScrolled = signal(false);
  mobileMenuOpen = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  scrollToSection(fragment?: string) {
    if (fragment) {
      setTimeout(() => {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }
}
