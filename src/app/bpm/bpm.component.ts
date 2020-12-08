import { Component, OnInit, ViewChild ,AfterContentInit,EventEmitter,Output,ElementRef, TemplateRef} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { BpmnEditorComponent } from 'ng-bpmn';
import { HttpClient } from '@angular/common/http';
import {Options} from 'bpmn-js'
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';
import {MatRadioModule} from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

export class TrialApply{
  name: string;
  email: string;
  company: string;
  mobile: string;
}

export class Process{
  cooperativeIntention: boolean;
  trialApply: TrialApply;
}

@Component({
  selector: 'app-bpm',
  templateUrl: './bpm.component.html',
  styleUrls: ['./bpm.component.css']
})
export class BpmComponent implements OnInit,AfterContentInit {

  host = 'http://localhost:8080';
  trialApply: TrialApply = new TrialApply();

  process: Process = new Process();
  columnsToDisplay=['id','name','code','member','stat','operation'];
  list: any;
  apply(){
    
    this.http.post(this.host+ '/sparrowTrial',{trialApply: this.trialApply}).subscribe();
  }

  complete(){
    this.http.post(this.host + '/sparrowTrial/5ffa60cb-e187-4343-9d4e-407e658e155c/trialFollow/4f84791e-b67c-4277-8762-dacb043d9ca2?phase=complete',{cooperativeIntention: this.process.cooperativeIntention}).subscribe(res=>{
      console.log(res);
    });
  }


// instantiate BpmnJS with component
private bpmnJS: BpmnJS;

  // @ViewChild('ucBpmn') ucBpmn: BpmnEditorComponent;
  @ViewChild('ucBpmn', { static: true }) private el: ElementRef;
  @Output() private importDone: EventEmitter<any> = new EventEmitter();

  
  dataSource = new MatTableDataSource<any>();
  dataSourceProcess = new MatTableDataSource<any>();
  public data: any[];
  options: Options;
  
  constructor(
    private http: HttpClient,
    private dialog: MatDialog
    ) {
      this.bpmnJS = new BpmnJS();
      
      this.bpmnJS.on('import.done', ({ error }) => {
        if (!error) {
          this.bpmnJS.get('canvas').zoom('fit-viewport');
        }
      });
    }

    @ViewChild('sparrowTrial') sparrowTrialTmp: TemplateRef<any>;

    startProcess(){
      
      this.dialog.open(this.sparrowTrialTmp);
    }

    approve(o:any){
      let processInstanceId = o.processInstanceId;
      this.http.post('http://localhost:8080/sparrowTrial/' + processInstanceId +'/' + o.name + '/' + o.id + '?user=sysadmin&group='+o.potentialGroups[0],{cooperativeIntention: true}).subscribe(res=>{
        // this.ngOnInit();
      });
    }

    ep(){
      
      this.bpmnJS.saveXML(this.options, (err, xml) => {
        console.log(err+xml);
      });
    }

    ngAfterContentInit(): void {
      // attach BpmnJS instance to DOM element
      // this.bpmnJS.attachTo(this.el.nativeElement);
    }
  
    ngOnInit() {
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


      let gqlProcess = `{
        ProcessInstances{
          processName,
          endpoint,
          state,
          roles
          id,
          processId,
          start
        }
      }`;

      this.http.post<any>('http://localhost:8180/graphql',{query: gql}).subscribe(res=>{
        this.dataSource.data = res.data.UserTaskInstances;
      });

      this.http.post<any>('http://localhost:8180/graphql',{query: gqlProcess}).subscribe(res=>{
        this.dataSourceProcess.data = res.data.ProcessInstances;
      });

      // this.http.get<Process>(this.host+ '/sparrowTrial/5ffa60cb-e187-4343-9d4e-407e658e155c').subscribe(res=>{
      //   this.process = res;
      // });
    
      // this.ucBpmn.loadUrl('/assets/default.bpmn');
      const url = '../assets/default.bpmn';
      this.http.get(url, {
        headers: {observe: 'response'}, responseType: 'text'
      }).subscribe(
        (x: any) => {
          // console.log(this.ucBpmn);
          // this.ucBpmn.loadXml(x);
          this.bpmnJS.importXML(x, (err, warnings) => {
            console.log(err);
          });
        }
        
      );
    }
}
