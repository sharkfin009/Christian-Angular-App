import { TestBed } from '@angular/core/testing';

import { LightboxService } from './lightbox.service';

describe('LightboxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LightboxService = TestBed.get(LightboxService);
    expect(service).toBeTruthy();
  });
});
