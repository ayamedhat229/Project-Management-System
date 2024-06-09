import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TasksManagerService {

  constructor(private _HttpClient:HttpClient) { }
  onGetAllTasksByManager(param:any):Observable<any>{
    return this._HttpClient.get('Task/manager',{params:param})
    
  }
  onAddNewTask(data:any):Observable<any>{
    return this._HttpClient.post('Task',data)
  }
  onEditTask(id:any,data:any){
    return this._HttpClient.put(`Task/${id}`,data)
  }
  onGetTaskById(id:number):Observable<any>{
    return this._HttpClient.get(`Task/${id}`)
  }
  onDeleteTask(id:number):Observable<any>{
    return this._HttpClient.delete(`Task/${id}`)
  }
}
