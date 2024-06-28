import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VerifyUserComponent } from '../verify-user/verify-user.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit{
  constructor(private _AuthService:AuthService, private _Toastr:ToastrService, private _Router:Router,public dialog: MatDialog){}
  ngOnInit(): void {
    
  }
hide : boolean = true;
hiden : boolean = true;
imgSrc :any;
registerForm = new FormGroup({
  userName : new FormControl('',[Validators.required, Validators.maxLength(10), Validators.minLength(5)]),
  email : new FormControl('',[Validators.required, Validators.email]),
  country  : new FormControl('', [Validators.required]),
  phoneNumber : new FormControl ('', [Validators.required]),
  password : new FormControl ('',[Validators.required , Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{5,12}$')]),
  confirmPassword : new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{5,12}$')]),
  profileImage :  new FormControl('', [Validators.required])

})
onSubmit(data:FormGroup){
  let myData = new FormData;
  myData.append('userName',data.value.userName);
  myData.append('email',data.value.email);
  myData.append('country',data.value.country);
  myData.append('phoneNumber',data.value.phoneNumber);
  myData.append('password',data.value.password);
  myData.append('confirmPassword',data.value.confirmPassword);
  myData.append('profileImage',data.value.profileImage);
  this._AuthService.onRegisterUser(myData).subscribe({
    next:(res)=>{
      console.log(res)
    },
    error:(err)=>{
      console.log(err)
      this._Toastr.error('Not Create Account','Error')
    },
    complete:()=>{
      this._Toastr.success('Create Account Successfully','Success')
    }
  })
}
files: File[] = [];
//imgSrc: File[] = [];

onSelect(event: any) {
  this.files = [event.addedFiles[0]];  // Replace files array with the new file
  this.imgSrc = [event.addedFiles[0]]; // Update imgSrc accordingly
  console.log(this.imgSrc);
}

onRemove(event: any) {
  console.log(event);
  this.files = []; // Clear the files array
  this.imgSrc = []; // Clear the imgSrc array if needed
}
openDialog(): void {
  const dialogRef = this.dialog.open(VerifyUserComponent, {
    data: {},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed',result);
    if(result){
      this.verifyUserAccount(result)
    }
  });
}
verifyUserAccount(data:any){
  this._AuthService.onVerifyUser(data).subscribe({
    next:(res)=>{
      console.log(res)
    },
    error:(err)=>{
      console.log(err)
      this._Toastr.error('Try again', 'Activated Account not sucess');
    },complete:()=>{
      this._Toastr.success('Successfuly', 'Activated Account Successfuly');
       this._Router.navigateByUrl('/auth/login')
    }
  })
}
}
