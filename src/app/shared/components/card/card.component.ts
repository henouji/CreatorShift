import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CardVariant = 'default' | 'elevated' | 'outlined';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cardClasses">
      @if (hasHeader) {
        <div class="card__header">
          <ng-content select="[card-header]"></ng-content>
        </div>
      }
      
      <div class="card__body" [class.card__body--no-padding]="noPadding">
        <ng-content></ng-content>
      </div>
      
      @if (hasFooter) {
        <div class="card__footer">
          <ng-content select="[card-footer]"></ng-content>
        </div>
      }
    </div>
  `,
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() variant: CardVariant = 'default';
  @Input() hasHeader = false;
  @Input() hasFooter = false;
  @Input() noPadding = false;
  @Input() hoverable = false;
  @Input() clickable = false;

  get cardClasses(): string {
    const classes = ['card', `card--${this.variant}`];

    if (this.hoverable) {
      classes.push('card--hoverable');
    }

    if (this.clickable) {
      classes.push('card--clickable');
    }

    return classes.join(' ');
  }
}
