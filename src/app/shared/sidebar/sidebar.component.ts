import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
interface Menu{
  text:string;
  link:string;
  icon:string;
  isActive:boolean;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  constructor(private _AuthService:AuthService){
  }
  ngOnInit(): void {
    
  }
  isManager():boolean{
    console.log(this._AuthService.role)
    return this._AuthService.role == 'Manager'? true:false;
 
  }
  isEmployee(): boolean{
    console.log(this._AuthService.role)
    return this._AuthService.role == 'Employee'? true:false;
  }
Menu:Menu[]=[
  {
    text:'Home',
    link:'/dashboard/home',
    icon:'fa-solid fa-house',
    isActive:this.isManager() ||this.isEmployee(),
  },
  {
    text:'Projects',
    link:'/dashboard/manager/projects',
    icon:'fa-solid fa-diagram-project',
    isActive:this.isManager(),
  },
  {
    text:'Tasks',
    link:'/dashboard/manager/tasks',
    icon:'fa-solid fa-list-check',
    isActive:this.isManager() ,
  },
  {
    text:'Users',
    link:'/dashboard/manager/users',
    icon:'fa-solid fa-users',
    isActive:this.isManager(),
  }
,  {
  text:'Projects',
  link:'/dashboard/employee/projects',
  icon:'fa-solid fa-diagram-project',
  isActive:this.isEmployee(),
},
{
  text:'Tasks',
  link:'/dashboard/employee/tasks',
  icon:'fa-solid fa-list-check',
  isActive:this.isEmployee(),
}
]
}
