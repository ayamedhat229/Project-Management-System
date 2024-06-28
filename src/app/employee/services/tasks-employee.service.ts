import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TasksEmployeeService {

  constructor(private _HttpClient:HttpClient) { }
  onGetAllTasks():Observable<any>{
    return this._HttpClient.get('Task')
  }
  onChangeTask(id:number,status:any):Observable<any>{
    return this._HttpClient.put(`Task/${id}/change-status`,{status})
  }
}
