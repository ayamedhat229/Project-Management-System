import { Component, OnInit } from '@angular/core';
import { TasksEmployeeService } from '../services/tasks-employee.service';
import { ToastrService } from 'ngx-toastr';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
constructor(private _TaskEmployeeService:TasksEmployeeService,private _Toastr:ToastrService){}

toDo:any[]=[];
inProgress:any[]=[];
Done:any[]=[];
taskData:any;
taskList:any[]=[];
ngOnInit(): void {
this.getAllTasks()
}


// inPrograss = ['Get to work', 'Pick up groceries', 'Go home', ];
// done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];



getAllTasks(){
    this._TaskEmployeeService.onGetAllTasks().subscribe({
      next:(res)=>{
       this.taskData=res;
       this.taskList=res.data;
       this.toDo=this.taskList.filter(x=> x.status == 'ToDo');
       this.inProgress=this.taskList.filter(x=>x.status == 'InProgress');
       this.Done=this.taskList.filter(x=>x.status== "Done")
     
        
        
       console.log(this.toDo)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
   let status = '';
    if (event.container.id === 'toDo') {
      status = 'ToDo';
    } else if (event.container.id === 'inProgress') {
      status = 'InProgress';
    } else if (event.container.id === 'Done') {
      status = 'Done';
    }
    console.log(event.container.id );
    console.log(status);
    const movedItem: any = event.item.data;
  console.log('Moved item:', movedItem);
    this.changeStatusTask(movedItem.id,status)
  }
changeStatusTask(taskId:number,data:any){
  this._TaskEmployeeService.onChangeTask(taskId,data).subscribe({
    next:(res)=>{
      console.log(res)
    },
    error:(err)=>{
      console.log(err)
    },
    complete:()=>{
     this._Toastr.success('Moved task is Successfully','Success')
    }
  })

}

}
