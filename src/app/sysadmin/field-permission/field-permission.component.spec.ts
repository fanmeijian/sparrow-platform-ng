import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldPermissionComponent } from './field-permission.component';

describe('FieldPermissionComponent', () => {
  let component: FieldPermissionComponent;
  let fixture: ComponentFixture<FieldPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
