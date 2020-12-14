import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalVariable } from '../global';
import { UserTaskInstance } from '../../app/model/user-task-instance'
import { MatDialog } from '@angular/material/dialog';
import { TemplateRef } from '@angular/core';
import { KogitoFlowService } from '../../app/service/kogito-flow.service'
import { PageEvent } from '@angular/material/paginator';
import { Pageable } from '../model/pageable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  totalElements: number;
  pageSize: number = 10;
  userTaskInstance: UserTaskInstance;
  cooperativeIntention: boolean;

  dataSource = new MatTableDataSource<any>();
  constructor(private http: HttpClient, private dialog: MatDialog, private kogitoFlowService: KogitoFlowService) { }
  columnsToDisplay = ['id', 'name', 'code', 'started', 'stat','user','group', 'operation'];

  kogitoFlows:any[];

  ngOnInit(): void {
    // let gql = `{
    //   UserTaskInstances(where:{potentialGroups:{contains:"trial-follower"}}){
    //     name,
    //     started,
    //     potentialGroups,
    //     potentialUsers,
    //     state,
    //     referenceName,
    //     endpoint,
    //     processId,
    //     processInstanceId,
    //     id,
    //     inputs,
    //     outputs
    //   }
    // }`;

    // this.http.post<any>(GlobalVariable.KOGITO_GQL_URL + '/graphql', { query: gql }).subscribe(res => {
    //   this.dataSource.data = res.data.UserTaskInstances;
    // });
      let pageable: Pageable = new Pageable();
      pageable.sort = 'started';
      pageable.direction = 'desc';
      this.kogitoFlowService.userTask(pageable).subscribe(res=>{
      this.dataSource.data = res.content;
      this.totalElements = res.totalElements;
    });

    let pageable1: Pageable = new Pageable();
    pageable1.isPaged = false;
    this.kogitoFlowService.get(pageable1).subscribe(res=>{
      this.kogitoFlows = res._embedded.kogitoFlows;
    });
  }

  approval(endPoint: string, cooperativeIntention: boolean) {
    this.http.post(endPoint, { cooperativeIntention: cooperativeIntention }).subscribe(res => {
      console.log(res);
      this.dialog.closeAll();
      this.ngOnInit();
    });
  }

  applyTrial(trial: any){
    this.kogitoFlowService.startProcess(trial.flow.processId,{'trialApply':trial.data}).subscribe(res=>{
      this.ngOnInit();
      this.dialog.closeAll();
    });
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

  @ViewChild('sparrowTrial') sparrowTrialTmp: TemplateRef<any>;
  startProcess(kogitoFlow: any) {
    this.dialog.open(this.sparrowTrialTmp,{data: {data: new Object(), flow: kogitoFlow}});
  }


  @ViewChild('kogitoFlowsT') kogitoFlowsT: TemplateRef<any>;
  listFlow() {
    this.dialog.open(this.kogitoFlowsT,{data: new Object()});
  }

  // startProcess(data: any) {
  //   this.kogitoFlowService.post
  // }

  @ViewChild('userTaskInfo') userTaskInfoTmpl: TemplateRef<any>;
  openUserTask(userTaskInfo: UserTaskInstance) {
    // this.userTaskInstance = userTaskInfo;
    userTaskInfo.inputs = typeof userTaskInfo.inputs === 'string' ? JSON.parse(userTaskInfo.inputs.toString()) : userTaskInfo.inputs;
    userTaskInfo.outputs = userTaskInfo.outputs ? (typeof userTaskInfo.outputs === 'string' ? JSON.parse(userTaskInfo.outputs) : userTaskInfo.outputs) : new Object();

    this.dialog.open(this.userTaskInfoTmpl, { data: userTaskInfo, width: '400px' });

  }

}
