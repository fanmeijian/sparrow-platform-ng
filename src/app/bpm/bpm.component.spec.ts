import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpmComponent } from './bpm.component';

describe('BpmComponent', () => {
  let component: BpmComponent;
  let fixture: ComponentFixture<BpmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
