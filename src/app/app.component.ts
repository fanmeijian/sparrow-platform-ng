import { Component } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MenuService } from './service/menu.service'
import { UserService } from './service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  url: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'standalone-framework-ng';
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      url: node.url
    };
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);
  menuTree: any;
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor(
    private menuService: MenuService,
    private userService: UserService,
    private router: Router,
    private activeRouter: ActivatedRoute) {
  }
  hasChild = (_: number, node: any) => node.expandable;
  isLogin: boolean;
  menuItems;
  username: string;
  ngOnInit() {

    if (localStorage.getItem("idToken")) {
      this.username = localStorage.getItem("username");
      this.userService.userMenuTrees().subscribe(res => this.dataSource.data = res.data);
      if (localStorage.getItem("idToken")) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    }
  }
  logout() {
    localStorage.removeItem("idToken");
    document.cookie = 'idToken=;username=; expires=' + new Date().toString + "; path=/";
    // location.reload();
    window.location.href = '/login';
  }

}
