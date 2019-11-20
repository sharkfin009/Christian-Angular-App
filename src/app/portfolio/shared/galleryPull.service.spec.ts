import { TestBed } from '@angular/core/testing';

import { WikihowService } from './galleryPull.service';

describe('WikihowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WikihowService = TestBed.get(WikihowService);
    expect(service).toBeTruthy();
  });
});
