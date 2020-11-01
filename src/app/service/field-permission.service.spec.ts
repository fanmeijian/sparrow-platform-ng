import { TestBed } from '@angular/core/testing';

import { FieldPermissionService } from './field-permission.service';

describe('FieldPermissionService', () => {
  let service: FieldPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
