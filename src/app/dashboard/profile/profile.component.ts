import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  imgSrc:any
  files: File[] = [];
  userData:any;
  hide:boolean=true;
  imageUrl:string='https://upskilling-egypt.com/3003';
  //imgSrc: File[] = [];
  constructor(private _AuthService:AuthService,private _Toastr:ToastrService){}
  ngOnInit(): void {
    this.onGetCurrentUSer()
  }
  profileForm = new FormGroup({
    userName: new FormControl('',[Validators.required,Validators.maxLength(10), Validators.minLength(5)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    country: new FormControl('',[Validators.required]),
    phoneNumber: new FormControl('',[Validators.required]),
    profileImage: new FormControl('',Validators.required),
    confirmPassword: new FormControl('',[Validators.required,Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{5,12}$')])
  })
  onSubmit(data:FormGroup){
    console.log(data.value)
    let myData=new FormData();
    myData.append('userName',data.value.userName);
    myData.append('email',data.value.email);
    myData.append('country',data.value.country);
    myData.append('phoneNumber',data.value.phoneNumber);
    myData.append('profileImage',this.imgSrc,this.imgSrc)
    myData.append('confirmPassword',data.value.confirmPassword)
    this._AuthService.updateCurrentUser(myData).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
        this._Toastr.error('Update profile is failed','Error')
      },
      complete:()=>{
         this._Toastr.success('Updated profile is Success','Success')
      }
    })
  }
 onGetCurrentUSer(){
  this._AuthService.getCurrentUser().subscribe({
    next:(res)=>{
      console.log(res)
      this.userData=res
    },
    error:(err)=>{
      console.log(err)
    },
    complete:()=>{
      this.imgSrc=this.imageUrl+this.userData.imagePath
      this.profileForm.patchValue({
        userName:this.userData.userName,
        email:this.userData.email,
        country:this.userData.country,
        phoneNumber:this.userData.phoneNumber,
        confirmPassword:this.userData.confirmPassword,
        profileImage:this.userData.imagePath
      })
    }
  })

 }
  
  onSelect(event: any) {
    this.imgSrc=event.addedFiles[0];
    this.profileForm.get('profileImage')?.setValue(this.imgSrc)
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event: any) {
    console.log(event);
    this.files = []; // Clear the files array
    this.imgSrc = []; // Clear the imgSrc array if needed
  }
}
