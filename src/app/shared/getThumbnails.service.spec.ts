import { TestBed } from '@angular/core/testing';

import { GetThumbnailsService } from './getThumbnails.service';

describe('GetThumbnailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetThumbnailsService = TestBed.get(GetThumbnailsService);
    expect(service).toBeTruthy();
  });
});
