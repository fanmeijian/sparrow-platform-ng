import { Component, OnInit } from '@angular/core';
import { AppManagementService } from '../../service/app-management.service'

@Component({
  selector: 'app-app-management',
  templateUrl: './app-management.component.html',
  styleUrls: ['./app-management.component.css']
})
export class AppManagementComponent implements OnInit {


  items:any[];

  constructor(private service : AppManagementService) { }


  ngOnInit(): void {
    this.service.list().subscribe(res=>this.items=res._embedded.swdApps);
  }

}
