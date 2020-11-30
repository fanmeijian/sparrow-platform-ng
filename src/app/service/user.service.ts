import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalVariable } from '../global';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = GlobalVariable.BASE_API_URL + "/swdUsers";
  constructor(private http: HttpClient) { }

  list(page: number, size: number) {
    return this.http.get<any>(this.baseUrl, { params: { 'size': size.toString(), 'page': page.toString() } });
  }

  get(username: string) {
    return this.http.get<any>(this.baseUrl + "/" + username);
  }

  post(o: any) {
    return this.http.post(this.baseUrl, o);
  }

  delete(o: any) {
    return this.http.delete(o._links.self.href);
  }

  put(o: any) {
    return this.http.put(o._links.self.href, o);
  }

  userMenus(o: any) {
    return this.http.get<any>(o._links.swdMenus.href);
  }

  userMenusByUserName(username: string) {
    return this.http.get<any>(this.baseUrl + "/" + username + "/swdMenus");
  }

  myMenus() {
    return this.http.get<any>(this.baseUrl + "/" + localStorage.getItem("username") + "/swdMenus");
  }

  userMenuTrees() {
    // return user menus with tree type
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzeXNhZG1pbiIsInNjb3BlIjoiU0NPUEVfdGVzdDphbnkiLCJleHAiOjE1OTgxMzc5NzAsImlhdCI6MTU5ODEwMTk3MH0.-lfJs2HymqkvruSmd3jBBelsXf2kn8J2o1VrGsfjJ_o'
    //   })
    // };
    return this.http.get<any>(GlobalVariable.BASE_API_URL + "/userMenuTrees");
  }

  userAuthorities(o: any) {
    return this.http.get<any>(o._links.swdAuthorities.href);
  }

  saveUserMenus(o: any) {
    return this.http.post(GlobalVariable.BASE_API_URL + "/userMenus", o);
  }

  saveUserAuthorities(o: any) {
    return this.http.post(GlobalVariable.BASE_API_URL + "/userAuthorities", o);
  }

  saveUserSysroles(o: any) {
    return this.http.post(GlobalVariable.BASE_API_URL + "/userSysroles", o);
  }
}
