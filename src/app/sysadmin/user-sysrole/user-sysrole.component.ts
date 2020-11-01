import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../service/user.service';
import { SysroleService } from '../../service/sysrole.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserAuthorityComponent } from '../user-authority/user-authority.component';

@Component({
  selector: 'app-user-sysrole',
  templateUrl: './user-sysrole.component.html',
  styleUrls: ['./user-sysrole.component.css']
})
export class UserSysroleComponent implements OnInit {

  sysroles:any[];

  constructor(private userServce: UserService, private sysroleService: SysroleService, public dialogRef: MatDialogRef<UserAuthorityComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit(): void {
    this.sysroleService.listWithUser(this.dialogData._links.self.href.split("/").slice(-1)).subscribe(res=>this.sysroles=res);
  }

  saveSysrole(){
    let userSysroles:any[] = this.sysroles.filter(o => o.checked);
    let o:any=new Object();
    o.username=this.dialogData._links.self.href.split("/").slice(-1)[0];
    o.sysroles=userSysroles;
    this.userServce.saveUserSysroles(o).subscribe();
  }
}
