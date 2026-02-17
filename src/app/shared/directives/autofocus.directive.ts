import { Directive, ElementRef, Input, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appAutofocus]',
  standalone: true
})
export class AutofocusDirective implements OnInit, OnDestroy {
  @Input() appAutofocus = true;
  @Input() autofocusDelay = 0;

  private readonly platformId = inject(PLATFORM_ID);
  private timeoutId?: ReturnType<typeof setTimeout>;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (this.appAutofocus && isPlatformBrowser(this.platformId)) {
      this.timeoutId = setTimeout(() => {
        this.elementRef.nativeElement.focus();
      }, this.autofocusDelay);
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
