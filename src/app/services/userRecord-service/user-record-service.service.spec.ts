import { TestBed } from '@angular/core/testing';

import { UserRecordServiceService } from './user-record-service.service';

describe('UserRecordServiceService', () => {
  let service: UserRecordServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRecordServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
