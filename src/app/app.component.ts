import { Component } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {MenuService} from './service/menu.service'
import { UserService } from './service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import {map} from 'rxjs/operators';
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

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);


  menuTree:any;
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  constructor(private menuService:MenuService,private userService:UserService,private router:Router, private activeRouter:ActivatedRoute) {

    // const id: Observable<string> = this.activeRouter.params.pipe(map(p => p.id));
    // const url: Observable<string> = this.activeRouter.url.pipe(map(segments => segments.join('')));
    // console.log(id);
    // route.data includes both `data` and `resolve`
    

       
  }

  hasChild = (_: number, node: any) => node.expandable;

  isLogin:boolean;
url;
  menuItems;
  ngOnInit(){
    

  //  this.menuItems = this.router.;
    this.username=localStorage.getItem("username");

    // this.router.events
    //   .subscribe(() =>this.menuItems = this.activeRouter.url );



       // this.menuService.getMenuTree().subscribe(menuTree => this.dataSource.data = menuTree);
    this.userService.userMenuTrees().subscribe(res => this.dataSource.data = res.data);
    // this.dataSource.data = this.menuTree;
    
    if(localStorage.getItem("idToken")){
      this.isLogin = true;
    }else{
      this.isLogin=false;
    }
    // console.log("$$$$$$$$$$"+this.isLogin);
  }

  

  // private createBreadcrumbs(route: ActivatedRoute, url: string = '#', breadcrumbs: MenuItem[] = []): MenuItem[] {
  //   const children: ActivatedRoute[] = route.children;

  //   if (children.length === 0) {
  //     return breadcrumbs;
  //   }

  //   for (const child of children) {
  //     const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
  //     if (routeURL !== '') {
  //       url += `/${routeURL}`;
  //     }

  //     const label = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB];
  //     if (!isNullOrUndefined(label)) {
  //       breadcrumbs.push({label, url});
  //     }

  //     return this.createBreadcrumbs(child, url, breadcrumbs);
  //   }
  // }

  logout(){
    localStorage.removeItem("idToken");
    document.cookie = 'idToken=;username=; expires='+new Date().toString+"; path=/";
    location.reload();
  }
  username:string;
}
