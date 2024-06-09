import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{ path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
 { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) }, 
 { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
