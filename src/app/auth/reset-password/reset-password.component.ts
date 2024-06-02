import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit{
  hide:boolean = false;
  hiden:boolean = false;
  constructor(private _AuthService:AuthService, private _Toastr:ToastrService){}
  ngOnInit(): void {
    
  }

resetPassForm = new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email]),
  password:new FormControl('',[Validators.required,Validators.pattern(('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{5,12}$'))]),
  confirmPassword : new FormControl ('', [Validators.required, Validators.pattern(('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{5,12}$'))]),
  seed: new FormControl ('',[Validators.required])
})
onSubmit(data:FormGroup){
  this._AuthService.onResetPassword(data.value).subscribe({
    next:(res)=>{
      console.log(res)
    },
    error:(err)=>{
      console.log(err);
      this._Toastr.error('Error')
    },
    complete:()=>
      this._Toastr.success('Success')
  })
}
}
