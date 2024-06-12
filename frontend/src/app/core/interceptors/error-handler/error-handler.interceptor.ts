import { Inject, Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private snackBarService: SnackbarService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        if (error.status === 400) {
          this.snackBarService.showInfoMessage(error.message);
        } else if (error.status > 400) {
          this.snackBarService.showErrorMessage(error.message);
        } else if (error.status === 307) {
          return throwError(() => error);
        }
        return throwError(() => errorMsg);
      })
    );
  }
}
