import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../global';

@Injectable({
  providedIn: 'root'
})
export class FieldPermissionService {

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<any>(GlobalVariable.BASE_API_URL+"/fields");
  }

  listUsers(o:any){
    return this.http.get<any>(GlobalVariable.BASE_API_URL+"/userFieldPermission/"+o.id.model+"/"+o.id.field);
  }

  saveUserFieldPermission(o:any){
    return this.http.post(GlobalVariable.BASE_API_URL+"/userFieldPermission",o);
  }

  removeUserFieldPermission(id:any){


    return this.http.request('delete',GlobalVariable.BASE_API_URL+"/userFieldPermission",{body: id});
  }

  put(o:any){
    return this.http.put(GlobalVariable.BASE_API_URL+"/fields",o);
  }

  post(o:any){
    return this.http.post(GlobalVariable.BASE_API_URL+'/fields',o);
  }

  delete(id:any){
    return this.http.request('delete',GlobalVariable.BASE_API_URL+'/fields',{body:id});
  }
}
