import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../global'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  login(user: any) {
    return this.http.post<any>(GlobalVariable.OAUTH_URL + "/oauth/token?grant_type=password&username=" + user.username + "&password=" + user.password + "&client_id=sparrow-platform&client_secret=password", {});
  }

}
