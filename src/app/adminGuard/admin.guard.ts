import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router:Router){}

  canActivate()
  {
    if(localStorage.getItem('adminDetail'))
    {
      // localStorage.removeItem('adminDetails');
      return true;
    }
   else 
    {
      this.router.navigateByUrl('');
      return false;
    }
 
  }
}

    
  
