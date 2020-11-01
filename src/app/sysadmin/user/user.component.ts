import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MenuService } from '../../service/menu.service';
import { ComponentType } from '@angular/cdk/portal';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { UserAuthorityComponent } from '../user-authority/user-authority.component';
import { SysroleComponent } from '../sysrole/sysrole.component';
import { UserSysroleComponent } from '../user-sysrole/user-sysrole.component';




@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {





  menus: any[];
  list: any[];
  columnsToDisplay = ["id", "name", "password", "operation"];



  constructor(private service: UserService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.service.list().subscribe(res => { this.list = res._embedded.swdUsers;; });

  }

  //check the user menus
  dialogRef: MatDialogRef<any>;
  userMenus: any[];
  userAuthorities: any[];

  showMenus(o) {
    // this.service.userMenus(o).subscribe(res => this.userMenus = res._embedded.swdMenus);
    this.dialogRef = this.dialog.open(UserMenuComponent, { width: '80%', data: o });
  }

  showAuthorities(o: any) {
    // this.service.userAuthorities(o).subscribe(res => this.userAuthorities = res._embedded.swdAuthorities);
    this.dialogRef = this.dialog.open(UserAuthorityComponent, { width: '80%', data: o });
  }
  showSysroles(o: any) {
    this.dialogRef = this.dialog.open(UserSysroleComponent, { width: '80%', data: o });
  }

  closeDialog() {
    this.dialogRef.close();
  }



}
