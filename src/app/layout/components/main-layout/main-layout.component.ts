import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { ToastContainerComponent } from '../../../shared/components';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ToastContainerComponent
  ],
  template: `
    <div class="layout">
      <app-header (toggleSidebar)="toggleSidebar()" />
      
      <div class="layout__container">
        <app-sidebar [isOpen]="isSidebarOpen()" />
        
        <main class="layout__main">
          <div class="layout__content">
            <router-outlet />
          </div>
          <app-footer />
        </main>
      </div>
      
      <app-toast-container />
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: var(--body-bg);

      &__container {
        display: flex;
        flex: 1;
      }

      &__main {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
        overflow-x: hidden;
      }

      &__content {
        flex: 1;
        padding: 1.5rem;
        max-width: 1400px;
        width: 100%;
        margin: 0 auto;

        @media (max-width: 640px) {
          padding: 1rem;
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {
  private sidebarOpen = signal(false);
  
  isSidebarOpen = this.sidebarOpen.asReadonly();

  toggleSidebar(): void {
    this.sidebarOpen.update(open => !open);
  }
}
