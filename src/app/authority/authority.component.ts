import { Component, OnInit, Inject } from '@angular/core';
import { AuthorityService } from '../service/authority.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.css']
})
export class AuthorityComponent implements OnInit {

  authorities: any[];
  columnsToDisplay = ["id", "name", "url", "operation"];
  dataSource: MatTableDataSource<any>;

  length: any;
  pageSize = 10;
  pageEvent: PageEvent;

  constructor(private service: AuthorityService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.service.list(this.pageSize, 0).subscribe(res => { this.dataSource.data = res._embedded[Object.keys(res._embedded)[0]]; this.length = res.page.totalElements });
  }

  delete(o: any) {
    this.service.delete(o).subscribe(res => this.dataSource.data = this.dataSource.data.filter(h => h != o));
  }

  pageChange(pageEvent: PageEvent) {
    if (pageEvent) {
      this.service.list(pageEvent.pageSize, pageEvent.pageIndex).subscribe(res => { this.dataSource.data = res._embedded[Object.keys(res._embedded)[0]]; this.length = res.page.totalElements });

    }
    return this.dataSource;
  }



  open(o: any) {
    if (o) {
      o.edit = true;
    } else {
      o = new Object();
      o.new = true;
      this.dataSource.data.unshift(o);
    }
    this.dataSource.filter = '';
  }

  save(o: any, i: number) {
    if (o.edit) {
      delete o.edit;
      this.service.put(o).subscribe();
    }
    if (o.new) {
      delete o.new;
      this.service.post(o).subscribe(res => {
        this.dataSource.data[i]._links = res._links;
        this.dataSource.filter = '';
      });
    }
  }

  cancel(o: any, i: number) {
    this.dataSource.data.splice(i, 1);
    this.dataSource.filter = '';
  }

}

