import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {DataPermissionService} from '../../service/data-permission.service'
import { UserFieldPermissionComponent } from '../user-field-permission/user-field-permission.component';

@Component({
  selector: 'app-data-permission',
  templateUrl: './data-permission.component.html',
  styleUrls: ['./data-permission.component.css']
})
export class DataPermissionComponent implements OnInit {
  columnsToDisplay = ['id', 'modelName', 'fieldName', 'model', 'field', 'operation'];
  list:any[];

  constructor(private service:DataPermissionService,public dialog: MatDialog) { 

    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.service.list().subscribe(res=>this.dataSource.data=res);
  }
  dataSource: MatTableDataSource<any>;

  
  showUsers(o: any) {
    this.dialog.open(UserFieldPermissionComponent, { width: '80%', data: o });
  }

  showSysroles(o: any) {

  }

  showField(o: any) {
    if (!o) {
      o = new Object();
      o.action = "new";
      o.id = new Object();
      this.dataSource.data.unshift(o);
      this.dataSource.filter = "";
    } else {
      o.action = "edit";
    }
  }

  delete(o: any) {
    this.dataSource.data=this.dataSource.data.filter(f=>f!=o);
    this.dataSource.filter='';
    this.service.delete(o.id).subscribe();
  }

  save(o: any, i: number) {
    // let o = this.dataSource.data[i];
    if (o.action == "edit") {
      this.service.put(o).subscribe(res => { o = res });
    } else {
      this.service.post(o).subscribe(res => { this.dataSource.data.splice(i, 1); this.dataSource.data.splice(i, 0, res); this.dataSource.filter = "" });
    }
    delete o.action;
  }

  cancel(o: any, i: number) {
    if (o.action == "new") {
      this.dataSource.data.splice(i, 1);
      this.dataSource.filter = "";
    } else {
      delete o.action;
    }

  }

}
