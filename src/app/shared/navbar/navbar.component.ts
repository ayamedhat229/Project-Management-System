import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  constructor(private _AuthService:AuthService){}
  userName=localStorage.getItem('userName');
  userEmail=localStorage.getItem('userEmail');
  ngOnInit(): void {
    
  }
myLogout(){
  this._AuthService.logOut()
}
}
