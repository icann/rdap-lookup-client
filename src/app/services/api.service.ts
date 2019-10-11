import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import * as Punycode from 'punycode';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json, application/rdap+json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public rdapServersUrl = environment.dnsFileUrl;
  public whoisBackendUrl = environment.whoisBackendUrl;
  private isRdapServerInjected = false;
  private rdapServers: Array<object> = [];
  public domain: {parts: string[], domain: string};
  private response: {};
  private rdapServer: string;

  constructor(private http: HttpClient) {  }

  fetchWhoisRequest (domain): Observable<any> {
    return this.http.get(`${this.whoisBackendUrl}${domain}`);
  }

  getApplicationConfigurationFile (): Observable <any> {
    return this.http.get(this.rdapServersUrl).pipe(mergeMap((configurationFile: any) => {
      if (!configurationFile.bootstrapUrl) {
        return throwError('INVALID_BOOTSTRAP_FILE');
      }

      return this.http.get(configurationFile.bootstrapUrl);
    }));
  }

  fetchRelatedLink (link: string): Observable<any> {
    if (!link) {
      return null;
    }

    return this.http.get(link);
  }

  getRdapServersList (): Observable<any> {
    return this.getApplicationConfigurationFile().pipe(mergeMap((res: any) => {
      this.parseServices(res.services);
      return of(true);
    }));
  }

  private parseServices (services: Array<any>): void {
    for (const index of Object.keys(services)) {
      const tld: Array<Array<String>> = services[index][0];
      const url: Array<Array<String>> = services[index][1];
      for (const index2 of Object.keys(tld)) {
        const httpServerIndex = url.findIndex((el) => el.includes('http:'));
        let http = '';
        if (httpServerIndex > -1) {
          http = url.find((el) => el.includes('http:')).toString().replace(/\/?$/, '/') + 'domain/';
        }

        const httpsServerIndex = url.findIndex((el) => el.includes('https:'));
        let https = '';
        if (httpsServerIndex > -1) {
          https = url.find((el) => el.includes('https:')).toString().replace(/\/?$/, '/') + 'domain/';
        }
        this.rdapServers.push({
          tld: tld[index2],
          http: http,
          https: https,
        });
      }
    }
    this.isRdapServerInjected = true;
  }

  private parseDomain ({domain}) {
    const domains = Punycode.toASCII(domain.trim().toLowerCase()).split('.').reverse();
    this.domain = {parts: domains, domain: Punycode.toASCII(domain.replace(/(^\w+:|^)\/\//, '').replace('www.', ''))};
  }

  private sendDomainRequest (): Observable<any> {
    return new Observable((observer) => {
      this.response = {};

      const domainPart = [];

      if (!this.domain) {
        return observer.error('INVALID_DOMAIN');
      }

      if (!this.domain.domain.includes('.') || this.domain.domain.match(/^\.(.*)$/)) {
        if (!this.rdapServers.find((el: {tld: string} ) => el.tld === '')) {
          return observer.next(false);
        } else {
          domainPart.push('');
        }
      } else {
        for (const index of Object.keys(this.domain.parts)) {
          domainPart.unshift(this.domain.parts[index]);
          if (!this.rdapServers.find((el: {tld: string} ) => el.tld === domainPart.join('.'))) {
            domainPart.splice(0, 1);
            break;
          }
        }
      }

      if (domainPart.length === 0) {
        return observer.next(false);
      }

      let checkDomain: String = '';
      if (domainPart[domainPart.length - 1] === '') {
        checkDomain = this.domain.domain.replace('.', '');
      } else {
        checkDomain = this.domain.domain;
      }

      const rdapServer: any = this.rdapServers.find((el: any) => el.tld === domainPart.join('.'));

      let request: string = null;
      if (rdapServer.https) {
        request = rdapServer.https;
      } else {
        request = rdapServer.http;
      }

      this.http.get(`${request}${checkDomain}`, httpOptions).subscribe((res: any) => {
        this.response = res;
        this.rdapServer = rdapServer.https + checkDomain;
        return observer.next(true);
      }, (error: any) => {
        observer.error(error);
      });
    });
  }

  fetchRDAPRequest ({domain}): Observable<any> {
    if (!domain) {
      return throwError('INVALID_DOMAIN');
    }

    this.parseDomain({domain});

    if (!this.isRdapServerInjected) {
      return this.getRdapServersList().pipe(mergeMap(() => {
        return this.domainRequest();
      }));
    }
    return this.domainRequest();
  }

  domainRequest (): Observable<any> {
    return this.sendDomainRequest().pipe(mergeMap((res: any) => {
      if (!res) {
        return throwError('NO_DOMAIN_FOUND_IANA');
      }
      return of({server: this.rdapServer, response: this.response});
    }));
  }
}
