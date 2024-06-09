import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{
  hide :boolean = false;
  constructor(private _AuthService:AuthService, private _Toastr:ToastrService){}
ngOnInit(): void {
  
}
changePasswordForm = new FormGroup({
  oldPassword : new FormControl('',[Validators.required]),
  newPassword :  new FormControl('',[Validators.required]),
  confirmNewPassword : new FormControl('',[Validators.required])
})
onSubmit(data:FormGroup){
  this._AuthService.onChangePassword(data).subscribe({
    next:(res)=>{
      console.log(res)
    },
    error:(err)=>{
      console.log(err);
      this._Toastr.error('Change Password failed', 'Error')
    },
    complete:()=>{
      this._Toastr.success('Change Password is Successfully','Success')
    }
  })
}
}
