import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  users : any;
  constructor(private userService: UserService,
              private router: Router) {
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      this.users =JSON.parse( localStorage.getItem("user"));

    
      if (localStorage.getItem("isloggedIn") && this.users.type == "admin") {
      return true;
    }
         this.router.navigate([''], {queryParams: {returnUrl: state.url}}).then();

      return false;
    

  }

}
