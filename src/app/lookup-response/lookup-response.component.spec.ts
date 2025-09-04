import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { LookupResponseComponent } from './lookup-response.component';
import { LookupDomainInformationComponent } from './lookup-domain-information/lookup-domain-information';
import { LookupAuthoritativeServerComponent } from './lookup-authoritative-server/lookup-authoritative-server';
import { LookupDnssecComponent } from './lookup-dnssec/lookup-dnssec';
import { LookupContactComponent } from './lookup-contact/lookup-contact';
import { LookupRegistrarComponent } from './lookup-registrar/lookup-registrar';
import { LookupResellerComponent } from './lookup-reseller/lookup-reseller';

import { FormsModule } from '@angular/forms';
import { UrlParserPipe } from '../shared/pipes/url-parser.pipe';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { MomentModule } from 'ngx-moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DomainFormComponent } from '../domain-form/domain-form.component';

describe('LookupResponseComponent', () => {
  let component: LookupResponseComponent;
  let lookupDnssecComponent: LookupDnssecComponent;
  let fictureDnsSec: ComponentFixture<LookupDnssecComponent>;
  let fixture: ComponentFixture<LookupResponseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        LookupRegistrarComponent,
        LookupContactComponent,
        LookupDnssecComponent,
        LookupResponseComponent,
        LookupDomainInformationComponent,
        LookupAuthoritativeServerComponent,
        LookupResellerComponent,
        UrlParserPipe,
        DomainFormComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [{path: 'lookup', component: LookupResponseComponent}]
        ),
        FormsModule,
        PrettyJsonModule,
        MomentModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    localStorage.clear();
    fixture = TestBed.createComponent(LookupResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    fictureDnsSec = TestBed.createComponent(LookupDnssecComponent);
    lookupDnssecComponent = fictureDnsSec.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('DnsPanel should not be reduced at first', () => {
    expect(lookupDnssecComponent.isDnssecReduced).toBeFalsy();
    expect(lookupDnssecComponent.isDnssecPanelExpanded).toBeFalsy();
  });
});
