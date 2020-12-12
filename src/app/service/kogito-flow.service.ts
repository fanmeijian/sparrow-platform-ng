import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../global';

@Injectable({
  providedIn: 'root'
})
export class KogitoFlowService {

  constructor(private http : HttpClient) { }

  startProcess(processId: String, body: any){

    return this.http.post<any>(GlobalVariable.SPARROW_BPM_URL+"/startProcess/"+processId, body);
  }

  get(){
    return this.http.get<any>(GlobalVariable.SPARROW_BPM_URL+"/kogitoFlows");
  }
}
