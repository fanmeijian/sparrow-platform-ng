import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileService } from '../../service/file.service';

@Component({
  selector: 'app-file-permission',
  templateUrl: './file-permission.component.html',
  styleUrls: ['./file-permission.component.css']
})
export class FilePermissionComponent implements OnInit {

  constructor(private fileService:FileService,@Inject(MAT_DIALOG_DATA) public dialogData: any) { }
  userFilePermissions:any[];
  sysroleFilePermissions:any[];
  file:any;
  userFilePermission:any=new Object();


  ngOnInit(): void {
    this.userFilePermission.id=new Object();
    this.fileService.listUserPermission(this.dialogData).subscribe(res=>this.userFilePermissions=res);
    this.fileService.listSysrolePermission(this.dialogData).subscribe(res=>this.sysroleFilePermissions=res);
    this.file=this.dialogData;
    this.userFilePermission.id.fileId=this.dialogData.id;
  }

  save(){
    this.fileService.saveUserFilePermission(this.userFilePermission).subscribe(res=>{
      this.ngOnInit();
    });
  }

  remove(id:string){

  }

}
