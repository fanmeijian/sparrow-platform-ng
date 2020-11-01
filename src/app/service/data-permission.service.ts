import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../global';

@Injectable({
  providedIn: 'root'
})
export class DataPermissionService {

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<any>(GlobalVariable.BASE_API_URL+"/dataPermission");
  }

  put(o:any){
    return this.http.request('put',GlobalVariable.BASE_API_URL+'/dataPermission/',{body:o});

  }

  post(o:any){
    return this.http.post(GlobalVariable.BASE_API_URL+'/dataPermission',o);
  }

  delete(id:any){
    return this.http.request('delete',GlobalVariable.BASE_API_URL+'/dataPermission',{body:id});
  }
}
