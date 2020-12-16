import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FieldPermissionService } from '../../service/field-permission.service';

@Component({
  selector: 'app-sysrole-field-permission',
  templateUrl: './sysrole-field-permission.component.html',
  styleUrls: ['./sysrole-field-permission.component.css']
})
export class SysroleFieldPermissionComponent implements OnInit {
  sysroleFieldPermissions: any[];
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private service: FieldPermissionService) {
    this.sysroleFieldPermission = new Object();
    this.sysroleFieldPermission.id = new Object();
  }

  ngOnInit(): void {
    this.service.listSysroles(this.dialogData).subscribe(res => this.sysroleFieldPermissions = res._embedded.swdSysroleFieldPermissions);
  }

  sysroleFieldPermission: any;
  saveFieldPermission(sysroleFieldPermission) {
    console.log(this.dialogData);
    sysroleFieldPermission.id.model = this.dialogData._links.self.href.split('/').splice(-1)[0].split(',')[0];
    sysroleFieldPermission.id.field = this.dialogData._links.self.href.split('/').splice(-1)[0].split(',')[1];
    sysroleFieldPermission.id.permission = this.dialogData._links.self.href.split('/').splice(-1)[0].split(',')[2];
    this.service.saveSysroleFieldPermission(sysroleFieldPermission).subscribe(res => {
      if (res.status === 201)
        // this.userFieldPermissions.push(res.body);
        this.ngOnInit();
    });
  }

  removeUserPermission(id: any) {
    console.log(id);
    this.sysroleFieldPermissions = this.sysroleFieldPermissions.filter(o => o.id != id);
    return this.service.removeSysroleFieldPermission(id).subscribe();
  }

}
