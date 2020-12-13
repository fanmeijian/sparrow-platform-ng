import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  DynamicFormModel,
  DynamicCheckboxModel,
  DynamicInputModel,
  DynamicRadioGroupModel
} from "@ng-dynamic-forms/core";

import { DynamicFormService } from "@ng-dynamic-forms/core";

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


  // formModel: DynamicFormModel = MY_FORM_MODEL;
  formGroup: FormGroup;
  formModel: DynamicFormModel;
  constructor(private formService: DynamicFormService) { }

  ngOnInit(): void {
    this.restoreForm();
    this.formGroup = this.formService.createFormGroup(this.formModel);
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

}
