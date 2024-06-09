import { Component, OnInit } from '@angular/core';
import { TasksManagerService } from '../service/tasks-manager.service';
import { PageEvent } from '@angular/material/paginator';
import { DeleteTaskComponent } from '../../shared/delete-task/delete-task.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit{
  constructor(private _TaskManagerService:TasksManagerService,public dialog: MatDialog,private _Toastr:ToastrService){}
  tableOfTasks:any;
  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageNumber =1;
  pageEvent:PageEvent|any;
  pageSizeOptions = [5, 10, 20];
  searchKey:string=''
  tasks:any[]=[]
  ngOnInit(): void {
    this.getAllMyTasks();
  }
  getAllMyTasks(){
    let param={
      pageSize:this.pageSize,
      pageNumber:this.pageNumber,
      title:this.searchKey
    }
    this._TaskManagerService.onGetAllTasksByManager(param).subscribe({
      next:(res)=>{
        this.tableOfTasks=res;
        this.tasks=res.data
        console.log(this.tableOfTasks)
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
        this.deleteTaskById(result)
      }
    });
  }
  deleteTaskById(taskId:number){
    this._TaskManagerService.onDeleteTask(taskId).subscribe({
      next:(res)=>{
        // this.tableOfTasks=res
        // this.tasks=res.data;
        console.log(res)
       
      },
      error:(err)=>{
        console.log(err)
        this._Toastr.error('Deleted Task is failed','Error')
      },
      complete:()=>{
        this.getAllMyTasks()
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
    this.getAllMyTasks()
  }
}
