import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariable, SwdMenu } from '../global';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  apiUrl = GlobalVariable.BASE_API_URL + "/swdMenus";
  getMenus(size: number, page: number): Observable<any> {
    if (size === 0) {
      size = 20;
    }
    let httpParams: HttpParams = new HttpParams();
    httpParams.append('size', size.toString());
    httpParams.append('page', page.toString());
    // console.log(httpParams);
    return this.http.get(this.apiUrl, { params: { 'size': size.toString(), 'page': page.toString() } });
  }


  post(menu: SwdMenu) {
    menu.sort = 0;
    return this.http.post<any>(this.apiUrl, menu);
  }

  getMenuTree(): Observable<any> {
    return this.http.get(GlobalVariable.BASE_API_URL + "/menuTrees");
  }

  delete(id: string) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  put(menu: any) {
    return this.http.put(menu._links.self.href, menu);
  }

}
