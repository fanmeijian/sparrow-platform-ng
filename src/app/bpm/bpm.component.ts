import { Component, OnInit, ViewChild ,AfterContentInit,EventEmitter,Output,ElementRef} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { BpmnEditorComponent } from 'ng-bpmn';
import { HttpClient } from '@angular/common/http';
import {Options} from 'bpmn-js'
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';


@Component({
  selector: 'app-bpm',
  templateUrl: './bpm.component.html',
  styleUrls: ['./bpm.component.css']
})
export class BpmComponent implements OnInit,AfterContentInit {

// instantiate BpmnJS with component
private bpmnJS: BpmnJS;

  // @ViewChild('ucBpmn') ucBpmn: BpmnEditorComponent;
  @ViewChild('ucBpmn', { static: true }) private el: ElementRef;
  @Output() private importDone: EventEmitter<any> = new EventEmitter();


  public data: any;
  options: Options;
  
  constructor(
    private http: HttpClient) {
      this.bpmnJS = new BpmnJS();
      
      this.bpmnJS.on('import.done', ({ error }) => {
        if (!error) {
          this.bpmnJS.get('canvas').zoom('fit-viewport');
        }
      });
    }

    ep(){
      
      this.bpmnJS.saveXML(this.options, (err, xml) => {
        console.log(err+xml);
      });
    }

    ngAfterContentInit(): void {
      // attach BpmnJS instance to DOM element
      this.bpmnJS.attachTo(this.el.nativeElement);
    }
  
    ngOnInit() {
      
    
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
