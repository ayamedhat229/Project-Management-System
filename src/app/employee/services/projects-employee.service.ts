import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectsEmployeeService {

  constructor(private _HttpClient:HttpClient) { }
  onGetAllProjectEmployee(param:any):Observable<any>{
   return this._HttpClient.get('Project/employee',{params:param})
  }
}
