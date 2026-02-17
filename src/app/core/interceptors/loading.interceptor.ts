import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

// Skip loading indicator for certain endpoints
const SKIP_LOADING_URLS = [
  '/notifications',
  '/health',
  '/ping'
];

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  const shouldSkip = SKIP_LOADING_URLS.some(url => req.url.includes(url));

  if (!shouldSkip) {
    loadingService.show();
  }

  return next(req).pipe(
    finalize(() => {
      if (!shouldSkip) {
        loadingService.hide();
      }
    })
  );
};
