import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient:HttpClient) { }
  onGetAllUsers(param:any):Observable<any>{
    return this._HttpClient.get('Users/Manager',{params:param})
  }
  onGetUserById(id:any):Observable<any>{
    return this._HttpClient.get(`Users/${id}`)
  }
}
