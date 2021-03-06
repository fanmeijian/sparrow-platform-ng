import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './app/sysadmin/menu/menu.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { AuthorityComponent } from './app/sysadmin/authority/authority.component';
import { SysroleComponent } from './app/sysadmin/sysrole/sysrole.component';
import { UserComponent } from './app/sysadmin/user/user.component';
import { LoginComponent } from './app/login/login.component';
import { UserMenuComponent } from './app/sysadmin/user-menu/user-menu.component';
import { UserAuthorityComponent } from './app/sysadmin/user-authority/user-authority.component';
import { FileComponent } from './app/sysadmin/file/file.component';
import { DataPermissionComponent } from './app/sysadmin/data-permission/data-permission.component';
import { FieldPermissionComponent } from './app/sysadmin/field-permission/field-permission.component';
import { OrganizationComponent } from './app/sysadmin/organization/organization.component';
import { UnitComponent } from './app/sysadmin/unit/unit.component';
import { RoleComponent } from './app/sysadmin/role/role.component';
import { LevelComponent } from './app/sysadmin/level/level.component';
import { GroupComponent } from './app/sysadmin/group/group.component';
import { empty } from 'rxjs';
import { EmployeeComponent } from './app/sysadmin/employee/employee.component';
import { LoginLogComponent } from './app/sysadmin/login-log/login-log.component';
import { OperationLogComponent } from './app/sysadmin/operation-log/operation-log.component';
import { FlownoComponent } from './app/sysadmin/flowno/flowno.component';
import { AppManagementComponent } from './app/sysadmin/app-management/app-management.component';
import { DictComponent } from './app/sysadmin/dict/dict.component';
import { KogitoFlowComponent } from './app/bpm/kogito-flow/kogito-flow.component';
import { FlowFormComponent } from './app/bpm/flow-form/flow-form.component';
import { ProcessFormComponent } from './app/bpm/forms/sparrow-trial/sparrowTrial/process-form/process-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'menu', component: MenuComponent, data: {
      breadcrumb: '菜单管理'
    }
  },
  { path: 'authority', component: AuthorityComponent },
  { path: 'sysrole', component: SysroleComponent },
  { path: 'user', component: UserComponent },
  { path: "login", component: LoginComponent },
  { path: "user-menu", component: UserMenuComponent },
  { path: "user-authority", component: UserAuthorityComponent },
  { path: "file", component: FileComponent },
  { path: "data-permission", component: DataPermissionComponent },
  { path: "field-permission", component: FieldPermissionComponent },
  { path: 'organization', component: OrganizationComponent },
  { path: 'unit', component: UnitComponent },
  { path: 'role', component: RoleComponent },
  { path: 'level', component: LevelComponent },
  { path: 'group', component: GroupComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'login-log', component: LoginLogComponent },
  { path: 'operation-log', component: OperationLogComponent },
  { path: 'flowno', component: FlownoComponent },
  { path: 'app-management', component: AppManagementComponent },
  { path: 'dict', component: DictComponent },
  { path: 'kogito-flow', component: KogitoFlowComponent},
  { path: 'flow-form', component: FlowFormComponent},
  { path: 'sparrow-trial', component: ProcessFormComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
