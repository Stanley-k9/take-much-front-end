import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

users : any;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((user)=>{
this.users=user;
console.log(user);
    })
  }
}
