import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen) {
      <div class="modal-overlay" (click)="onOverlayClick($event)">
        <div 
          class="modal" 
          [class]="modalClasses"
          role="dialog"
          [attr.aria-labelledby]="titleId"
          aria-modal="true"
        >
          @if (showHeader) {
            <div class="modal__header">
              <h2 [id]="titleId" class="modal__title">{{ title }}</h2>
              @if (showCloseButton) {
                <button 
                  class="modal__close" 
                  (click)="close()"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              }
            </div>
          }
          
          <div class="modal__body" [class.modal__body--no-padding]="noPadding">
            <ng-content></ng-content>
          </div>
          
          @if (showFooter) {
            <div class="modal__footer">
              <ng-content select="[modal-footer]"></ng-content>
            </div>
          }
        </div>
      </div>
    }
  `,
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() size: ModalSize = 'md';
  @Input() showHeader = true;
  @Input() showFooter = false;
  @Input() showCloseButton = true;
  @Input() closeOnOverlayClick = true;
  @Input() noPadding = false;

  @Output() closed = new EventEmitter<void>();

  titleId = `modal-title-${Math.random().toString(36).substring(2, 9)}`;

  get modalClasses(): string {
    return `modal--${this.size}`;
  }

  onOverlayClick(event: MouseEvent): void {
    if (this.closeOnOverlayClick && event.target === event.currentTarget) {
      this.close();
    }
  }

  close(): void {
    this.closed.emit();
  }
}
