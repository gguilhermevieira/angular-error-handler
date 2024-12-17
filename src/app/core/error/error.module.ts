import { ErrorHandler, ModuleWithProviders, NgModule, NgZone, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorHandler } from './global-error.handler';
import { MatDialog } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ErrorModule {
  constructor(@Optional() @SkipSelf() parentModule?: ErrorModule) {
    if (parentModule) {
      throw new Error('ErrorModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<ErrorModule> {
    return {
      ngModule: ErrorModule,
      providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler, deps: [NgZone, MatDialog] }],
    };
  }
}
