import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { startWith, map, filter } from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { KogitoFlowService } from '../../service/kogito-flow.service';
import { UserFlow, UserFlowPK } from '../../model/user-flow';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KogitoFlow } from '../../model/kogito-flow';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-flow',
  templateUrl: './user-flow.component.html',
  styleUrls: ['./user-flow.component.css']
})
export class UserFlowComponent implements OnInit {

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

  constructor(private userService: UserService,private service: KogitoFlowService,@Inject(MAT_DIALOG_DATA) public dialogData: any ) {
    this.fruitCtrl.valueChanges.subscribe(o=>{
      this._filter(o);
    });
  }

  ngOnInit(): void {
    this.service.findByIdFlowId(this.dialogData._links.self.href.split('/').splice(-1)[0]).subscribe(res=>{
      res._embedded.userFlows.forEach(user=>{
        this.fruits.push(user._links.self.href.split('/').splice(-1)[0].split(',')[0]);
      });
    });

    this.flowId = this.dialogData._links.self.href.split('/').splice(-1)[0];
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

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }

    //从数据库删除
    let id: UserFlowPK = new UserFlowPK();
    id.username = fruit;
    id.flowId = this.flowId;
    this.service.delUserFlow(id).subscribe(res=>{
      console.log(res);
    })

  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);

    //保存到数据库
    let userFlow = new UserFlow();
    userFlow.id.username = event.option.viewValue;
    userFlow.id.flowId = this.dialogData._links.self.href.split('/').splice(-1)[0];
    this.service.saveUserFlow(userFlow).subscribe(res=>{
      console.log(res);
    });

  }

  // _filterValue: any[];
  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    if(filterValue.length>0){
      this.userService.findByUsernameContaining(filterValue).subscribe(res=>{
        this.filteredFruits = res._embedded.swdUsers;
      });
    }
    
  }
 
}
