import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../global';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }


  list(){
    return this.http.get<any>(GlobalVariable.BASE_API_URL + '/swdRoles');
  }

  get(){

  }

  put(){

  }

  post(){
    
  }

  delete(){

  }

}
