import { Component, OnInit } from '@angular/core';
import { ProjectManagerService } from '../service/project-manager.service';
import { PageEvent } from '@angular/material/paginator';
import { DeleteTaskComponent } from 'src/app/shared/delete-task/delete-task.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  constructor(private _ProjectManager:ProjectManagerService,public dialog: MatDialog,private _Toastr:ToastrService){}
  tableOfProjects:any;
  projects:any[]=[]
  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageNumber =1;
  pageEvent:PageEvent|any;
  pageSizeOptions = [5, 10, 20];
  searchKey:string=''
ngOnInit(): void {
  this.getAllProjects()
}
getAllProjects(){
  let param={
    pageSize:this.pageSize,
    pageNumber:this.pageNumber,
    title:this.searchKey
  }
  this._ProjectManager.onGetAllProjectManager(param).subscribe({
    next:(res)=>{
      this.tableOfProjects=res;
      this.projects=res.data;
      console.log(this.tableOfProjects)
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
openDialog(item:any): void {
  const dialogRef = this.dialog.open(DeleteTaskComponent, {
    data: {data:item},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed',result);
    console.log(result)
    
    if(result){
      this.deleteProject(result)
    }
  });
}
deleteProject(id:any){
  this._ProjectManager.onDeleteProject(id).subscribe({
    next:(res)=>{
      console.log(res)
    },
    error:(err)=>{
      console.log(err)
      this._Toastr.error('Deleted Task is failed','Error')
    },
    complete:()=>{
      this.getAllProjects()
      this._Toastr.success('Deleted Task Successfully','Success')
    }
  })
}
handlePageEvent(event: PageEvent) {
  this.pageEvent =event;
  this.length = event.length;
  this.pageSize = event.pageSize;
  this.pageIndex = event.pageIndex;
  this.pageNumber = event.pageIndex;
  this.getAllProjects()
}
}
