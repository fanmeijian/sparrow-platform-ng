import { Component, OnInit } from '@angular/core';
import { FieldPermissionService } from '../../service/field-permission.service'
import { MatDialog } from '@angular/material/dialog';
import { UserFieldPermissionComponent } from '../user-field-permission/user-field-permission.component';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { SysroleFieldPermissionComponent } from '../sysrole-field-permission/sysrole-field-permission.component';

@Component({
  selector: 'app-field-permission',
  templateUrl: './field-permission.component.html',
  styleUrls: ['./field-permission.component.css']
})
export class FieldPermissionComponent implements OnInit {
  columnsToDisplay = ['id', 'modelName', 'fieldName', 'model', 'field', 'permission' ,'operation'];
  constructor(private service: FieldPermissionService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }
  field: any;


  totalElements: number;
  pageSize = 10;

  dataSource: MatTableDataSource<any>;

  ngOnInit(): void {
    this.service.list(0,10).subscribe(res => {  this.dataSource.data = res._embedded.swdFieldPermissions });
  }

  showUsers(o: any) {
    this.dialog.open(UserFieldPermissionComponent, { width: '80%', data: o });
  }

  showSysroles(o: any) {
    this.dialog.open(SysroleFieldPermissionComponent, { width: '80%', data: o });
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

  pageChange(pageEvent: PageEvent) {
    if (pageEvent) {
      this.service.list(pageEvent.pageIndex, pageEvent.pageSize).subscribe(res => { 
        this.dataSource.data = res._embedded[Object.keys(res._embedded)[0]]; 
      });

    }
    return this.dataSource;
  }
}
