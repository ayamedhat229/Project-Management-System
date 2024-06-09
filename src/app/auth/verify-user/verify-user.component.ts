import { Component, Inject, InjectionToken } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent {
  constructor(private _AuthService:AuthService,
    public dialogRef: MatDialogRef<VerifyUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  verifyCode=new FormGroup({
    email:new FormControl(null),
    code:new FormControl(null)
  })
onVerify(data:any){
this._AuthService.onVerifyUser(data).subscribe({
  next:(res)=>{
    console.log(res)
  },
  error:(err)=>{
    console.log(err)
  },
  complete:()=>{

  }
})
}
  onNoClick(): void {
    this.dialogRef.close();
  }
}


