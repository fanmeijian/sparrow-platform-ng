import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlownoComponent } from './flowno.component';

describe('FlownoComponent', () => {
  let component: FlownoComponent;
  let fixture: ComponentFixture<FlownoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlownoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlownoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
