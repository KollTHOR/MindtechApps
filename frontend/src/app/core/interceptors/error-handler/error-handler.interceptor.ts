import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { catchError, throwError } from 'rxjs';

export function ErrorHandlerInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const snackBarService = inject(SnackbarService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
      if (error.status === 400) {
        snackBarService.showInfoMessage(error.message);
        //alert(error.message);
      } else if (error.status > 400) {
        snackBarService.showErrorMessage(error.message);
        //alert(error.message);
      } else if (error.status === 307) {
        return throwError(() => error);
      }
      return throwError(() => errorMsg);
    })
  );
}
