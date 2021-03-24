import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SocialAuthService} from 'angularx-social-login';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loginMessage: string;
  userRole: number;

  constructor(private authService: SocialAuthService,
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if(localStorage.getItem("isloggedIn")){

      this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || '');

    } else {
      this.router.navigateByUrl('/login');
    }
  }


  // signInWithGoogle() {
  //   this.userService.googleLogin();
  // }

  login(form: NgForm) : void {
    const email = this.email;
    const password = this.password;

    if (form.invalid) {
      return;
    }

    form.reset();

    var user = {
      "email":email,
      "password":password,
    }
    
    this.userService.loginUser(user).subscribe( data =>{
      if(data.username != null || data.username != undefined){
        this.loginMessage = "SUCCESS";
        localStorage.setItem("isloggedIn","true");
        localStorage.setItem("user",JSON.stringify(data));
        this.router.navigate(["/profile"]);
        window.location.href = "/profile";

      }
      else{
        this.loginMessage = "FAILURE";
      }
    },(error) =>{
      this.loginMessage = "FAILURE"
    });

   


  }
}
