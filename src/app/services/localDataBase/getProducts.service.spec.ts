import { TestBed } from '@angular/core/testing';

import { LocalDataService } from './localDataBase/localData.service';

describe('LocalDataService', () => {
  let service: LocalDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
