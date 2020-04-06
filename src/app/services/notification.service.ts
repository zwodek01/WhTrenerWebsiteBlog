import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}
  notifycation(text: string, type: string) {
    let config = new MatSnackBarConfig();
    if (type === 'error') {
      config.panelClass = ['error'];
    } else {
      config.panelClass = ['done'];
    }

    config.duration = 6000;
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    this._snackBar.open(text, 'Zamknij', config);
  }
}
