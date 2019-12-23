
import { TestBed } from '@angular/core/testing';

import { GridCallService } from './grid-call.service';

describe('GridCallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GridCallService = TestBed.get(GridCallService);
    expect(service).toBeTruthy();
  });
});
