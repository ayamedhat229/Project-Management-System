import { Component, OnInit } from '@angular/core';
import { ProjectManagerService } from '../../service/project-manager.service';
import { UsersService } from '../../service/users.service';
import { TasksManagerService } from '../../service/tasks-manager.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss']
})
export class AddEditTaskComponent implements OnInit{
  constructor(private _projectManagerService:ProjectManagerService,private _userService:UsersService,private _taskManagerService:TasksManagerService,
    private _Toastr:ToastrService, private _ActivatedRoute:ActivatedRoute,private _Router:Router){
      this.taskId=_ActivatedRoute.snapshot.params['id']
    }
  tasks:any;
  projects:any;
  users:any;
  params:any
  taskId:number;
  ngOnInit(): void {
    this.getListprojectsById(this.params)
    this.getListUsersById(this.params)
    if(this.taskId>0){
      this.getTaskById(this.taskId)
    }
  }
addTaskForm=new FormGroup({
  title: new FormControl('',),
  description: new FormControl('',),
  employeeId: new FormControl(''),
  projectId: new FormControl('')
})

onSubmit(data:FormGroup){
if(this.taskId){
  this.clickEditTask(data)
}
else{
  this.addTask(data)
}

  
}
addTask(data:any){
  this._taskManagerService.onAddNewTask(data.value).subscribe({
    next:(res)=>{
      this.tasks=res;
      console.log(this.tasks)
    },
    error:(err)=>{
      this._Toastr.error('Added Task is failed','Error')
      console.log(err)
    },
    complete:()=>{
      this._Toastr.success('Added Task is successfully','Success')
    }
})
}
getListprojectsById(params:any){
this._projectManagerService.onGetAllProjectManager(params).subscribe({
  next:(res)=>{
    this.projects=res.data
    console.log(this.projects)
  },
  error:(err)=>{
    console.log(err)
  },

})
}
getListUsersById(params:any){
  this._userService.onGetAllUsers(params).subscribe({
    next:(res)=>{
      this.users=res.data
      console.log(this.users)
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
clickEditTask(data:any){
  data.value.id=this.taskId;
  this._taskManagerService.onEditTask(this.taskId,data.value).subscribe({
    next:(res)=>{
      console.log(res)
      this.tasks=res;
    },
    error:(err)=>{
      console.log(err)
      this._Toastr.error('Edit Task is failed','Error')
    },
    complete:()=>{
      this._Toastr.success('Edit Task is successfully','Success')
      this._Router.navigate(['/dashboard/manager/tasks'])
    }
  })
  
  }
getTaskById(taskId:number){
  this._taskManagerService.onGetTaskById(taskId).subscribe({
    next:(res)=>{
      this.tasks=res;
      this.addTaskForm.patchValue({
        title:this.tasks.title,
        description:this.tasks.description,
        employeeId:this.tasks.employeeId,
        projectId:this.tasks.projectId
      })
    }
  })
}

}
