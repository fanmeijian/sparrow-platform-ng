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
    return this.http.get<any>(GlobalVariable.BASE_API_URL+"/swdUserFieldPermissions", 
    {params: {model: o._links.self.href.split('/').splice(-1)[0].split(',')[0],
    field: o._links.self.href.split('/').splice(-1)[0].split(',')[1]}});
  }

  saveUserFieldPermission(o:any){
    return this.http.post<any>(GlobalVariable.BASE_API_URL+"/swdUserFieldPermissions",o,{observe: 'response'});
  }

  removeUserFieldPermission(id:any){
    return this.http.request('delete',GlobalVariable.BASE_API_URL+"/swdUserFieldPermissions/"+ {body: id});
  }


  listSysroles(o:any){
    return this.http.get<any>(GlobalVariable.BASE_API_URL+"/swdSysroleFieldPermissions", 
    {params: {model: o._links.self.href.split('/').splice(-1)[0].split(',')[0],
    field: o._links.self.href.split('/').splice(-1)[0].split(',')[1]}});
  }

  saveSysroleFieldPermission(o:any){
    return this.http.post<any>(GlobalVariable.BASE_API_URL+"/swdSysroleFieldPermissions",o,{observe: 'response'});
  }

  removeSysroleFieldPermission(id:any){
    return this.http.request('delete',GlobalVariable.BASE_API_URL+"/swdSysroleFieldPermissions/"+ {body: id});
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
