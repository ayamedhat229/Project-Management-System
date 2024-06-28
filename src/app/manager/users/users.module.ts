import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewUserComponent } from './view-user/view-user.component';
import { ConfirmUserComponent } from './confirm-user/confirm-user.component';


@NgModule({
  declarations: [
    UsersComponent,
    ViewUserComponent,
    ConfirmUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
