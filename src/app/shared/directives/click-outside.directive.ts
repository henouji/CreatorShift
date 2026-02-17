import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  @Input() appClickOutside!: () => void;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    
    if (!targetElement) {
      return;
    }
    
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    
    if (!clickedInside && this.appClickOutside) {
      this.appClickOutside();
    }
  }
}
