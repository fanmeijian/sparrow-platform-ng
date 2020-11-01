import { Component, OnInit } from '@angular/core';
import { OperationLogService } from '../../service/operation-log.service';

@Component({
  selector: 'app-operation-log',
  templateUrl: './operation-log.component.html',
  styleUrls: ['./operation-log.component.css']
})
export class OperationLogComponent implements OnInit {

  items: any[];

  constructor(private service: OperationLogService) { }

  ngOnInit(): void {
    this.service.list().subscribe(res=>this.items=res);
  }

  tostring(o){
    return JSON.stringify(o);
  }

}
