import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingCountSignal = signal<number>(0);
  private loadingMessageSignal = signal<string>('');

  readonly isLoading = computed(() => this.loadingCountSignal() > 0);
  readonly loadingMessage = computed(() => this.loadingMessageSignal());

  show(message: string = 'Loading...'): void {
    this.loadingCountSignal.update(count => count + 1);
    this.loadingMessageSignal.set(message);
  }

  hide(): void {
    this.loadingCountSignal.update(count => Math.max(0, count - 1));
    
    if (this.loadingCountSignal() === 0) {
      this.loadingMessageSignal.set('');
    }
  }

  forceHide(): void {
    this.loadingCountSignal.set(0);
    this.loadingMessageSignal.set('');
  }
}
