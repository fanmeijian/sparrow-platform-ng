import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTreeModule } from '@angular/material/tree';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from '../app-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { MenuComponent } from './sysadmin/menu/menu.component';
import { FormsModule } from '@angular/forms';
import { AuthorityComponent } from './sysadmin/authority/authority.component';
import { NgBpmnEditorModule } from 'ng-bpmn';
import { MatSelectModule } from '@angular/material/select';
import { SysroleComponent } from './sysadmin/sysrole/sysrole.component';
import { UserComponent } from './sysadmin/user/user.component';
import { AuthInterceptor } from './auth.interceptor';
import { LoginComponent } from './login/login.component'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { UserMenuComponent } from './sysadmin/user-menu/user-menu.component';
import { UserAuthorityComponent } from './sysadmin/user-authority/user-authority.component';
import { UserSysroleComponent } from './sysadmin/user-sysrole/user-sysrole.component';
import { SysroleMenuComponent } from './sysadmin/sysrole-menu/sysrole-menu.component';
import { SysroleAuthorityComponent } from './sysadmin/sysrole-authority/sysrole-authority.component';
import { FileComponent } from './sysadmin/file/file.component';
import { FilePermissionComponent } from './sysadmin/file-permission/file-permission.component';
import { DataPermissionComponent } from './sysadmin/data-permission/data-permission.component';
import { FieldPermissionComponent } from './sysadmin/field-permission/field-permission.component';
import { UserFieldPermissionComponent } from './sysadmin/user-field-permission/user-field-permission.component';
import { SysroleFieldPermissionComponent } from './sysadmin/sysrole-field-permission/sysrole-field-permission.component';
import { OrganizationComponent } from './sysadmin/organization/organization.component';
import { UnitComponent } from './sysadmin/unit/unit.component';
import { RoleComponent } from './sysadmin/role/role.component';
import { LevelComponent } from './sysadmin/level/level.component';
import { GroupComponent } from './sysadmin/group/group.component';
import { EmployeeComponent } from './sysadmin/employee/employee.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginLogComponent } from './sysadmin/login-log/login-log.component';
import { OperationLogComponent } from './sysadmin/operation-log/operation-log.component';
import { FlownoComponent } from './sysadmin/flowno/flowno.component';
import { AppManagementComponent } from './sysadmin/app-management/app-management.component';
import { DictComponent } from './sysadmin/dict/dict.component';
import { MatRadioModule } from '@angular/material/radio';
import { KogitoFlowComponent } from './bpm/kogito-flow/kogito-flow.component';
import { DynamicFormsMaterialUIModule } from "@ng-dynamic-forms/ui-material";
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autoComplete';
import { UserFlowComponent } from './bpm/user-flow/user-flow.component';
import { SysroleFlowComponent } from './bpm/sysrole-flow/sysrole-flow.component'


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    AuthorityComponent,
    SysroleComponent,
    UserComponent,
    LoginComponent,
    UserMenuComponent,
    UserAuthorityComponent,
    UserSysroleComponent,
    SysroleMenuComponent,
    SysroleAuthorityComponent,
    FileComponent,
    FilePermissionComponent,
    DataPermissionComponent,
    FieldPermissionComponent,
    UserFieldPermissionComponent,
    SysroleFieldPermissionComponent,
    OrganizationComponent,
    UnitComponent,
    RoleComponent,
    LevelComponent,
    GroupComponent,
    EmployeeComponent,
    LoginLogComponent,
    OperationLogComponent,
    FlownoComponent,
    AppManagementComponent,
    DictComponent,
    KogitoFlowComponent,
    UserFlowComponent,
    SysroleFlowComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCheckboxModule,
    HttpClientModule,
    MatTreeModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    AppRoutingModule,
    MatGridListModule,
    MatMenuModule,
    CdkTableModule,
    FormsModule,
    NgBpmnEditorModule,
    MatSelectModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatRadioModule,
    DynamicFormsMaterialUIModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatAutocompleteModule


  ],
  providers: [{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
