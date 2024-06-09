import { Component, OnInit } from '@angular/core';
import { ProjectManagerService } from '../../service/project-manager.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.scss']
})
export class AddEditProjectComponent implements OnInit{
  constructor(private _ProjectManagerService:ProjectManagerService,private _Toastr:ToastrService,  private _ActivatedRoute: ActivatedRoute,private _Router:Router){
    this.projectId =_ActivatedRoute.snapshot.params['id']
  }
  projects:any
  projectId:number =0;
  ngOnInit(): void {
    if(this.projectId>0){
      this.getProjectById(this.projectId)
    }
  }
  addNewProjectForm = new FormGroup({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',)
  })
  addProject(data:FormGroup){
    if(this.projectId){
      this.clickEditProject(data)
    }
    else{
      this.addNewProject(data)
    }
  }
addNewProject(data:any){
 
  this._ProjectManagerService.createNewProject(data.value).subscribe({
    next:(res)=>{
      console.log(res)
      this.projects=res;
    },
    error:(err)=>{
      this._Toastr.error('Added new Project is Failed','Error')
      console.log(err)
    },
    complete:()=>{
    this._Toastr.success('Added new Project is Successfully','Success')
    }
  })
}
clickEditProject(data:any){
  data.value.id=this.projectId;
  this._ProjectManagerService.editMyProject(data.value,this.projectId).subscribe({
    next:(res)=>{
      console.log(res)
      this.projects=res;
    },
    error:(err)=>{
      console.log(err)
    },
    complete:()=>{
      this._Toastr.success('Updated project successfully')
      this._Router.navigate(['/dashboard/manager/projects'])
    }
  })
}
getProjectById(projectId:number){
this._ProjectManagerService.onGetProjectById(projectId).subscribe({
  next:(res)=>{
    this.projects=res;
    console.log(this.projects);
    this.addNewProjectForm.patchValue({
      title:this.projects.title,
      description:this.projects.description
    })
  }
})
}
}
