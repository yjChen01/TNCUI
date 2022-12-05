import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BillQueryComponent } from './bill-query/bill-query.component';
import { ErrorExceptComponent } from './error-except/error-except.component';
import { PLCStatusComponent } from './plcstatus/plcstatus.component';
import { SystemStatusComponent } from './system-status/system-status.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorageStatusComponent } from './storage-status/storage-status.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {
    path: 'SystemStatus',
    component: SystemStatusComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'StorageStatus',
    component: StorageStatusComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'PLCStatus',
    component: PLCStatusComponent,
    canActivate: [AuthGuard],
  },
  { path: 'Error', component: ErrorExceptComponent, canActivate: [AuthGuard] },
  {
    path: 'BillQuery',
    component: BillQueryComponent,
    canActivate: [AuthGuard],
  },
  { path: 'Welcome', component: WelcomeComponent },
  { path: 'Register', component: RegisterComponent },
  { path: '**', redirectTo: 'Welcome'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
