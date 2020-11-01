import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';


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
    return this.http.get("http://localhost:6060/swdMenus",{params:{'size':size.toString(),'page':page.toString()}});
  }


  post(menu:any){
    menu.sort=0;
    menu.parentId=menu.parentId[0];
    return this.http.post("http://localhost:6060/swdMenus",menu);
  }

  getMenuTree():Observable<any>{
    // httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // };
    return this.http.get("http://localhost:6060/menuTrees");
  }

  delete(menu:any){
    return this.http.delete(menu._links.self.href);
  }

  put(menu:any){
    return this.http.put(menu._links.self.href,menu);
  }
  
}
