import { ErrorHandler, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDetailComponent } from './error-detail/error-detail.component';

export class GlobalErrorHandler implements ErrorHandler {
  constructor(private zone: NgZone, private dialog: MatDialog) {}

  handleError(error: any): void {
    this.zone.run(() => {
      this.dialog.open(ErrorDetailComponent, {
        closeOnNavigation: true,
        data: error,
      });
    });
  }
}
