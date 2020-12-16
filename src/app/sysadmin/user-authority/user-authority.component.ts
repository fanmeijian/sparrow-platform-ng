import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorityService } from '../../service/authority.service';

@Component({
  selector: 'app-user-authority',
  templateUrl: './user-authority.component.html',
  styleUrls: ['./user-authority.component.css']
})
export class UserAuthorityComponent implements OnInit {

  userAuthorities: any[];
  authorities: any[];
  constructor(private userServce: UserService, private authorityService: AuthorityService, public dialogRef: MatDialogRef<UserAuthorityComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit(): void {
    this.authorityService.listWithUser(this.dialogData._links.self.href.split("/").slice(-1)).subscribe(res=>this.authorities=res.data);
    // this.userServce.userAuthorities(this.dialogData).subscribe(res => {
    //   this.userAuthorities = res._embedded.swdAuthorities;
    //   this.authorityService.list().subscribe(userRes => {
    //     this.authorities = userRes._embedded.swdAuthorities;
    //     this.userAuthorities.forEach(o=>{});
    //   });
    // });
  }

  saveAuthority() {

    this.userAuthorities = this.authorities.filter(o => o.checked);
    let o:any=new Object();
    o.username=this.dialogData._links.self.href.split("/").slice(-1)[0];
    o.authorities=this.userAuthorities;
    this.userServce.saveUserAuthorities(o).subscribe();
  }
}
