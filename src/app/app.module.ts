import { BrowserModule } from '@angular/platform-browser';
import { MomentModule } from 'ngx-moment';

import { AppComponent } from './app.component';
import { LookupResponseComponent } from './lookup-response/lookup-response.component';
import { LookupDomainInformationComponent } from './lookup-response/lookup-domain-information/lookup-domain-information';
import { LookupAuthoritativeServerComponent } from './lookup-response/lookup-authoritative-server/lookup-authoritative-server';
import { LookupDnssecComponent } from './lookup-response/lookup-dnssec/lookup-dnssec';
import { LookupContactComponent } from './lookup-response/lookup-contact/lookup-contact';
import { LookupRegistrarComponent } from './lookup-response/lookup-registrar/lookup-registrar';
import { LookupResellerComponent } from './lookup-response/lookup-reseller/lookup-reseller';


import { HttpClientModule } from '@angular/common/http';
import { PrettyJsonModule } from 'angular2-prettyjson';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';

import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { UrlParserPipe } from './shared/pipes/url-parser.pipe';
import { HomeComponent } from './home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { DomainFormComponent } from './domain-form/domain-form.component';
import { AcronymComponent } from './acronym/acronym.component';
import { AcronymParserPipe } from './shared/pipes/acronym-parser.pipe';
import { LookupService } from './services/lookup.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lookup', component: LookupResponseComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [
    LookupDomainInformationComponent,
    LookupAuthoritativeServerComponent,
    LookupDnssecComponent,
    LookupContactComponent,
    LookupRegistrarComponent,
    LookupResellerComponent,
    AppComponent,
    LookupResponseComponent,
    UrlParserPipe,
    HomeComponent,
    DomainFormComponent,
    AcronymComponent,
    AcronymParserPipe
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    PrettyJsonModule,
    MomentModule,
    MatExpansionModule
  ],
  providers: [ CookieService, LookupService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
