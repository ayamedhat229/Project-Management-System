import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';
import { DeleteTaskComponent } from '../../shared/delete-task/delete-task.component';


@NgModule({
  declarations: [
    TasksComponent,
    AddEditTaskComponent,
    DeleteTaskComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule
  ]
})
export class TasksModule { }
