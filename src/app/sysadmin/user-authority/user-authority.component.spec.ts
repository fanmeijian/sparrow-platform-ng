import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthorityComponent } from './user-authority.component';

describe('UserAuthorityComponent', () => {
  let component: UserAuthorityComponent;
  let fixture: ComponentFixture<UserAuthorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAuthorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
