import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { attachTokenInterceptor } from './shared/interceptors/attach-token.interceptor';
import { errorHandlerInterceptor } from './shared/interceptors/error-handler.interceptor';
import { ListEffect } from './store/effects';
import { reducers } from './store/featuers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([attachTokenInterceptor, errorHandlerInterceptor])),
    provideStore(reducers),
    provideEffects(ListEffect)
  ]
};
