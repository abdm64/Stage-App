import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  superusers = ["abdm64@live.com","Fatma.TILIOUINE@DJEZZY.DZ","Kamel.Naitdjoudi@DJEZZY.DZ"]
  authusers = localStorage.getItem("auth")
  user = localStorage.getItem("user")
  constructor(public auth : AuthService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   

        return this.isAuthenticated()
  }
  isAuthenticated(){
    // auth logic

    if (  this.authusers === 'true' && this.superusers.includes(this.user)) {
    

      return true
     } else {
  
      this.router.navigateByUrl('/');
  
      return false
     }
}

}
