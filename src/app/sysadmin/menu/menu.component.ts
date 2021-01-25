import { Component, Injectable, OnInit } from '@angular/core';
import { MenuService } from '../../service/menu.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { Directive } from '@angular/core';
import { SwdMenu } from '../../global';
import {MatSnackBar} from '@angular/material/snack-bar';




/**
 * 菜单树的菜单节点类
 */

export class MenuNode extends SwdMenu{
  parentString: string;
  parentIdString: string;
  children: MenuNode[];
  action: string;
}

/** 展开菜单节点 含可展开及层级信息 */
export class MenuFlatNode {
  item: string;
  level: number;
  expandable: boolean;
  action: string;
}



/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<MenuNode[]>([]);

  get data(): MenuNode[] { return this.dataChange.value; }

  constructor(private menuService: MenuService,private _snackBar: MatSnackBar) {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    this.menuService.getMenuTree().subscribe(res => {
      this.dataChange.next(res.data);
    })
  }

  /** 在数据库里面插入菜单 */
  insertItem(parentNode: MenuNode,item: string) {
    let newNode = new MenuNode();
    newNode.name = '';
    newNode.url = '';
    newNode.id = '';
    newNode.children = [];
    newNode.action = 'edit';
    if(!parentNode){
      newNode.parentId = '0';
      this.data.push(newNode);
    }else{
      newNode.parentId = parentNode.id;
      if(!parentNode.children) parentNode.children = [];
      parentNode.children.push(newNode as MenuNode);
    }
    this.dataChange.next(this.data);
  }

  cancelItem(parent: MenuNode, node:MenuNode){
    
    if(Number.parseInt(node.id)>0){
      //从数据库删除
      this.menuService.delete(node.id).subscribe(res=>{
        this._snackBar.open('成功！','关闭',{duration: 2000});
        if(!parent)
          this.dataChange.next(this.data.filter(o=>o!=node));
        else{
          parent.children = parent.children.filter(o=>o!=node);
          this.dataChange.next(this.data);
        }
      })
    }else{
      if(parent){
        parent.children = parent.children.filter(o=>o!=node);
        this.dataChange.next(this.data);
      }
      else
        this.dataChange.next(this.data.filter(o=>o!=node));
    }
    
  }

  updateItem(node: MenuNode) {  
    this.menuService.post(node).subscribe(res=>{     
      this._snackBar.open('成功！','关闭',{duration: 2000});
      node.id = res._links.self.href;
      node.id = node.id.substring(node.id.lastIndexOf('/')+1);
      node.action = '';
      this.dataChange.next(this.data);
    });
  }
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [ChecklistDatabase,MatSnackBar]
})
export class MenuComponent implements OnInit {

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<MenuFlatNode, MenuNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<MenuNode, MenuFlatNode>();

  nodeMap = new Map<string,MenuNode>();

  /** A selected parent node to be inserted */
  selectedParent: MenuFlatNode | null = null;

  newMenuNodeMap = new Map<MenuFlatNode, MenuNode>();

  menu: MenuNode = new MenuNode();

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<MenuFlatNode>;

  treeFlattener: MatTreeFlattener<MenuNode, MenuFlatNode>;

  dataSource: MatTreeFlatDataSource<MenuNode, MenuFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<MenuFlatNode>(true /* multiple */);

  constructor(private _database: ChecklistDatabase) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<MenuFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: MenuFlatNode) => node.level;

  isExpandable = (node: MenuFlatNode) => node.expandable;

  getChildren = (node: MenuNode): MenuNode[] => node.children;

  hasChild = (_: number, _nodeData: MenuFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: MenuFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: MenuNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.name
      ? existingNode
      : new MenuFlatNode();
    flatNode.item = node.name;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    flatNode.action = node.action;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    this.nodeMap.set(node.id,node);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: MenuFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: MenuFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: MenuFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: MenuFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: MenuFlatNode): void {
    let parent: MenuFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: MenuFlatNode): void {
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

  /* Get the parent node of a node */
  getParentNode(node: MenuFlatNode): MenuFlatNode | null {
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

  /** Select the category so we can insert the new item. */
  addNewItem(node: MenuFlatNode) {
    if(!node){
      //根菜单
      this._database.insertItem(new MenuNode(), '');
    }else{
      const parentNode = this.flatNodeMap.get(node);
      node.expandable = true;
      this._database.insertItem(parentNode!, '');
      this.treeControl.expand(node);
    }
  }

  deleteItem(node: MenuFlatNode){
    this.cancelNode(node);
  }

  /** Save the node to database */
  saveNode(node: MenuFlatNode) {
    const nestedNode = this.flatNodeMap.get(node);
    this._database.updateItem(nestedNode!);
    
  }

  cancelNode(node: MenuFlatNode) {
    const parentNode = this.flatNodeMap.get(this.getParentNode(node)!);//this.nodeMap.get(this.flatNodeMap.get(node).parentId);
    this._database.cancelItem(parentNode!,this.flatNodeMap.get(node)!);
  }

  ngOnInit(): void {
    // this.service.getMenus(10, 0).subscribe(res => { this.dataSource.data = res._embedded.swdMenus; this.dataSourceLength = this.dataSource.data.length,this.length=res.page.totalElements });
  }

}




