import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  DynamicFormModel,
  DynamicCheckboxModel,
  DynamicInputModel,
  DynamicRadioGroupModel
} from "@ng-dynamic-forms/core";

import { DynamicFormService } from "@ng-dynamic-forms/core";
import { Pageable } from '../../model/pageable';
import { UserTaskInstance } from '../../model/user-task-instance';
import { KogitoFlowService } from '../../service/kogito-flow.service';
import { KogitoFlow } from '../../model/kogito-flow'
import { ViewChild } from '@angular/core';
import { UserFlowComponent } from '../user-flow/user-flow.component';
import { SysroleFlowComponent } from '../sysrole-flow/sysrole-flow.component';

@Component({
  selector: 'app-kogito-flow',
  templateUrl: './kogito-flow.component.html',
  styleUrls: ['./kogito-flow.component.css']
})
export class KogitoFlowComponent implements OnInit {


  totalElements: number;
  pageSize: number = 10;
  userTaskInstance: UserTaskInstance;
  cooperativeIntention: boolean;

  dataSource = new MatTableDataSource<KogitoFlow>();
  constructor(private formService: DynamicFormService, private http: HttpClient, private dialog: MatDialog, private kogitoFlowService: KogitoFlowService) { }
  columnsToDisplay = ['id', 'name', 'processId', 'serviceName','version', 'state', 'operation'];



  ngOnInit(): void {
    let pageable: Pageable = new Pageable();
    pageable.sort = 'started';
    pageable.direction = 'desc';
    this.kogitoFlowService.get(pageable).subscribe(res=>{
      this.dataSource.data = res._embedded.kogitoFlows;
      this.totalElements = res.totalElements;
    });
  }

  @ViewChild('tlNewFlow') tlDeployFlow: TemplateRef<any>;
  deployFlow(){
    this.dialog.open(this.tlDeployFlow,{data: new KogitoFlow(), width:'80%'});
  }

  saveKogitoFlow(flow: KogitoFlow){
    this.kogitoFlowService.saveFlow(flow).subscribe(res=>{
      console.log(res);
    });
  }

  saveUserFlow(userFlow: any){
    this.kogitoFlowService.saveUserFlow(userFlow).subscribe(res=>{
      console.log(res);
    });
  }

  saveSysroleFlow(sysroleFlow: any){
    this.kogitoFlowService.saveSysroleFlow(sysroleFlow).subscribe(res=>{
      console.log(res);
    });
  }

  openUserFlow(data:any){
    this.dialog.open(UserFlowComponent,{data: data, width: '80%'});
  }

  openSysroleFlow(data:any){
    this.dialog.open(SysroleFlowComponent,{data: data, width: '80%'});
  }

  //翻页事件
  pageChange(pageEvent: PageEvent) {
    if (pageEvent) {
      let pageable: Pageable = new Pageable();
      pageable.page = pageEvent.pageIndex;
      pageable.size = pageEvent.pageSize;
      pageable.sort = 'started';
      pageable.direction = 'desc';
      this.kogitoFlowService.userTask(pageable).subscribe(res => {
        this.dataSource.data = res.content;
        this.totalElements = res.totalElements;
      });

    }
    return this.dataSource;
  }

}
