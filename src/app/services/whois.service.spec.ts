import { TestBed, inject } from '@angular/core/testing';
import { WhoisService } from './whois.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WhoisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [WhoisService]
    });
  });

  it('should be created', inject([WhoisService], (service: WhoisService) => {
    expect(service).toBeTruthy();
  }));
});
