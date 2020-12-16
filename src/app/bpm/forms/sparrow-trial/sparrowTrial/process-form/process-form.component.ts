import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KogitoFlowService } from 'projects/sparrow-platform-ng/src/app/service/kogito-flow.service';

@Component({
  selector: 'app-process-form',
  templateUrl: './process-form.component.html',
  styleUrls: ['./process-form.component.css']
})
export class ProcessFormComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog, private kogitoFlowService: KogitoFlowService) { }

  ngOnInit(): void {
  }
  
  applyTrial(trial: any){
    this.kogitoFlowService.startProcess(trial.flow.processId,{'trialApply':trial.data}).subscribe(res=>{
      this.ngOnInit();
      this.dialog.closeAll();
    });
  }

}
