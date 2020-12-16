import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../global';
import { KogitoFlow } from '../model/kogito-flow';
import { Pageable } from '../model/pageable'
import { UserFlow, UserFlowPK } from '../model/user-flow'

@Injectable({
  providedIn: 'root'
})
export class KogitoFlowService {

  constructor(private http : HttpClient) { }

  startProcess(processId: String, body: any){

    return this.http.post<any>(GlobalVariable.SPARROW_BPM_URL+"/startProcess/"+processId, body);
  }

  get(pageable: Pageable){
    return this.http.get<any>(GlobalVariable.SPARROW_BPM_URL+"/kogitoFlows",{params: pageable.getHttpParams()});
  }

  myKogitoFlow(){
    return this.http.get<any>(GlobalVariable.SPARROW_BPM_URL+"/myKogitoFlow");
  }

  userTask(pageable: Pageable){ 
    return this.http.get<any>(GlobalVariable.SPARROW_BPM_URL+"/userTask",{params: pageable.getHttpParams()});
  }

  saveFlow(data: KogitoFlow){
    return this.http.post<any>(GlobalVariable.SPARROW_BPM_URL+"/kogitoFlows",data);
  }

  findByIdFlowId(flowId: string){
    return this.http.get<any>(GlobalVariable.SPARROW_BPM_URL+"/userFlows/search/findByIdFlowId",{params: {flowId: flowId}});
  }

  delUserFlow(id: UserFlowPK){
    return this.http.delete(GlobalVariable.SPARROW_BPM_URL+'/userFlows/'+id.toIdString());
  }

  //保存用户授权流程
  saveUserFlow(data: UserFlow){
    return this.http.post<any>(GlobalVariable.SPARROW_BPM_URL+"/userFlows",data);
  }

  //保存角色授权流程
  saveSysroleFlow(data: any){
    return this.http.post<any>(GlobalVariable.SPARROW_BPM_URL+"/sysroleFlows",data);
  }

  saveForm(formString: any){
    return this.http.post<any>(GlobalVariable.SPARROW_BPM_URL+"/flowForms",{formString: formString});
  }

  getFlowForm(pageable: Pageable){
    return this.http.get<any>(GlobalVariable.SPARROW_BPM_URL+"/flowForms",{params: pageable.getHttpParams()});
  }

}
