import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private SERVER_URL = environment.server_url;

  constructor( private httpClient: HttpClient) { }



  registerUser(user) {
    return this.httpClient.post<any>(`${this.SERVER_URL}/users/register`, user)
    .pipe( map( response => response));
}
}
