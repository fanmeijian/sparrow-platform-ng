import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KogitoFlowComponent } from './kogito-flow.component';

describe('KogitoFlowComponent', () => {
  let component: KogitoFlowComponent;
  let fixture: ComponentFixture<KogitoFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KogitoFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KogitoFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
