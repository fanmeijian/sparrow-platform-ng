import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../global';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }


  list(page: number,size: number){
    return this.http.get<any>(GlobalVariable.BASE_API_URL + '/swdRoles',{ params: {size: size.toString(), page: page.toString()}});
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
