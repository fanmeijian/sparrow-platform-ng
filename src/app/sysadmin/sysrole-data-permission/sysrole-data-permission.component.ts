import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ElementRef, Inject, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DataPermissionService } from '../../service/data-permission.service';
import { SysroleService } from '../../service/sysrole.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-sysrole-data-permission',
  templateUrl: './sysrole-data-permission.component.html',
  styleUrls: ['./sysrole-data-permission.component.css']
})
export class SysroleDataPermissionComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<any[]>;
  fruits: any[] = [] ;
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'sysadmin'];
  flowId: string;

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private sysroleService: SysroleService,private service: DataPermissionService,@Inject(MAT_DIALOG_DATA) public dialogData: any ) {
    this.fruitCtrl.valueChanges.subscribe(o=>{
      this._filter(o);
    });
  }

  ngOnInit(): void {
    let id: string[] = this.dialogData._links.self.href.split('/').splice(-1)[0].split(',');
    this.service.findSysroleByIdModelAndPkeyAndPermission(id[0],id[1],id[2]).subscribe(res=>{
      res._embedded.swdSysroles.forEach(user=>{
        this.fruits.push(user);
      });
    });

    // this.flowId = this.dialogData._links.self.href.split('/').splice(-1)[0];
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: any): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }

    //从数据库删除
    let id: string = this.dialogData._links.self.href.split('/').splice(-1)[0] + ',' + fruit._links.self.href.split('/').splice(-1)[0];
    this.service.delSysroleDataPermission(id).subscribe(res=>{
      console.log(res);
    })

  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.value);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);

    //保存到数据库
    let id:any = new Object();
    id.model = this.dialogData._links.self.href.split('/').splice(-1)[0].split(',')[0];
    id.pkey = this.dialogData._links.self.href.split('/').splice(-1)[0].split(',')[1];
    id.permission = this.dialogData._links.self.href.split('/').splice(-1)[0].split(',')[2];
    id.sysroleId = event.option.value._links.self.href.split('/').splice(-1)[0];
    this.service.saveSysroleDataPermission({id: id}).subscribe(res=>{
      console.log(res);
    });

  }

  // _filterValue: any[];
  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    if(filterValue.length>0){
      this.sysroleService.findByNameContaining(filterValue).subscribe(res=>{
        this.filteredFruits = res._embedded.swdSysroles;
      });
    }
    
  }
}
