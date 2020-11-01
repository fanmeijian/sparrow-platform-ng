import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { GlobalVariable } from '../global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<any>(GlobalVariable.BASE_API_URL+"/files");
  }

  saveUserFilePermission(o:any){
    //设置给用户权限
    return this.http.post(GlobalVariable.BASE_API_URL+'/swdUserFiles',o);
  }

  saveSysroleFilePermission(o:any){
    return this.http.post(GlobalVariable.BASE_API_URL+'/swdSysroleFiles',o);
  }

  listUserPermission(o:any){
    return this.http.get<any>(GlobalVariable.BASE_API_URL+"/userFilePermission/"+o.id);
  }

  listSysrolePermission(o:any){
    return this.http.get<any>(GlobalVariable.BASE_API_URL+"/sysroleFilePermission/"+o.id);
  }

  upload(file: File): Observable<HttpEvent<any>> {

    //https://bezkoder.com/angular-10-multiple-files-upload/
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${GlobalVariable.BASE_API_URL}/files`, formData, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  delete(id:any){
    return this.http.delete(GlobalVariable.BASE_API_URL+'/swdFiles/'+id);
  }

  put(o:any){
    return this.http.put(GlobalVariable.BASE_API_URL+'/swdFiles/'+o.id,o);
  }

}
