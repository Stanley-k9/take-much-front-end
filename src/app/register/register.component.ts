import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  
  password: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  photoUrl: string;
  userId: number;
  type: string;
  role: number;
  registerMessage : String;



  constructor(private RegisterService : RegisterService,
              private router : Router) { }

  ngOnInit(): void {
  }

  
  register(form: NgForm) : void {
    const email = this.email;
    const password = this.password;
    const first_name = this.first_name;
    const last_name = this.last_name;
    const username = this.username;
    const type = this.type;


    if (form.invalid) {
      return;
    }

    form.reset();

    var user = {
      "email":email,
      "password":password,
      "first_name":first_name,
      "last_name" : last_name,
      "username" : username,
      "type" : type

    }
    
    this.RegisterService.registerUser(user).subscribe( data =>{
      if(username != null || username != undefined){
        this.registerMessage = "SUCCESSFULLY REGISTERED";
        
        
        setTimeout(() => {
          this.registerMessage = '';
        }, 2000);

        setTimeout(() => {
          this.router.navigateByUrl("/login");
        }, 2500);

      }
      else{
        this.registerMessage = "FAILURE";
      }
    },(error) =>{
      this.registerMessage = "FAILURE"
    });
  }
}
