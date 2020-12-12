import { TestBed } from '@angular/core/testing';

import { KogitoFlowService } from './kogito-flow.service';

describe('KogitoFlowService', () => {
  let service: KogitoFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KogitoFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
