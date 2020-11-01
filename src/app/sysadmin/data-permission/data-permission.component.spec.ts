import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPermissionComponent } from './data-permission.component';

describe('DataPermissionComponent', () => {
  let component: DataPermissionComponent;
  let fixture: ComponentFixture<DataPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
