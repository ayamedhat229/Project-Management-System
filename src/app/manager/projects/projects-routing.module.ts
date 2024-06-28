import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';

const routes: Routes = [{ path: '', component: ProjectsComponent },
  {path:'edit-project/:id',component:AddEditProjectComponent},
  {path:'add-project',component:AddEditProjectComponent},
  {path:'view-project/:id',component:ViewProjectComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
