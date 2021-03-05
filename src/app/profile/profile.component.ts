import {Component, OnInit} from '@angular/core';
import {SocialAuthService, SocialUser} from 'angularx-social-login';
import {ResponseModel, UserService} from '../service/user.service';
import {Router, RouterLink} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myUser: any;


  constructor(private authService: SocialAuthService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    //location.reload();

    /*this.userService.userData$
      .pipe(
        map((user: SocialUser | ResponseModel) => {
          if (user instanceof SocialUser || user.type === 'social') {
            return {
              ...user,
              email: 'test@test.com',

            };
          } else {
            return user;
          }
        })
      )
      .subscribe((data: ResponseModel | SocialUser) => {
        this.myUser = data;
      });*/
      this.myUser =JSON.parse( localStorage.getItem("user"));
      
      //console.log(this.myUser);
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl ("/login");
  }
}
