import { Component, inject, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, ThemeService } from '../../../core';
import { AvatarComponent } from '../../../shared/components';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, AvatarComponent],
  template: `
    <header class="header">
      <div class="header__left">
        <button 
          class="header__menu-toggle"
          (click)="toggleSidebar.emit()"
          aria-label="Toggle sidebar"
        >
          <span class="header__menu-icon">☰</span>
        </button>
        
        <a routerLink="/dashboard" class="header__logo">
          <span class="header__logo-text">Automation</span>
        </a>
      </div>

      <div class="header__center">
        <div class="header__search">
          <span class="header__search-icon">🔍</span>
          <input 
            type="search" 
            placeholder="Search..." 
            class="header__search-input"
          />
          <kbd class="header__search-shortcut">⌘K</kbd>
        </div>
      </div>

      <div class="header__right">
        <button 
          class="header__icon-btn"
          (click)="themeService.toggleTheme()"
          [attr.aria-label]="themeService.isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          {{ themeService.isDarkMode() ? '☀️' : '🌙' }}
        </button>

        <button class="header__icon-btn header__notification-btn" aria-label="Notifications">
          <span>🔔</span>
          <span class="header__notification-badge">3</span>
        </button>

        <div class="header__user-menu">
          @if (authService.currentUser(); as user) {
            <button class="header__user-btn" (click)="toggleUserMenu()">
              <app-avatar 
                [name]="user.firstName + ' ' + user.lastName"
                [src]="user.avatar"
                size="sm"
              />
              <span class="header__user-name">{{ user.firstName }}</span>
              <span class="header__chevron">▼</span>
            </button>
            
            @if (isUserMenuOpen) {
              <div class="header__dropdown">
                <div class="header__dropdown-header">
                  <strong>{{ user.firstName }} {{ user.lastName }}</strong>
                  <span>{{ user.email }}</span>
                </div>
                <div class="header__dropdown-divider"></div>
                <a routerLink="/profile" class="header__dropdown-item">
                  <span>👤</span> Profile
                </a>
                <a routerLink="/settings" class="header__dropdown-item">
                  <span>⚙️</span> Settings
                </a>
                <div class="header__dropdown-divider"></div>
                <button class="header__dropdown-item header__dropdown-item--danger" (click)="authService.logout()">
                  <span>🚪</span> Logout
                </button>
              </div>
            }
          } @else {
            <a routerLink="/auth/login" class="header__login-btn">Login</a>
          }
        </div>
      </div>
    </header>
  `,
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  readonly authService = inject(AuthService);
  readonly themeService = inject(ThemeService);

  isUserMenuOpen = false;

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
}
