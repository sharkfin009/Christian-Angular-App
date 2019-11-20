import { TestBed } from '@angular/core/testing';

import { WikiPixService } from './wiki-pix.service';

describe('WikiPixService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WikiPixService = TestBed.get(WikiPixService);
    expect(service).toBeTruthy();
  });
});
