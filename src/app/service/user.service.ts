import {Injectable} from '@angular/core';
import {SocialAuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { map} from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { serverResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  auth = false;
  private SERVER_URL = environment.server_url;
  private user;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<SocialUser | ResponseModel | object>(null);
  loginMessage$ = new BehaviorSubject<string>(null);
  userRole: number;
  noOfUsers : any;

  constructor(private authService: SocialAuthService,
              private httpClient: HttpClient) {

    authService.authState.subscribe((user: SocialUser) => {

      //console.log(user)
      // if (user != null) {
      //   this.httpClient.get(`${this.SERVER_URL}/users/validate/${user.email}`).subscribe((res: { status: boolean, user: object }) => {
      //     //  No user exists in database with Social Login
      //     if (!res.status) {
      //       // Send data to backend to register the user in database so that the user can place orders against his user id
      //       this.registerUser({
      //         email: user.email,
      //         first_name: user.first_Name,
      //         last_name: user.last_Name,
      //         password: '123456'
      //       }, user.photoUrl, 'social').subscribe(response => {
      //         if (response.message === 'Registration successful') {
      //           this.auth = true;
      //           this.userRole = 555;
      //           this.authState$.next(this.auth);
      //           this.userData$.next(user);
      //         }
      //       });

      //     } else {
      //       this.auth = true;
      //       // @ts-ignore
      //       this.userRole = res.user.role;
      //       this.authState$.next(this.auth);
      //       this.userData$.next(res.user);
      //     }
      //   });

      // }
    });
  }

  //  Login User with Email and Password
  loginUser(user) {
    return this.httpClient.post<any>(`${this.SERVER_URL}/users/login`, user)
    .pipe( map( response => response));
}


noOfCustomers(): Observable<serverResponse>{
 return this.httpClient.get<serverResponse>(`${this.SERVER_URL}/numberOfCustomer`)
}

noOfDelivery(){
  return this.httpClient.get<any>(`${this.SERVER_URL}/numberOfDelivery`)
}

getUsers(){
  return this.httpClient.get<any>(`${this.SERVER_URL}/allUsers`)
}


  logout() {
    localStorage.clear();
    this.authService.signOut();
    this.auth = false;
    this.authState$.next(this.auth);
  }

  // registerUser(form : NgForm1): Observable<{ message: string }> {
  //   //const {first_name, last_name, email, password};
  //  // console.log(formData);
  //   return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}users/register`, {
  //     email,
  //     last_name,
  //     first_name,
  //     type,
  //     password,
  //     photoUrl: photoUrl || null
  //   });
  // }


}


export interface ResponseModel {
  auth: boolean;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  photoUrl: string;
  userId: number;
  type: string;
  role: number;
}

export interface ResponseModel1 {

  email: string;
  username: string;

}