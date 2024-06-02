import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{
  constructor(private _AuthService:AuthService, private _Toastr:ToastrService){

  }
  ngOnInit(): void {
    
  }
  forgotPasswordForm = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email])
  })
onSubmit(data:FormGroup){
  this._AuthService.onForgotPassword(data.value).subscribe({
    next:(res)=>{
      console.log(res)
    },
    error:(err)=>{
      console.log(err)
      this._Toastr.error('Error')
    },
    complete:()=>{
      this._Toastr.success('Success')
    }
  })

}
}
