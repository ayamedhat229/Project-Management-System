import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { PageEvent } from '@angular/material/paginator';
import { ViewUserComponent } from './view-user/view-user.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmUserComponent } from './confirm-user/confirm-user.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  length=20;
  pageSize=5;
  pageIndex=0;
  pageNumber=1;
  pageSizeOptions=[5,10,20];

  totalNumberOfRecords:any[]=[]
  tableOfUsers:any;
  users:any[]=[];
  searchKey:string='';
  selectedFilter :string=''
  
  pageEvent:PageEvent|any;
  constructor(private _UsersService:UsersService,public dialog: MatDialog,private _Toastr:ToastrService){}
ngOnInit(): void {
  this.getAllUsers()
}
getAllUsers(){
  let params = {
    pageSize: this.pageSize,
    pageNumber: this.pageNumber,
    userName: '',
    email: '',
    country: ''
  };

  if (this.selectedFilter === 'userName') {
    params.userName = this.searchKey;
  } else if (this.selectedFilter === 'email') {
    params.email = this.searchKey;
  } else if (this.selectedFilter === 'country') {
    params.country = this.searchKey;
  } else {
    params.userName = this.searchKey;
    params.email = this.searchKey;
    params.country = this.searchKey;
  }

  this._UsersService.onGetUser(params).subscribe({
    next:(res)=>{
      console.log(res)
      this.tableOfUsers=res;
      this.users=res.data

    },
    error:(err)=>{
      console.log(err)
    },
    complete:()=>{
      //tostar
    }
  })
}
openDialog(userId:any): void {
  const dialogRef = this.dialog.open(ViewUserComponent, {
     data:userId,
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed',result);
    console.log(result)
    
    if(result){
      
    }
  });
}
clickViewUser(id:any){
  this._UsersService.onGetUserById(id).subscribe({
    next:(res)=>{
      console.log(res)
    },
    error:(err)=>{
      console.log(err)
    },
  })
}
openDialogConfirmUser(item:any): void {
  const dialogRef = this.dialog.open(ConfirmUserComponent, {
     data:item,
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed',result);
    console.log(result)
    
    if(result){
      this.ToggleActive(result)
    }
  });
}
ToggleActive(id:number){
  this._UsersService.onToggleActive(id).subscribe({
   next:(res)=>{
    console.log(res)
   },
   error:(err)=>{
    console.log(err)
   },
   complete:()=>{
    this.getAllUsers()
   }
  })
}
handlePageEvent(event: PageEvent) {
  this.pageEvent =event;
  this.length = event.length;
  this.pageSize = event.pageSize;
  this.pageIndex = event.pageIndex;
  this.pageNumber = event.pageIndex;
  this.getAllUsers()
}
}
