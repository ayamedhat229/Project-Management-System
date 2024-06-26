import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ManagerGuard } from '../Guards/manager.guard';
import { EmployeeGuard } from '../Guards/employee.guard';
import { HomeComponent } from '../shared/home/home.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{ path: '', component: DashboardComponent ,children:[
  {path:'home',component:HomeComponent} ,
  {path:'change-password',component:ChangePasswordComponent},
  {path:'profile',component:ProfileComponent}
  ,{path: 'manager', canActivate:[ManagerGuard], loadChildren:() => import('../manager/manager.module').then(m => m.ManagerModule)},
  {path: 'employee', canActivate:[EmployeeGuard], loadChildren: () => import('../employee/employee.module').then(m => m.EmployeeModule)},
]},
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
