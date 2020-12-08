import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalVariable } from '../global';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  constructor(private http: HttpClient) { }
  columnsToDisplay=['id','name','code','member','stat','operation'];
  ngOnInit(): void {
    let gql = `{
      UserTaskInstances(where:{potentialGroups:{contains:"trial-follower"}}){
        name,
        started,
        potentialGroups,
        potentialUsers,
        state,
        referenceName,
        endpoint,
        processId,
        processInstanceId,
        id
      }
    }`;

    this.http.post<any>(GlobalVariable.KOGITO_GQL_URL+'/graphql',{query: gql}).subscribe(res=>{
      this.dataSource.data = res.data.UserTaskInstances;
    });
  }

  complete(){
    // this.http.post(this.host + '/sparrowTrial/5ffa60cb-e187-4343-9d4e-407e658e155c/trialFollow/4f84791e-b67c-4277-8762-dacb043d9ca2?phase=complete',{cooperativeIntention: this.process.cooperativeIntention}).subscribe(res=>{
    //   console.log(res);
    // });
  }


}
