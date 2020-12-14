import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysroleFlowComponent } from './sysrole-flow.component';

describe('SysroleFlowComponent', () => {
  let component: SysroleFlowComponent;
  let fixture: ComponentFixture<SysroleFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysroleFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysroleFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
