import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const attachTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);

  if (storageService.token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${storageService.token}`
      }
    });
  }

  return next(req);
};
