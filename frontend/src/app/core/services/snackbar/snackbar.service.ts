import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(public snackBar: MatSnackBar) {}

  showErrorMessage(error: string, action: string = 'Close') {
    this.snackBar.open(error, action, {
      duration: 10000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: 'red-snackbar',
    });
  }

  showInfoMessage(error: string, action: string = 'Close') {
    this.snackBar.open(error, action, {
      duration: 10000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: 'yellow-snackbar',
    });
  }

  showSuccessMessage(message: string, action: string = '') {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: 'green-snackbar',
    });
  }
}
