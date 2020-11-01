import { Component, OnInit, Inject } from '@angular/core';
import { SysroleService } from '../../service/sysrole.service';
import { AuthorityService } from '../../service/authority.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserAuthorityComponent } from '../user-authority/user-authority.component';

@Component({
  selector: 'app-sysrole-authority',
  templateUrl: './sysrole-authority.component.html',
  styleUrls: ['./sysrole-authority.component.css']
})
export class SysroleAuthorityComponent implements OnInit {
  sysroleAuthorities: any[];
  authorities: any[];
  constructor(private sysroleService: SysroleService, private authorityService: AuthorityService, public dialogRef: MatDialogRef<UserAuthorityComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit(): void {
    this.authorityService.listWithSysrole(this.dialogData._links.self.href.split("/").slice(-1)).subscribe(res=>this.authorities=res);

  }

  saveAuthority() {

    this.sysroleAuthorities = this.authorities.filter(o => o.checked);
    let o:any=new Object();
    o.sysroleId=this.dialogData._links.self.href.split("/").slice(-1)[0];
    o.authorities=this.sysroleAuthorities;
    this.sysroleService.saveSysroleAuthorities(o).subscribe();
  }
}
