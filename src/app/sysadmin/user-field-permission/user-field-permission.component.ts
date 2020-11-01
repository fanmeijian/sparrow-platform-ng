import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FieldPermissionService } from '../../service/field-permission.service';

@Component({
  selector: 'app-user-field-permission',
  templateUrl: './user-field-permission.component.html',
  styleUrls: ['./user-field-permission.component.css']
})
export class UserFieldPermissionComponent implements OnInit {
  list: any[];
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private service: FieldPermissionService) { }

  ngOnInit(): void {
    this.service.listUsers(this.dialogData).subscribe(res => this.list = res);
    this.userFieldPermission = new Object();
    this.userFieldPermission.id = new Object();
  }

  userFieldPermission: any;
  saveFieldPermission() {
    console.log(this.dialogData);
    this.userFieldPermission.id.model=this.dialogData.id.model;
    this.userFieldPermission.id.field=this.dialogData.id.field;
    this.service.saveUserFieldPermission(this.userFieldPermission).subscribe(res=>this.list.push(res));
  }

  removeUserPermission(id:any){
    console.log(id);
    this.list=this.list.filter(o=>o.id!=id);
    return this.service.removeUserFieldPermission(id).subscribe();
    
  }

}
