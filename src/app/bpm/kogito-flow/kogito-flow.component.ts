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

export const MY_FORM_MODEL: DynamicFormModel = [

  new DynamicInputModel({

    id: "sampleInput",
    label: "Sample Input",
    maxLength: 42,
    placeholder: "Sample input"
  }),

  new DynamicRadioGroupModel<string>({

    id: "sampleRadioGroup",
    label: "Sample Radio Group",
    options: [
      {
        label: "Option 1",
        value: "option-1",
      },
      {
        label: "Option 2",
        value: "option-2"
      },
      {
        label: "Option 3",
        value: "option-3"
      }
    ],
    value: "option-3"
  }),

  new DynamicCheckboxModel({

    id: "sampleCheckbox",
    label: "I do agree"
  })
];

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



  // formModel: DynamicFormModel = MY_FORM_MODEL;
  formGroup: FormGroup;
  formModel: DynamicFormModel;

  ngOnInit(): void {
    this.restoreForm();
    this.formGroup = this.formService.createFormGroup(this.formModel);


    let pageable: Pageable = new Pageable();
    pageable.sort = 'started';
    pageable.direction = 'desc';
    this.kogitoFlowService.get(pageable).subscribe(res=>{
      this.dataSource.data = res._embedded.kogitoFlows;
      this.totalElements = res.totalElements;
    });
  }



  storeForm() {

    let json: string = JSON.stringify(this.formModel);
    console.log(json);
  }

  restoreForm() {

    let json: string = `[{"asyncValidators":null,"errorMessages":null,"hidden":false,"id":"sampleInput","label":"Sample Input","labelTooltip":null,"controlTooltip":null,"layout":null,"name":"sampleInput","relations":[],"updateOn":null,"validators":null,"disabled":false,"additional":null,"hint":null,"required":false,"tabIndex":null,"value":null,"autoComplete":"on","autoFocus":false,"maxLength":42,"minLength":null,"placeholder":"Sample input","prefix":null,"readOnly":false,"spellCheck":false,"suffix":null,"list":null,"type":"INPUT","accept":null,"inputType":"text","mask":null,"max":null,"min":null,"multiple":null,"pattern":null,"step":null},{"asyncValidators":null,"errorMessages":null,"hidden":false,"id":"sampleRadioGroup","label":"Sample Radio Group","labelTooltip":null,"controlTooltip":null,"layout":null,"name":"sampleRadioGroup","relations":[],"updateOn":null,"validators":null,"disabled":false,"additional":null,"hint":null,"required":false,"tabIndex":null,"value":"option-3","options":[{"disabled":false,"label":"Option 1","value":"option-1"},{"disabled":false,"label":"Option 2","value":"option-2"},{"disabled":false,"label":"Option 3","value":"option-3"}],"type":"RADIO_GROUP","legend":null},{"asyncValidators":null,"errorMessages":null,"hidden":false,"id":"sampleCheckbox","label":"I do agree","labelTooltip":null,"controlTooltip":null,"layout":null,"name":"sampleCheckbox","relations":[],"updateOn":null,"validators":null,"disabled":false,"additional":null,"hint":null,"required":false,"tabIndex":null,"value":false,"labelPosition":null,"type":"CHECKBOX","indeterminate":false}]`;

    // ...load JSON from localStorage or server

    this.formModel = this.formService.fromJSON(json);
  }

  @ViewChild('tlNewFlow') tlDeployFlow: TemplateRef<any>;
  deployFlow(){
    this.dialog.open(this.tlDeployFlow,{data: new KogitoFlow()});
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
