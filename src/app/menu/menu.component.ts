import { Component, OnInit } from '@angular/core';
import { MenuService } from '../service/menu.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menus: any[];
  dataSourceLength: number;
  dataSource: MatTableDataSource<any>;


  length:any;
  pageSize = 10;
  pageEvent: PageEvent;

  columnsToDisplay = ["id", "name", "url", "parent", "operation"];
  constructor(private service: MenuService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.service.getMenus(10, 0).subscribe(res => { this.dataSource.data = res._embedded.swdMenus; this.dataSourceLength = this.dataSource.data.length,this.length=res.page.totalElements });
  }

  pageChange(pageEvent: PageEvent) {
    if (pageEvent) {
      this.service.getMenus(pageEvent.pageSize, pageEvent.pageIndex).subscribe(res => { this.dataSource.data = res._embedded.swdMenus; this.dataSourceLength = this.dataSource.data.length;this.length=res.page.totalElements });

    }
    return this.dataSource;
  }


  openDialog(o: any): void {
    if (!o) {
      o = new Object();
      o.action = "new";
      this.dataSource.data.unshift(o);
      this.dataSource.filter = "";
    } else {
      o.action = "edit";
    }

  }

  delete(o: any) {
    this.dataSource.data = this.dataSource.data.filter(m => m != o);
    this.service.delete(o).subscribe();
  }

  save(o: any, i: number) {
    // let o = this.dataSource.data[i];
    if (o.action == "edit") {
      o.parentId = o.parentId[0];
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
}




