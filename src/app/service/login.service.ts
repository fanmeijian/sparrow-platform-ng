import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {GlobalVariable} from '../global'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }


  login(user:any){
    // console.log(user);
 
   return this.http.post<any>(GlobalVariable.BASE_API_URL+"/oauth2/token",user);
  }

}
