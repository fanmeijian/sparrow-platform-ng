import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../global';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http:HttpClient) { }


  list(page: number, size: number){
    return this.http.get<any>(GlobalVariable.BASE_API_URL + '/swdGroups',{ params: {size: size.toString(), page: page.toString()}});
  }
}
