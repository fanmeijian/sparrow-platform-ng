import { Component, OnInit, Inject } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { MenuService } from '../../service/menu.service';
import { UserService } from '../../service/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  url: string;
  id: number;
}



@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {


  treeControl: FlatTreeControl<ExampleFlatNode>;
  treeFlattener: MatTreeFlattener<ExampleFlatNode, ExampleFlatNode>;
  dataSource: MatTreeFlatDataSource<ExampleFlatNode, ExampleFlatNode>;

  constructor(private menuService: MenuService, private userService: UserService, public dialogRef: MatDialogRef<UserMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any) {


    this.treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

    this.treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);




  }

  user: any;

  ngOnInit(): void {
    //initial the selected user menus
    this.menuService.getMenuTree().subscribe(res => {
      this.dataSource.data = res.data;

      this.userService.userMenus(this.dialogData).subscribe(res1 => {
        res1._embedded.swdMenus.forEach(element => {
          this.dataSource._flattenedData.value.forEach(o => {
            if (o.id == element._links.self.href.split('/').splice(-1))
              this.checklistSelection.select(o);
          });
        });
      });

    });





  }
  hasChild = (_: number, node: any) => node.expandable;


  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      url: node.url,
      id: node.id
    };
  }


  checklistSelection = new SelectionModel<any>(true /* multiple */);


  getLevel = (node: ExampleFlatNode) => node.level;

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: ExampleFlatNode): boolean {
    if (this.treeControl.dataNodes) {
      const descendants = this.treeControl.getDescendants(node);
      const descAllSelected = descendants.length > 0 && descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
      return descAllSelected;
    } else {
      return false;
    }

  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: ExampleFlatNode): boolean {
    if (this.treeControl.dataNodes) {
      const descendants = this.treeControl.getDescendants(node);
      const result = descendants.some(child => this.checklistSelection.isSelected(child));
      return result && !this.descendantsAllSelected(node);
    } else {
      return false;
    }

  }


  todoItemSelectionToggle(node: ExampleFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: ExampleFlatNode): void {
    let parent: ExampleFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: ExampleFlatNode): ExampleFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }


  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: ExampleFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: ExampleFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  getCheckValues() {
    
    let userMenus:any = new Object();
    userMenus.username=this.dialogData._links.self.href.split('/').splice(-1)[0];
    console.log(this.dialogData._links.self.href.split('/').splice(-1))
    userMenus.menus=this.checklistSelection.selected;
    this.userService.saveUserMenus(userMenus).subscribe();
  }

}
