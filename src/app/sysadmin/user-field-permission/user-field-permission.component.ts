import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FieldPermissionService } from '../../service/field-permission.service';

@Component({
  selector: 'app-user-field-permission',
  templateUrl: './user-field-permission.component.html',
  styleUrls: ['./user-field-permission.component.css']
})
export class UserFieldPermissionComponent implements OnInit {
  userFieldPermissions: any[];
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private service: FieldPermissionService) {
    this.userFieldPermission = new Object();
    this.userFieldPermission.id = new Object();
  }

  ngOnInit(): void {
    this.service.listUsers(this.dialogData).subscribe(res => this.userFieldPermissions = res._embedded.swdUserFieldPermissions);
  }

  userFieldPermission: any;
  saveFieldPermission(userFieldPermission) {
    console.log(this.dialogData);
    userFieldPermission.id.model = this.dialogData._links.self.href.split('/').splice(-1)[0].split(',')[0];
    userFieldPermission.id.field = this.dialogData._links.self.href.split('/').splice(-1)[0].split(',')[1];
    userFieldPermission.id.permission = this.dialogData._links.self.href.split('/').splice(-1)[0].split(',')[2];
    this.service.saveUserFieldPermission(userFieldPermission).subscribe(res => {
      if (res.status === 201)
        // this.userFieldPermissions.push(res.body);
        this.ngOnInit();
    });
  }

  removeUserPermission(id: any) {
    console.log(id);
    this.userFieldPermissions = this.userFieldPermissions.filter(o => o.id != id);
    return this.service.removeUserFieldPermission(id).subscribe();
  }

}
