import { TestBed } from '@angular/core/testing';

import { GalleriesResolverService } from './galleriesResolver.service';

describe('ResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GalleriesResolverService = TestBed.get(GalleriesResolverService);
    expect(service).toBeTruthy();
  });
});
