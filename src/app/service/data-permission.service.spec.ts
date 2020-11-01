import { TestBed } from '@angular/core/testing';

import { DataPermissionService } from './data-permission.service';

describe('DataPermissionService', () => {
  let service: DataPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
