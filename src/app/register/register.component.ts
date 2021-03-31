import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup,FormBuilder,Validators } from '@angular/forms';
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
  registerForm: FormGroup;
  loading:boolean = false;
  submitted: Boolean = false;



  constructor(private RegisterService : RegisterService,
              private router : Router,
              private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      email:['',[Validators.required,Validators.email]],
      username:['',Validators.required],
      type:['',Validators.required],


    }
     )
  }

  get f(){return this.registerForm.controls;}

  
  register() : void {
    this.submitted = true;

    const email = this.f.email.value;
    const password = this.f.password.value;
    const first_name = this.f.firstName.value;
    const last_name = this.f.lastName.value;
    const username = this.f.username.value;
    const type = this.f.type.value;


    if (this.registerForm.invalid) {
      this.loading = false;
      console.log("e tsena mo");
      return;
    }

    this.registerForm.reset();

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
