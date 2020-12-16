import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../global';


@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  baseUrl=GlobalVariable.BASE_API_URL+"/swdAuthorities";

  constructor(private http: HttpClient) { }

  onNgInit(){
    
  }

  listWithUser(username:string){
    return this.http.get<any>(GlobalVariable.BASE_API_URL+"/authoritiesWithCheckByUser?username="+username);
  }

  listWithSysrole(sysroleId:string){
    //根据角色id返回带check属性的权限数组
    return this.http.get<any>(GlobalVariable.BASE_API_URL+"/authoritiesWithCheckBySysrole?sysroleId="+sysroleId);
  }

  list(size:number,page:number){
    return this.http.get<any>(this.baseUrl,{params:{'size':size.toString(),'page':page.toString()}});
  }

  post(authority:any){
    return this.http.post<any>(this.baseUrl,authority);
  }

  delete(authority:any){
    return this.http.delete(authority._links.self.href);
  }

  put(authority:any){
    return this.http.put(authority._links.self.href,authority);
  }

}
