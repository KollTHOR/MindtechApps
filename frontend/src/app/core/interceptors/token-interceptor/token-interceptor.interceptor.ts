import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

export function TokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  // Inject the current `AuthService` and use it to get an authentication token:
  const authToken = inject(AuthService).getToken();
  // Clone the request to add the authentication header.
  req = req.clone({ setHeaders: { Authorization: `Bearer: ${authToken}` } });
  return next(req);
}
