import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }
  onLoginUser(data:any):Observable<any>{
    return this._HttpClient.post('Users/Login',data)
  }
  onForgotPassword(data:any):Observable<any>{
    return this._HttpClient.post('Users/Reset/Request',data)
  }
  onResetPassword(data:any):Observable<any>{
    return this._HttpClient.post('Users/Reset',data)
  }
}
