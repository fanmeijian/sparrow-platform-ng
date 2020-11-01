import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePermissionComponent } from './file-permission.component';

describe('FilePermissionComponent', () => {
  let component: FilePermissionComponent;
  let fixture: ComponentFixture<FilePermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilePermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
