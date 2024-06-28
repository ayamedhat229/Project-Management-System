import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';

import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    AddEditProjectComponent,
    ViewProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule

   
  ]
})
export class ProjectsModule { }
