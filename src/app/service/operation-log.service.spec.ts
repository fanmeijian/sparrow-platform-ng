import { TestBed } from '@angular/core/testing';

import { OperationLogService } from './operation-log.service';

describe('OperationLogService', () => {
  let service: OperationLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
