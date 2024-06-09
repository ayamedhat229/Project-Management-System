import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';

const routes: Routes = [{ path: '', component: TasksComponent },
  {path:'add-edit-task',component:AddEditTaskComponent},
  {path:'edit-task/:id',component:AddEditTaskComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
