import { TestBed, waitForAsync } from '@angular/core/testing';
import { LookupService, MessageTypes } from './lookup.service';
import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HomeComponent } from '../home/home.component';
import { DomainFormComponent } from '../domain-form/domain-form.component';
import { LookupResponseComponent } from '../lookup-response/lookup-response.component';
import { LookupDomainInformationComponent } from '../lookup-response/lookup-domain-information/lookup-domain-information';
import { LookupAuthoritativeServerComponent } from '../lookup-response/lookup-authoritative-server/lookup-authoritative-server';
import { LookupDnssecComponent } from '../lookup-response/lookup-dnssec/lookup-dnssec';
import { LookupContactComponent } from '../lookup-response/lookup-contact/lookup-contact';
import { LookupRegistrarComponent } from '../lookup-response/lookup-registrar/lookup-registrar';
import { LookupResellerComponent } from '../lookup-response/lookup-reseller/lookup-reseller';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { UrlParserPipe } from '../shared/pipes/url-parser.pipe';
import { MomentModule } from 'ngx-moment';
import { Router } from '@angular/router';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { throwError } from 'rxjs';

describe('LookupService', () => {
  let lookupService: LookupService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        DomainFormComponent,
        LookupResponseComponent,
        LookupDomainInformationComponent,
        LookupAuthoritativeServerComponent,
        LookupDnssecComponent,
        LookupContactComponent,
        LookupRegistrarComponent,
        LookupResellerComponent,
        UrlParserPipe
      ],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes(
          [{path: 'lookup', component: HomeComponent}, {path: '', component: DomainFormComponent}]
        ),
        MatExpansionModule,
        MomentModule
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    lookupService = TestBed.get(LookupService);
    router = TestBed.get(Router);
  }));

  it('should be created', () => {
    const service: LookupService = TestBed.get(LookupService);
    expect(service).toBeTruthy();
  });

  it('service params should be setted properly at start', () => {
    expect(lookupService.messages.length).toBe(0);
    expect(lookupService.lookupResponse).toBe(null);
    expect(lookupService.isWorkingInprogress).toBe(true);
  });

  it ('setLookup should set params properly', () => {
    lookupService.setLookup('domain.com', false);

    expect(lookupService.getDomain()).toBe('domain.com');
    expect(lookupService.lookupResponse).toBe(null);
    expect(lookupService.isWorkingInprogress).toBe(true);
  });

  it ('setLookup should add error if domain is not valid', () => {
    lookupService.setLookup(null, false);
    expect(lookupService.messages.length).toBe(1);
    lookupService.setLookup(undefined, false);
    expect(lookupService.messages.length).toBe(1);
    lookupService.setLookup('', false);
    expect(lookupService.messages.length).toBe(1);
  });

  it ('setlookup should not add error in redirection mode', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    lookupService.setLookup(null, true);
    expect(lookupService.messages.length).toBe(0);
    expect(navigateSpy).toHaveBeenCalledWith('/lookup');
  });

  it ('setlookup should not add error in redirection mode and redirect user', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    lookupService.setLookup(null, true);
    expect(lookupService.messages.length).toBe(0);
    expect(navigateSpy).toHaveBeenCalledWith('/lookup');
  });

  it ('getDomain should return the domain', () => {
    lookupService.setLookup('test.com', false);
    const domain = lookupService.getDomain();
    expect(domain).toBe('test.com');
  });

  it ('getMessages should return messages', () => {
    lookupService.setLookup(null, false);
    expect(lookupService.getMessages().length).toBe(1);
    expect(lookupService.getMessages().filter((el: any) => el.type === MessageTypes.Error).length).toBe(1);
    expect(lookupService.getMessages().filter((el: any) => el.type === MessageTypes.Info).length).toBe(0);

    lookupService.setLookup('perdu.com', false);
    expect(lookupService.getMessages().length).toBe(0);

    lookupService.setLookup(null, false);
    lookupService.cleanResponse();
    expect(lookupService.getMessages().length).toBe(0);
  });

  it ('sendrequest should display error for invalid params', () => {
    lookupService.setLookup(null, false);
    expect(lookupService.getMessages().length).toBe(1);
    expect(lookupService.getMessages()[0].message).toContain('Please enter a domain name.');

    lookupService.setLookup('doma in.com', false);
    expect(lookupService.getMessages().length).toBe(1);
    expect(lookupService.getMessages()[0].message).toContain('The domain name entered is not valid');
  });

  it ('sendrequest should send rdap request properly', () => {
    spyOn(lookupService.apiService, 'fetchRDAPRequest').and.returnValue(throwError('INVALID_DOMAIN'));
    lookupService.setLookup('domain-lookup.com', false);
    expect(lookupService.apiService.fetchRDAPRequest).toHaveBeenCalled();
  });

  it ('cleanResponse should reset all params', () => {
    lookupService.setLookup('domain.com', false);
    lookupService.cleanResponse();
    expect(lookupService.messages.length).toBe(0);
    expect(lookupService.lookupResponse).toBe(null);
  });

  it ('sendrequest should display error for TLD_NOT_SUPPORTED', () => {
    spyOn(lookupService.apiService, 'fetchRDAPRequest').and.returnValue(throwError('NO_DOMAIN_FOUND_IANA'));
    spyOn(lookupService, 'isDomainLookupDisabled').and.returnValue(true);
    lookupService.setLookup('example.int', false);

    console.log('lookupService.getMessages() = ', lookupService.getMessages());

    expect(lookupService.getMessages().length).toBe(1);
    expect(lookupService.getMessages()[0].message).toContain('No registry RDAP server was identified for this domain.');
  });

});
