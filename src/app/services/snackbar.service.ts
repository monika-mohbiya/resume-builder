import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }
  open(message: string, action: string = 'Close', config?: MatSnackBarConfig) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      ...config
    });
  }
  info(message: string, action: string = '', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration,
      panelClass: ['info-snackbar'] // custom style
    });
  }
  // Success message
  success(message: string, action: string = 'Close') {
    this.open(message, action, { panelClass: ['snackbar-success'] });
  }

  // Error message
  error(message: string, action: string = 'Close') {
    this.open(message, action, { panelClass: ['snackbar-error'] });
  }
}
