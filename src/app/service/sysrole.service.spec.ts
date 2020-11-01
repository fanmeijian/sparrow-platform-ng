import { TestBed } from '@angular/core/testing';

import { SysroleService } from './sysrole.service';

describe('SysroleService', () => {
  let service: SysroleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SysroleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
