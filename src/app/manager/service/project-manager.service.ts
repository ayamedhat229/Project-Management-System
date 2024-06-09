import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {

  constructor(private _HttpClient:HttpClient) { }
  onGetAllProjectManager(param:any):Observable<any>{
    return this._HttpClient.get('Project/manager',{params:param})
  }
  createNewProject(data:any):Observable<any>{
    return this._HttpClient.post('Project',data)
  }
  onGetProjectById(id:any):Observable<any>{
    return this._HttpClient.get(`Project/${id}`)
  }
  editMyProject(data:any,id:any):Observable<any>{
    return this._HttpClient.put(`Project/${id}`,data)
  }
  onDeleteProject(id:any):Observable<any>{
   return this._HttpClient.delete(`Project/${id}`)
  }
}
