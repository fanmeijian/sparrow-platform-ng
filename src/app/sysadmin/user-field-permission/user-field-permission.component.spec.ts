import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFieldPermissionComponent } from './user-field-permission.component';

describe('UserFieldPermissionComponent', () => {
  let component: UserFieldPermissionComponent;
  let fixture: ComponentFixture<UserFieldPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFieldPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFieldPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
