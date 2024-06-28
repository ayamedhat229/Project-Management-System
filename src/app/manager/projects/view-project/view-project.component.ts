import { ProjectManagerService } from './../../service/project-manager.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit{
  constructor(private _ProjectManagerService:ProjectManagerService, private _ActivatedRoute:ActivatedRoute){
    this.projectId = _ActivatedRoute.snapshot.params['id'];
  }
  projects:any;
  projectId:number=0
  title:any
  ngOnInit(): void {
    if (this.projectId > 0) {
      this.getProjectById(this.projectId);
    }
  }
  viewProjectForm = new FormGroup({
    title: new FormControl({value: '', disabled: true}, [Validators.required]),
    description: new FormControl({value: '', disabled: true}, [Validators.required]),
  })
  viewMyProject(data: any) {
    this._ProjectManagerService.createNewProject(data.value).subscribe({
      next: (res) => {
        console.log(res);
        this.projects = res;
      },
      error: (err) => {
        // this._Toastr.error('Adding new project failed', 'Error');
        console.log(err);
      },
      complete: () => {
        // this._Toastr.success('Added new project successfully', 'Success');
      }
    });
  }
  getProjectById(projectId: number) {
    this._ProjectManagerService.onGetProjectById(projectId).subscribe({
      next: (res) => {
        this.projects = res;
        console.log(this.projects);
        this.viewProjectForm.patchValue({
          title: this.projects.title,
          description: this.projects.description
        });
      }
    });
  }
  viewProject(data:any){
    this._ProjectManagerService.onGetProjectById(this.projectId).subscribe({
     next:(res)=>{
      console.log(res)
     this.title=res.title
     console.log(this.title)
     },
     error:(err)=>{
      console.log(err)
     },
     complete:()=>{

     }
    })
  }
}
