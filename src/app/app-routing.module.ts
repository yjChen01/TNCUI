import { WelcomeComponent } from './welcome/welcome.component';
import { BillQueryComponent } from './bill-query/bill-query.component';
import { ErrorExceptComponent } from './error-except/error-except.component';
import { PLCStatusComponent } from './plcstatus/plcstatus.component';
import { SystemStatusComponent } from './system-status/system-status.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorageStatusComponent } from './storage-status/storage-status.component';

const routes: Routes = [
  { path: 'SystemStatus', component: SystemStatusComponent },
  { path: 'StorageStatus', component: StorageStatusComponent },
  { path: 'PLCStatus', component: PLCStatusComponent },
  { path: 'Error', component: ErrorExceptComponent },
  { path: 'BillQuery', component: BillQueryComponent },
  { path: 'Welcome', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
