import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  hide:boolean = true;
  constructor(private _AuthService:AuthService, private _Toastr:ToastrService, private _Router:Router){}
  ngOnInit(): void {
    
  }
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{5,12}$')])
  })
onSubmit(data:FormGroup){
  this._AuthService.onLoginUser(data.value).subscribe({
   next:(res)=>{
    localStorage.setItem('userToken',res.token);
    this._AuthService.getProfile()
    console.log(res);

   },
   error:(err)=>{
    console.log(err)
    this._Toastr.error('Login is not Success','Error')
   },
   complete:()=>{
    this._Toastr.success('Login is Successfully','Success');
    this._Router.navigate(['/dashboard/home'])
   }
  })
}

}
