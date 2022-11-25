import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { StorageLayerInfoComponent } from './storage-layer-info/storage-layer-info.component';


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
    StorageLayerInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
