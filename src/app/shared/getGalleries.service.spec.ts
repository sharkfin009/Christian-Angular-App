
import { TestBed } from '@angular/core/testing';

import { GetGalleriesService } from './getGalleries.service';

describe('GetGalleriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetGalleriesService = TestBed.get(GetGalleriesService);
    expect(service).toBeTruthy();
  });
});
