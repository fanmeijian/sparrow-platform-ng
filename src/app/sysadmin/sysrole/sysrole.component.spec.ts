import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysroleComponent } from './sysrole.component';

describe('SysroleComponent', () => {
  let component: SysroleComponent;
  let fixture: ComponentFixture<SysroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
