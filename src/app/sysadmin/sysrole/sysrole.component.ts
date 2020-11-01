import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SysroleService } from '../../service/sysrole.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SysroleMenuComponent } from '../sysrole-menu/sysrole-menu.component';
import { SysroleAuthorityComponent } from '../sysrole-authority/sysrole-authority.component';

@Component({
  selector: 'app-sysrole',
  templateUrl: './sysrole.component.html',
  styleUrls: ['./sysrole.component.css']
})
export class SysroleComponent implements OnInit {

  @ViewChild('newDialog', { static: true }) newDialog: TemplateRef<any>;

  constructor(private service: SysroleService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.list().subscribe(res => { this.list.data = res._embedded.swdSysroles});
    this.list = new MatTableDataSource();
  }

  delete(o: any) {
    this.service.delete(o).subscribe(res => this.list.data = this.list.data.filter(h => h != o));
  }

  list: MatTableDataSource<any>;
  columnsToDisplay = ["id", "name", "operation"];

  dialogData: any;
  b: any;
  dialogRef: MatDialogRef<any>;
  openDialog(o: any): void {
   
    if(o){
      o.action="edit"
    }else{
      o=new Object();
      o.action="new";
      this.list.data.unshift(o);
      this.list.filter = "";
    }  
    
    
  }

  showMenus(o) {
    // this.service.userMenus(o).subscribe(res => this.userMenus = res._embedded.swdMenus);
    this.dialogRef = this.dialog.open(SysroleMenuComponent, { width: '80%', data: o });
  }

  showAuthorities(o: any) {
    // this.service.userAuthorities(o).subscribe(res => this.userAuthorities = res._embedded.swdAuthorities);
    this.dialogRef = this.dialog.open(SysroleAuthorityComponent, { width: '80%', data: o });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.dialogRef.close();

    if (this.dialogData._links) {
      this.service.put(this.dialogData).subscribe();
    } else {
      this.service.post(this.dialogData).subscribe();
    }
  }

  save(o:any,i: number) {
    // let o = this.list.data[i];
    if (o.action=="edit") {
      this.service.put(o).subscribe(res => { o = res });
    } else {
      this.service.post(o).subscribe(res => { this.list.data.splice(i, 1); this.list.data.splice(i, 0, res); this.list.filter = "" });
    }
    delete o.action;
  }

  cancel(o:any,i: number) {
    if(o.action=="new"){
      this.list.data.splice(i, 1);
      this.list.filter = "";
    }

    delete o.action;
    
  }

}

