import { TestBed } from '@angular/core/testing';

import { WpRESTmoduleService } from './wp_rest_module.service';

describe('WpRESTmoduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WpRESTmoduleService = TestBed.get(WpRESTmoduleService);
    expect(service).toBeTruthy();
  });
});
