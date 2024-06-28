import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ToastrModule} from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {MatDialogModule} from '@angular/material/dialog';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DeleteTaskComponent } from './delete-task/delete-task.component';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
   
   
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    DragDropModule,
    FormsModule,
    NgxDropzoneModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,
    FormsModule,
    MatButtonModule,
    ToastrModule.forRoot({
      closeButton:true,
       
     })
  ],
  exports:[
    MatFormFieldModule,
    MatInputModule,
    ToastrModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    DragDropModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    MatPaginatorModule,
   
  ]

})
export class SharedModule { }
