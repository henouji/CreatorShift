import { Component, Input, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  badge?: string | number;
  children?: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside 
      class="sidebar" 
      [class.sidebar--collapsed]="isCollapsed()"
      [class.sidebar--open]="isOpen"
    >
      <nav class="sidebar__nav">
        @for (item of navItems; track item.path) {
          @if (item.children && item.children.length > 0) {
            <div class="sidebar__group">
              <button 
                class="sidebar__group-header"
                (click)="toggleGroup(item.path)"
                [attr.aria-expanded]="isGroupExpanded(item.path)"
              >
                @if (item.icon) {
                  <span class="sidebar__icon">{{ item.icon }}</span>
                }
                @if (!isCollapsed()) {
                  <span class="sidebar__label">{{ item.label }}</span>
                  <span class="sidebar__chevron" [class.sidebar__chevron--expanded]="isGroupExpanded(item.path)">▶</span>
                }
              </button>
              
              @if (isGroupExpanded(item.path) && !isCollapsed()) {
                <div class="sidebar__group-items">
                  @for (child of item.children; track child.path) {
                    <a 
                      [routerLink]="child.path" 
                      routerLinkActive="sidebar__link--active"
                      class="sidebar__link sidebar__link--child"
                    >
                      @if (child.icon) {
                        <span class="sidebar__icon">{{ child.icon }}</span>
                      }
                      <span class="sidebar__label">{{ child.label }}</span>
                      @if (child.badge) {
                        <span class="sidebar__badge">{{ child.badge }}</span>
                      }
                    </a>
                  }
                </div>
              }
            </div>
          } @else {
            <a 
              [routerLink]="item.path" 
              routerLinkActive="sidebar__link--active"
              class="sidebar__link"
              [title]="isCollapsed() ? item.label : ''"
            >
              @if (item.icon) {
                <span class="sidebar__icon">{{ item.icon }}</span>
              }
              @if (!isCollapsed()) {
                <span class="sidebar__label">{{ item.label }}</span>
                @if (item.badge) {
                  <span class="sidebar__badge">{{ item.badge }}</span>
                }
              }
            </a>
          }
        }
      </nav>

      <div class="sidebar__footer">
        <button 
          class="sidebar__collapse-btn"
          (click)="toggleCollapse()"
          [attr.aria-label]="isCollapsed() ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          <span class="sidebar__collapse-icon" [class.sidebar__collapse-icon--collapsed]="isCollapsed()">◀</span>
          @if (!isCollapsed()) {
            <span class="sidebar__label">Collapse</span>
          }
        </button>
      </div>
    </aside>
    
    @if (isOpen) {
      <div class="sidebar__overlay" (click)="closeSidebar()"></div>
    }
  `,
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Input() navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: 'Analytics', path: '/analytics', icon: '📈' },
    {
      label: 'Projects',
      path: '/projects',
      icon: '📁',
      children: [
        { label: 'All Projects', path: '/projects' },
        { label: 'Create New', path: '/projects/new' },
        { label: 'Archive', path: '/projects/archive' }
      ]
    },
    {
      label: 'Team',
      path: '/team',
      icon: '👥',
      children: [
        { label: 'Members', path: '/team/members' },
        { label: 'Roles', path: '/team/roles' },
        { label: 'Invitations', path: '/team/invitations', badge: '2' }
      ]
    },
    { label: 'Settings', path: '/settings', icon: '⚙️' }
  ];

  private collapsedSignal = signal(false);
  private expandedGroups = signal<Set<string>>(new Set());

  isCollapsed = computed(() => this.collapsedSignal());

  toggleCollapse(): void {
    this.collapsedSignal.update(collapsed => !collapsed);
  }

  toggleGroup(path: string): void {
    this.expandedGroups.update(groups => {
      const newGroups = new Set(groups);
      if (newGroups.has(path)) {
        newGroups.delete(path);
      } else {
        newGroups.add(path);
      }
      return newGroups;
    });
  }

  isGroupExpanded(path: string): boolean {
    return this.expandedGroups().has(path);
  }

  closeSidebar(): void {
    this.isOpen = false;
  }
}
