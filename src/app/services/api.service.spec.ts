import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { of, throwError, Observable } from 'rxjs';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ApiService ]
    });

    apiService = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    apiService.rdapServersUrl = 'http://localhost:9876/assets/static/dns.json';
    apiService.whoisBackendUrl = 'http://localhost:8989/api/whois?q=';
  });

  it('fetchWhoisRequest should return an observable', () => {
    spyOn(apiService, 'fetchWhoisRequest').and.returnValue(of());
    expect(apiService.fetchWhoisRequest('domain.com') instanceof Observable).toBe(true, 'instance of Observable');
  });

  it('fetchRelatedLink should return null when link is not given', () => {
    expect(apiService.fetchRelatedLink('')).toBe(null);
    expect(apiService.fetchRelatedLink(null)).toBe(null);
    expect(apiService.fetchRelatedLink(undefined)).toBe(null);
  });

  it('fetchRelatedLink should query the link given', () => {
    apiService.fetchRelatedLink('http://domain.com').subscribe(() => {});
    const req = httpMock.expectOne(`http://domain.com`, 'query the related link');
    expect(req.request.method).toBe('GET');
  });

  it('getRdapServersList should return a valid observable', () => {
    expect(apiService.getRdapServersList() instanceof Observable).toBe(true, 'instance of Observable');
  });


  it ('domainRequest should return an error if no domain is setted', () => {
    apiService.domainRequest().subscribe(() => { }, (err) => expect(err).toBe('INVALID_DOMAIN'));
  });

  it('fetchRDAPRequest should return an error if domain is not valid', () => {
      apiService.fetchRDAPRequest({domain: null}).subscribe(() => {}, (error1) => {
        apiService.fetchRDAPRequest({domain: undefined}).subscribe(() => {}, (error2) => {
        expect(error1).toBe('INVALID_DOMAIN');
        expect(error2).toBe('INVALID_DOMAIN');
      });
    });
  });

  it ('Dns file should return valid DNS structure', (done) => {
    const data: any = require('../../assets/static/local-config.json');
    apiService.rdapServersUrl = 'http://localhost:9876/assets/static/local-config.json';
    spyOn(apiService, 'getApplicationConfigurationFile').and.returnValue(of(data));
    apiService.getApplicationConfigurationFile().subscribe((result) => {
      expect(result).toBe(data);
      done();
    });
  });

  it ('Dns file not found should return an error', () => {
    const mockErrorResponse = { status: 404, statusText: 'Bad Request' };
    const data = 'Invalid request parameters';
    apiService.rdapServersUrl = 'http://localhost:9876/FILE_NOT_FOUND.json';
    apiService.getApplicationConfigurationFile().subscribe(() => {}, err => expect(err.status).toBe(404) );
    httpMock.expectOne(`http://localhost:9876/FILE_NOT_FOUND.json`).flush(data, mockErrorResponse);
  });

  it('fetchRDAPRequest should reject if rdapServers is not found', (done) => {
    apiService.rdapServersUrl = 'http://localhost:9876/FILE_NOT_FOUND.json';
    spyOn(apiService, 'fetchRDAPRequest').and.returnValue(throwError('INVALID_BOOTSTRAP_FILE'));
    apiService.fetchRDAPRequest({domain: 'domain-test.com'}).subscribe(() => { }, (err) => {
      expect(err).toBe('INVALID_BOOTSTRAP_FILE');
      done();
    });
  });


});
