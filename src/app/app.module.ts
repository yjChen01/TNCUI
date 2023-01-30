import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StorageStatusComponent } from './storage-status/storage-status.component';
import { SystemStatusComponent } from './system-status/system-status.component';
import { PLCStatusComponent } from './plcstatus/plcstatus.component';
import { ErrorExceptComponent } from './error-except/error-except.component';
import { BillQueryComponent } from './bill-query/bill-query.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ShuttleStateComponent } from './shuttle-state/shuttle-state.component';
import { LiftStateComponent } from './lift-state/lift-state.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StationStatusDialogComponent } from './station-status-dialog/station-status-dialog.component';
import { ManualMoveConfrimDialogComponent } from './manual-move-confrim-dialog/manual-move-confrim-dialog.component';
import { TokenInterceptor } from './helpers/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RegisterComponent } from './register/register.component';
import { ReviceBillDialogComponent } from './revice-bill-dialog/revice-bill-dialog.component';
import { ReviceBillComfirmDialogComponent } from './revice-bill-comfirm-dialog/revice-bill-comfirm-dialog.component';
import { OriginBillResendConfirmDialogComponent } from './origin-bill-resend-confirm-dialog/origin-bill-resend-confirm-dialog.component';
import { FinishBillDialogComponent } from './finish-bill-dialog/finish-bill-dialog.component';
import { RebootConfirmDialogComponent } from './reboot-confirm-dialog/reboot-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StorageStatusComponent,
    SystemStatusComponent,
    PLCStatusComponent,
    ErrorExceptComponent,
    BillQueryComponent,
    WelcomeComponent,
    ShuttleStateComponent,
    LiftStateComponent,
    StationStatusDialogComponent,
    ManualMoveConfrimDialogComponent,
    RegisterComponent,
    ReviceBillDialogComponent,
    ReviceBillComfirmDialogComponent,
    OriginBillResendConfirmDialogComponent,
    FinishBillDialogComponent,
    RebootConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    MatDialogModule,
    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [StationStatusDialogComponent,ReviceBillDialogComponent,OriginBillResendConfirmDialogComponent,FinishBillDialogComponent,RebootConfirmDialogComponent],
})
export class AppModule {}
