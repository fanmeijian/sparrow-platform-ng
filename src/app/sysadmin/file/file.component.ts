import { Component, OnInit } from '@angular/core';
import {FileService} from '../../service/file.service'
import { MatDialog } from '@angular/material/dialog';
import {FilePermissionComponent} from '../file-permission/file-permission.component'
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  selectedFiles: FileList;
  list:any[];
  dataSource: MatTableDataSource<any>;
  columnsToDisplay = ['id', 'name', 'hash', 'path', 'operation'];


  constructor(private service:FileService,public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource();
   }

  ngOnInit(): void {
    this.service.list().subscribe(res=>this.dataSource.data=res);
  }

  openDialog(o:any){
    this.dialog.open(FilePermissionComponent,{width:'80%',data:o});
  }

  selectFiles(event): void {
    
    this.selectedFiles = event.target.files;
  }

  uploadFiles(){
    this.service.upload(this.selectedFiles[0]).subscribe(res=>this.ngOnInit());
  }

  showUsers(o: any) {
    this.dialog.open(FilePermissionComponent, { width: '80%', data: o });
  }

  showSysroles(o: any) {

  }

  showField(o: any) {
    if (!o) {
      o = new Object();
      o.action = "new";
      o.id = new Object();
      this.dataSource.data.unshift(o);
      this.dataSource.filter = "";
    } else {
      o.action = "edit";
    }
  }

  delete(o: any) {
    this.dataSource.data=this.dataSource.data.filter(f=>f!=o);
    this.dataSource.filter='';
    this.service.delete(o.id).subscribe();
  }

  save(o: any, i: number) {
    // let o = this.dataSource.data[i];
    if (o.action == "edit") {
      this.service.put(o).subscribe(res => { o = res });
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
