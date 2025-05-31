import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

export enum SnackbarType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning'
}

@Injectable({providedIn: 'root'})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {
  }

  show(
    message: string,
    type: SnackbarType = SnackbarType.Info,
    duration: number = 3000,
    horizontalPosition: MatSnackBarHorizontalPosition = 'center',
    verticalPosition: MatSnackBarVerticalPosition = 'top'
  ) {
    let panelClass = '';
    switch (type) {
      case SnackbarType.Success:
        panelClass = 'snackbar-success';
        break;
      case SnackbarType.Error:
        panelClass = 'snackbar-error';
        break;
      case SnackbarType.Warning:
        panelClass = 'snackbar-warning';
        break;
      default:
        panelClass = 'snackbar-info';
    }
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass,
      horizontalPosition,
      verticalPosition
    });
  }
}
