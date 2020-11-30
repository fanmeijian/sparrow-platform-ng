import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../global';

@Injectable({
  providedIn: 'root'
})
export class FieldPermissionService {

  constructor(private http:HttpClient) { }

  list(page:number,size:number){
    return this.http.get<any>(GlobalVariable.BASE_API_URL+"/swdFieldPermissions",{params:{size: size.toString(),page: page.toString()}});
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
    return this.http.patch(GlobalVariable.BASE_API_URL+"/swdFieldPermissions",o);
  }

  post(o:any){
    return this.http.post(GlobalVariable.BASE_API_URL+'/swdFieldPermissions',o);
  }

  delete(id:any){
    return this.http.request('delete',id._links.self.href);
  }
}
