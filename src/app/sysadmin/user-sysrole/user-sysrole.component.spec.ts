import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSysroleComponent } from './user-sysrole.component';

describe('UserSysroleComponent', () => {
  let component: UserSysroleComponent;
  let fixture: ComponentFixture<UserSysroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSysroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSysroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
