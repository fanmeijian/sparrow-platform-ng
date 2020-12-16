import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysroleDataPermissionComponent } from './sysrole-data-permission.component';

describe('SysroleDataPermissionComponent', () => {
  let component: SysroleDataPermissionComponent;
  let fixture: ComponentFixture<SysroleDataPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysroleDataPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysroleDataPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
