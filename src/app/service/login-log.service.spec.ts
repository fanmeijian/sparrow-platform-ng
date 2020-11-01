import { TestBed } from '@angular/core/testing';

import { LoginLogService } from './login-log.service';

describe('LoginLogService', () => {
  let service: LoginLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
