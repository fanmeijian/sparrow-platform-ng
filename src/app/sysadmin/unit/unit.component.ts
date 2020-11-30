import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UnitService } from '../../service/unit.service'

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  items: any[];
  dataSource: MatTableDataSource<any>=new MatTableDataSource<any>();
  columnsToDisplay=['id','name','code','stat','parent','organization','operation'];
  total: number;//总数量
  pageSize: number = 10;//每页默认大小


  constructor(private service : UnitService) { }

  ngOnInit(): void {
    this.service.list(0,10).subscribe(res=>{
      this.dataSource.data = res._embedded.swdUnits;
      this.total = res.page.totalElements;
    });
  }

  //创建或查看详情
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

  //翻页事件
  pageChange(pageEvent: PageEvent) {
    if (pageEvent) {
      this.service.list(pageEvent.pageIndex, pageEvent.pageSize).subscribe(res => { this.dataSource.data = res._embedded.swdUnits;this.total=res.page.totalElements });
    }
    return this.dataSource;
  }


  delete(o: any) {
    this.dataSource.data = this.dataSource.data.filter(m => m != o);
    // this.service.delete(o).subscribe();
  }

  save(o: any, i: number) {
    // let o = this.dataSource.data[i];
    if (o.action == "edit") {
      o.parentId = o.parentId[0];
      // this.service.put(o).subscribe(res => { o = res });
    } else {
      // this.service.post(o).subscribe(res => { this.dataSource.data.splice(i, 1); this.dataSource.data.splice(i, 0, res); this.dataSource.filter = "" });
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
