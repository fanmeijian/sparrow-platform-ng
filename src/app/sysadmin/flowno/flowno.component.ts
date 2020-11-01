import { Component, OnInit } from '@angular/core';
import { FlownoService} from '../../service/flowno.service'

@Component({
  selector: 'app-flowno',
  templateUrl: './flowno.component.html',
  styleUrls: ['./flowno.component.css']
})
export class FlownoComponent implements OnInit {
  items:any[];
  constructor(private service:FlownoService) { }

  ngOnInit(): void {
    this.service.list().subscribe(res=>this.items=res._embedded.swdFlowNoes);
  }

}
