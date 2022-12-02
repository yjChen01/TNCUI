import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StorageStatusComponent } from './storage-status/storage-status.component';
import { SystemStatusComponent } from './system-status/system-status.component';
import { PLCStatusComponent } from './plcstatus/plcstatus.component';
import { ErrorExceptComponent } from './error-except/error-except.component';
import { BillQueryComponent } from './bill-query/bill-query.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { ShuttleStateComponent } from './shuttle-state/shuttle-state.component';
import { LiftStateComponent } from './lift-state/lift-state.component';
import { MatDialogModule } from '@angular/material/dialog';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule ,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
