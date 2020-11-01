import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysroleFieldPermissionComponent } from './sysrole-field-permission.component';

describe('SysroleFieldPermissionComponent', () => {
  let component: SysroleFieldPermissionComponent;
  let fixture: ComponentFixture<SysroleFieldPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysroleFieldPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysroleFieldPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
