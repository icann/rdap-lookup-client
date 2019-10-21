import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LookupResponseComponent } from './lookup-response/lookup-response.component';
import { FormsModule } from '@angular/forms';
import { UrlParserPipe } from './shared/pipes/url-parser.pipe';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { MomentModule } from 'ngx-moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { LookupDomainInformationComponent } from './lookup-response/lookup-domain-information/lookup-domain-information';
import { LookupAuthoritativeServerComponent } from './lookup-response/lookup-authoritative-server/lookup-authoritative-server';
import { LookupDnssecComponent } from './lookup-response/lookup-dnssec/lookup-dnssec';
import { LookupContactComponent } from './lookup-response/lookup-contact/lookup-contact';
import { LookupRegistrarComponent } from './lookup-response/lookup-registrar/lookup-registrar';
import { LookupResellerComponent } from './lookup-response/lookup-reseller/lookup-reseller';
import { DomainFormComponent } from './domain-form/domain-form.component';
import { LookupService } from './services/lookup.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LookupRegistrarComponent,
        LookupContactComponent,
        LookupDnssecComponent,
        LookupResponseComponent,
        LookupDomainInformationComponent,
        LookupAuthoritativeServerComponent,
        LookupResellerComponent,
        AppComponent,
        UrlParserPipe,
        DomainFormComponent
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        PrettyJsonModule,
        MomentModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        HttpClientModule
      ],
      providers: [
        LookupService
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'RDAP Lookup'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('RDAP Lookup');
  }));
});
