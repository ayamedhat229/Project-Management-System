import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { PageEvent } from '@angular/material/paginator';
import { ViewUserComponent } from './view-user/view-user.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageNumber =1;
  pageSizeOptions = [5, 10, 50];
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
  let param={
    pageSize: this.pageSize,
    pageNumber: this.pageNumber,
    userName: '',
    email: '',
    country: ''
  };
  if (this.selectedFilter === 'userName') {
    param.userName = this.searchKey;
  } else if (this.selectedFilter === 'email') {
    param.email = this.searchKey;
  } else if (this.selectedFilter === 'country') {
    param.country = this.searchKey;
  } else {
    param.userName = this.searchKey;
    param.email = this.searchKey;
    param.country = this.searchKey;
  }
  
  this._UsersService.onGetAllUsers(param).subscribe({
    next:(res)=>{
      this.tableOfUsers=res;
      this.users=res.data;
      console.log(this.users)
    },
    error:(err)=>{
      console.log(err)
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
handlePageEvent(event: PageEvent) {
  this.pageEvent =event;
  this.length = event.length;
  this.pageSize = event.pageSize;
  this.pageIndex = event.pageIndex;
  this.pageNumber = event.pageIndex;
  this.getAllUsers()
}
}
