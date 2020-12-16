import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialFollowFormComponent } from './trial-follow-form.component';

describe('TrialFollowFormComponent', () => {
  let component: TrialFollowFormComponent;
  let fixture: ComponentFixture<TrialFollowFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialFollowFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialFollowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
