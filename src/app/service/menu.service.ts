import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../global';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }
  getMenus(size:number,page:number):Observable<any>{
    // httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // };
    if(size===0){
      size=20;
    }
    let httpParams:HttpParams=new HttpParams();
    httpParams.append('size',size.toString());
    httpParams.append('page',page.toString());
    // console.log(httpParams);
    return this.http.get(GlobalVariable.BASE_API_URL+"/swdMenus",{params:{'size':size.toString(),'page':page.toString()}});
  }


  post(menu:any){
    menu.sort=0;
    menu.parentId=menu.parentId[0];
    return this.http.post(GlobalVariable.BASE_API_URL+"/swdMenus",menu);
  }

  getMenuTree():Observable<any>{
    // httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // };
    return this.http.get(GlobalVariable.BASE_API_URL+"/menuTrees");
  }

  delete(menu:any){
    return this.http.delete(menu._links.self.href);
  }

  put(menu:any){
    return this.http.put(menu._links.self.href,menu);
  }
  
}
