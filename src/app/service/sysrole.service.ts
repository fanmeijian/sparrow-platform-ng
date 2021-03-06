import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../global';

@Injectable({
  providedIn: 'root'
})
export class SysroleService {
  baseUrl=GlobalVariable.BASE_API_URL+"/swdSysroles";

  constructor(private http: HttpClient) { }

  onNgInit(){
    
  }

  sysroleMenuTrees(o:any){
    return this.http.get<any>(GlobalVariable.BASE_API_URL+"/sysroleMenuTrees?sysroleId="+o._links.self.href.split("/").slice(-1)[0]);

  }

  listWithUser(username:string){
    return this.http.get<any[]>(GlobalVariable.BASE_API_URL+"/sysrolesWithCheckByUser?username="+username);
  }


  list(page:number,size: number){
    return this.http.get<any>(this.baseUrl,{ params: { 'size': size.toString(), 'page': page.toString() } });
  }

  post(o:any){
    return this.http.post<any>(this.baseUrl,o);
  }

  delete(o:any){
    return this.http.delete(o._links.self.href);
  }

  put(o:any){
    return this.http.put(o._links.self.href,o);
  }

  sysroleMenus(o:any){
    return this.http.get<any>(this.baseUrl+"/"+o._links.self.href.split("/").slice(-1)[0]+"/swdMenus");
  }

  sysroleAuthorities(){

  }

  saveSysroleMenus(o:any){
    return this.http.post(GlobalVariable.BASE_API_URL+"/sysroleMenus",o);
  }

  saveSysroleAuthorities(o:any){
    return this.http.post(GlobalVariable.BASE_API_URL+"/sysroleAuthorities",o);
  }

  findByNameContaining(a:string){
    return this.http.get<any>(GlobalVariable.BASE_API_URL+"/swdSysroles/search/findByNameContaining",{params: {name : a}});
  }

}
