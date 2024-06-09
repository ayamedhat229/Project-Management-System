import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service'; // Import your auth service

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private _Router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('userToken') !== null) {
      return true;
    } else {
      this._Router.navigate(['/auth/login']); // Redirect to login page if not authenticated
      return false;
    }
  }
}


