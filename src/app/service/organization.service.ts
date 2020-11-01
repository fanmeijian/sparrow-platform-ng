import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../global';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }

  list(size: number, page: number) {
    let httpParams: HttpParams = new HttpParams();
    httpParams.append('size', size.toString());
    httpParams.append('page', page.toString());
    return this.http.get<any>(GlobalVariable.BASE_API_URL + '/swdOrganizations', { params: { 'size': size.toString(), 'page': page.toString() } });

  }

  get() {

  }

  put() {

  }

  post() {

  }

  delete() {

  }

}
