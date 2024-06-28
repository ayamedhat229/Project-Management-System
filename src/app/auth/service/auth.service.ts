import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient, private _Router:Router) { 
    if(localStorage.getItem('userToken')!==null){
      this.getProfile()
    }
  }

  role : string | any;

  getProfile(){
    let encoded : any = localStorage.getItem('userToken');
    let decoded : any = jwtDecode(encoded)
    localStorage.setItem('userRole',decoded.userGroup);
    localStorage.setItem('userName',decoded.userName);
    localStorage.setItem('userEmail',decoded.userEmail);
    this.getRole()
  }
  getRole(){
    if(localStorage.getItem('userToken')!==null&&localStorage.getItem('userRole')!==null){
      this.role=localStorage.getItem('userRole');
      console.log(this.role)
    }
  }
  onLoginUser(data:any):Observable<any>{
    return this._HttpClient.post('Users/Login',data)
  }
  onForgotPassword(data:any):Observable<any>{
    return this._HttpClient.post('Users/Reset/Request',data)
  }
  onResetPassword(data:any):Observable<any>{
    return this._HttpClient.post('Users/Reset',data)
  }
  onRegisterUser(data:any):Observable<any>{
    return this._HttpClient.post('Users/Register',data)
  }
  onVerifyUser(data:any):Observable<any>{
   return this._HttpClient.put('Users/verify',data)
  }
  onChangePassword(data:any):Observable<any>{
    return this._HttpClient.put('Users/ChangePassword',data)
  }
  getCurrentUser():Observable<any>{
    return this._HttpClient.get('Users/currentUser')
  }
  updateCurrentUser(data:any):Observable<any>{
   return this._HttpClient.put('Users/',data)
  }
  logOut(){
    localStorage.clear();
    this._Router.navigate(['/auth/login'])
  }
}
