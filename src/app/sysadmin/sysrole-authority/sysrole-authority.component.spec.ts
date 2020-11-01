import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysroleAuthorityComponent } from './sysrole-authority.component';

describe('SysroleAuthorityComponent', () => {
  let component: SysroleAuthorityComponent;
  let fixture: ComponentFixture<SysroleAuthorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysroleAuthorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysroleAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
