import { TestBed } from '@angular/core/testing';

import { GetCommissionsService } from './old/get-commissions.service';

describe('GetCommissionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetCommissionsService = TestBed.get(GetCommissionsService);
    expect(service).toBeTruthy();
  });
});
