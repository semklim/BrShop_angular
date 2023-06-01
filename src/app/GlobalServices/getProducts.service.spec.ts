import { TestBed } from '@angular/core/testing';

import { GetProductsService } from './getProducts.service';

describe('GetProductsService', () => {
  let service: GetProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
