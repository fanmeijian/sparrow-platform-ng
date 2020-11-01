import { TestBed } from '@angular/core/testing';

import { FlownoService } from './flowno.service';

describe('FlownoService', () => {
  let service: FlownoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlownoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
