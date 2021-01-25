import { TemplateRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// import { DynamicFormModel, DynamicInputModel, DynamicRadioGroupModel, DynamicCheckboxModel, DynamicFormService } from '@ng-dynamic-forms/core';
import { Pageable } from '../../model/pageable';
import { KogitoFlowService } from '../../service/kogito-flow.service';


// export const MY_FORM_MODEL: DynamicFormModel = [

//   new DynamicInputModel({

//     id: "sampleInput",
//     label: "Sample Input",
//     maxLength: 42,
//     placeholder: "Sample input"
//   }),

//   new DynamicRadioGroupModel<string>({

//     id: "sampleRadioGroup",
//     label: "Sample Radio Group",
//     options: [
//       {
//         label: "Option 1",
//         value: "option-1",
//       },
//       {
//         label: "Option 2",
//         value: "option-2"
//       },
//       {
//         label: "Option 3",
//         value: "option-3"
//       }
//     ],
//     value: "option-3"
//   }),

//   new DynamicCheckboxModel({

//     id: "sampleCheckbox",
//     label: "I do agree"
//   })
// ];


@Component({
  selector: 'app-flow-form',
  templateUrl: './flow-form.component.html',
  styleUrls: ['./flow-form.component.css']
})
export class FlowFormComponent implements OnInit {
 
  aaa: string;
  // formModel: DynamicFormModel = MY_FORM_MODEL;
  // formGroup: FormGroup;
  // formModel: DynamicFormModel;

  totalElements: number;
  pageSize: number = 10;

  dataSource = new MatTableDataSource<any>();
  columnsToDisplay = ['sn','id',  'processId', 'taskId', 'operation'];


  constructor(private dialog: MatDialog,private flowService: KogitoFlowService) { }

  ngOnInit(): void {
    // this.restoreForm();
    // this.aaa = JSON.stringify(MY_FORM_MODEL);
    // this.formGroup = this.formService.createFormGroup(this.formModel);
    // let pageable: Pageable = new Pageable();
    // pageable.page = 0;
    // this.flowService.getFlowForm(new Pageable()).subscribe(res => {
    //   this.dataSource.data = res._embedded.flowForms;
    //   this.totalElements = res.totalElements;
    // });
  }
  
  
  storeForm(data) {
    let json: string = JSON.stringify(data.formModel);
    // console.log(json);
    this.flowService.saveForm(json).subscribe(res=>{
      console.log(res)
    });
  }

  // @ViewChild('tlFlowForm') tlFlowForm: TemplateRef<any>;
  openFlowForm(flowForm:any){
    // this.dialog.open(this.tlFlowForm,{data: {formModel: this.formService.fromJSON(flowForm.formString), formGroup: this.formService.createFormGroup(this.formService.fromJSON(flowForm.formString))}})
  }

  restoreForm() {

    // let json: string = `[{"asyncValidators":null,"errorMessages":null,"hidden":false,"id":"sampleInput","label":"Sample Input","labelTooltip":null,"controlTooltip":null,"layout":null,"name":"sampleInput","relations":[],"updateOn":null,"validators":null,"disabled":false,"additional":null,"hint":null,"required":false,"tabIndex":null,"value":null,"autoComplete":"on","autoFocus":false,"maxLength":42,"minLength":null,"placeholder":"Sample input","prefix":null,"readOnly":false,"spellCheck":false,"suffix":null,"list":null,"type":"INPUT","accept":null,"inputType":"text","mask":null,"max":null,"min":null,"multiple":null,"pattern":null,"step":null},{"asyncValidators":null,"errorMessages":null,"hidden":false,"id":"sampleRadioGroup","label":"Sample Radio Group","labelTooltip":null,"controlTooltip":null,"layout":null,"name":"sampleRadioGroup","relations":[],"updateOn":null,"validators":null,"disabled":false,"additional":null,"hint":null,"required":false,"tabIndex":null,"value":"option-3","options":[{"disabled":false,"label":"Option 1","value":"option-1"},{"disabled":false,"label":"Option 2","value":"option-2"},{"disabled":false,"label":"Option 3","value":"option-3"}],"type":"RADIO_GROUP","legend":null},{"asyncValidators":null,"errorMessages":null,"hidden":false,"id":"sampleCheckbox","label":"I do agree","labelTooltip":null,"controlTooltip":null,"layout":null,"name":"sampleCheckbox","relations":[],"updateOn":null,"validators":null,"disabled":false,"additional":null,"hint":null,"required":false,"tabIndex":null,"value":false,"labelPosition":null,"type":"CHECKBOX","indeterminate":false}]`;
    // this.formModel = this.formService.fromJSON(this.aaa);
  }


  //翻页事件
  pageChange(pageEvent: PageEvent) {
    if (pageEvent) {
      let pageable: Pageable = new Pageable();
      pageable.page = pageEvent.pageIndex;
      pageable.size = pageEvent.pageSize;
      pageable.sort = 'started';
      pageable.direction = 'desc';
      this.flowService.getFlowForm(pageable).subscribe(res => {
        this.dataSource.data = res.content;
        this.totalElements = res.totalElements;
      });

    }
    return this.dataSource;
  }


}
