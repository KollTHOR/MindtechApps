import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler/error-handler.interceptor';
import { TokenInterceptor } from './core/interceptors/token-interceptor/token-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync('noop'),
    provideHttpClient(
      withInterceptors([ErrorHandlerInterceptor, TokenInterceptor])
    ),
  ],
};
