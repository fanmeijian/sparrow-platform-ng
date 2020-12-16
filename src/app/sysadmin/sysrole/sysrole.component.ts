import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SysroleService } from '../../service/sysrole.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SysroleMenuComponent } from '../sysrole-menu/sysrole-menu.component';
import { SysroleAuthorityComponent } from '../sysrole-authority/sysrole-authority.component';
import { PageEvent } from '@angular/material/paginator';
import { SpringEmbeddedList, SwdSysrolesRep } from '../../global';

export class SwdSysroleList extends SpringEmbeddedList{
  swdSysroles: SwdSysrolesRep[];
}

@Component({
  selector: 'app-sysrole',
  templateUrl: './sysrole.component.html',
  styleUrls: ['./sysrole.component.css']
})
export class SysroleComponent implements OnInit {

  swdSysroleList: SwdSysroleList;
  totalElements: number;
  pageSize = 10;
  pageEvent: PageEvent;
  dataSource: MatTableDataSource<SwdSysrolesRep>;
  length: any;

  // @ViewChild('newDialog', { static: true }) newDialog: TemplateRef<any>;

  constructor(private service: SysroleService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
   }

  ngOnInit(): void {
    this.service.list(0,10).subscribe(res => { 
      this.swdSysroleList = res._embedded;
      this.dataSource.data = this.swdSysroleList.swdSysroles;
      this.totalElements = res.page.totalElements;
    });
    
  }

  delete(o: any) {
    this.service.delete(o).subscribe(res => this.dataSource.data = this.dataSource.data.filter(h => h != o));
  }

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
      this.dataSource.data.unshift(o);
      this.dataSource.filter = "";
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
      this.service.post(o).subscribe(res => { 
        o._links = res._links;
      });
    }
    delete o.action;
  }

  cancel(o:any,i: number) {
    if(o.action=="new"){
      this.dataSource.data.splice(i, 1);
      this.dataSource.filter = "";
    }

    delete o.action;
    
  }
  pageChange(pageEvent: PageEvent) {
    if (pageEvent) {
      this.service.list(pageEvent.pageIndex, pageEvent.pageSize).subscribe(res => { 
        this.dataSource.data = res._embedded[Object.keys(res._embedded)[0]]; 
        this.length = res.page.totalElements;
      });

    }
    return this.dataSource;
  }

}

