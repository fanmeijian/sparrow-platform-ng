import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../global';

@Injectable({
  providedIn: 'root'
})
export class DataPermissionService {

  constructor(private http: HttpClient) { }

  list(page: number, size: number) {
    return this.http.get<any>(GlobalVariable.BASE_API_URL + "/swdDataPermissions", { params: { 'size': size.toString(), 'page': page.toString() } });
  }

  put(o: any) {
    return this.http.request('patch', o._links.self.href, { body: o });

  }

  post(o: any) {
    return this.http.post(GlobalVariable.BASE_API_URL + '/swdDataPermissions', o);
  }

  delete(o: any) {
    return this.http.request('delete', o._links.self.href);
  }

  findByIdModelAndPkeyAndPermission(model, pkey, permission) {
    return this.http.get<any>(GlobalVariable.BASE_API_URL + '/swdUserDataPermissions/search/findByIdModelAndIdPkeyAndIdPermission', { params: { model: model, pkey: pkey, permission: permission } })
  }

  saveUserDataPermission(id: any) {
    return this.http.post<any>(GlobalVariable.BASE_API_URL + '/swdUserDataPermissions', id);
  }

  delUserDataPermission(id: any) {
    return this.http.delete<any>(GlobalVariable.BASE_API_URL + '/swdUserDataPermissions/' + id);
  }


  findSysroleByIdModelAndPkeyAndPermission(model, pkey, permission) {
    return this.http.get<any>(GlobalVariable.BASE_API_URL + '/swdSysroleDataPermissions/search/findByIdModelAndIdPkeyAndIdPermission', { params: { model: model, pkey: pkey, permission: permission } })
  }

  saveSysroleDataPermission(id: any) {
    return this.http.post<any>(GlobalVariable.BASE_API_URL + '/swdSysroleDataPermissions', id);
  }

  delSysroleDataPermission(id: any) {
    return this.http.delete<any>(GlobalVariable.BASE_API_URL + '/swdSysroleDataPermissions/' + id);
  }

}
