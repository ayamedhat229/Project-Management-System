import { Component, OnInit } from '@angular/core';
import { ProjectsEmployeeService } from '../services/projects-employee.service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
constructor(private _ProjectEmployeeService:ProjectsEmployeeService){}
tableOfPRojectsEmployee:any[]=[];
projects:any;
length = 50;
pageSize = 5;
pageIndex = 0;
pageNumber =1;
pageEvent:PageEvent|any;
pageSizeOptions = [1,2];
searchKey:string=''
ngOnInit(): void {
  this.getAllProject()
}
getAllProject(){
  let param={
    pageSize:this.pageSize,
    pageNumber:this.pageNumber,
    title:this.searchKey
  }
  this._ProjectEmployeeService.onGetAllProjectEmployee(param).subscribe({
    next:(res)=>{
      this.tableOfPRojectsEmployee=res.data
      this.projects=res;
      console.log(this.projects)
    },
    error:(err)=>{
      console.log(err)
    },

  })
}
handlePageEvent(event: PageEvent) {
  this.pageEvent =event;
  this.length = event.length;
  this.pageSize = event.pageSize;
  this.pageIndex = event.pageIndex;
  this.pageNumber = event.pageIndex;
 this.getAllProject()
}
}
