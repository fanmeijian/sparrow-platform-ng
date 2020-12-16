import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataPermissionComponent } from './user-data-permission.component';

describe('UserDataPermissionComponent', () => {
  let component: UserDataPermissionComponent;
  let fixture: ComponentFixture<UserDataPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDataPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDataPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
