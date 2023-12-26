import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { CACHE_OPTION } from '../services/api.service';
import { AuthStatus, StorageService } from '../services/storage.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.has(CACHE_OPTION)) {
    return next(req);
  }

  const router = inject(Router);
  const storageService = inject(StorageService);

  return next(req).pipe(
    catchError(error => {
      if (error) {
        if (error.status == 401) {
          console.log(error);
          storageService.removeMainToken();
          storageService.token = null;
          storageService.authenticationStatus = AuthStatus.reject;
          router.navigateByUrl('/login');
        }
      }
      return throwError(() => new Error('There is an error'));
    })
  );
};
