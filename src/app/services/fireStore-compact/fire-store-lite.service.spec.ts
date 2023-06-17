import { TestBed } from '@angular/core/testing';

import { FireStoreLiteService } from './fire-store-lite.service';

describe('FireStoreLiteService', () => {
  let service: FireStoreLiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireStoreLiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
