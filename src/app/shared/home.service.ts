import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _HttpClient:HttpClient) { }
  getUserCount():Observable<any>{
    return this._HttpClient.get('Users/count')
  }
  getAllTasksSystem():Observable<any>{
    return this._HttpClient.get('Task/count')
  }
}
