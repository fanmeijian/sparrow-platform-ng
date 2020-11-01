import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysroleMenuComponent } from './sysrole-menu.component';

describe('SysroleMenuComponent', () => {
  let component: SysroleMenuComponent;
  let fixture: ComponentFixture<SysroleMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysroleMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysroleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
