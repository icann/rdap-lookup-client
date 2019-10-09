import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LookupResponse } from '../lookup/lookup-response';
import { ApiService } from './api.service';
import { WhoisService } from './whois.service';

export enum MessageTypes { Error = 0, Info = 1 }

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  messages: Array<{message: string, type: MessageTypes}> = [];
  private domain: string = null;
  private readonly lookupUrl: string = '/lookup';
  public lookupResponse: any = null;
  public isWorkingInprogress = true;

  constructor (private router: Router, public apiService: ApiService, private whoisService: WhoisService) { }

  public setLookup (domain: string, isRedirectedResponse: boolean = true): void {
    this.cleanResponse();

    this.domain = domain;
    this.isWorkingInprogress = true;

    if (isRedirectedResponse) {
      this.redirectUser();
    } else {
      this.sendRequest();
    }
  }

  sendWhoisFallBack (): void {
    this.isWorkingInprogress = true;

    // Disable whois fallback for all requests
    // Based on the config file
    if (this.apiService.whoisFallbackEnabled === false) {
      return this.setErrorMessage(`Failed to perform lookup using ICANN WHOIS service: WHOIS fallback is deactivated.`);
    }

    this.whoisService.sendWhoisRequest(this.domain)
      .subscribe(
        (whoisResponse) => {
          // Define response
          this.lookupResponse = new LookupResponse(whoisResponse, true);
          this.isWorkingInprogress = false;
        },
        (e) => {
          if (e.error && e.error.message) {
            if (e.error.message === 'DOMAIN_NOT_FOUND') {
              this.setInfoMessage(`The requested domain was not found in the Registry or Registrar’s WHOIS server.`);
            } else {
              this.setErrorMessage(`Failed to perform lookup using WHOIS service: ${e.error.message}.`);
            }
          } else {
            this.setErrorMessage(`Failed to perform lookup using WHOIS service.`);
          }
          this.isWorkingInprogress = false;
        });
  }

  public getDomain (): string {
    return this.domain;
  }

  private redirectUser (): void {
    this.router.navigateByUrl(this.lookupUrl);
  }

  public getMessages () {
    return this.messages;
  }

  public sendRequest (): void {
    if (!this.domain) {
      this.setErrorMessage('Please enter a domain name.');
      return;
    }

    if (!this.lookupValidator()) {
      this.setErrorMessage('The domain name entered is not valid');
      return;
    }

    const localDatas = JSON.parse(sessionStorage.getItem('domainsLookup'));
    const cachedDatas = (localDatas && Array.isArray(localDatas)) ? localDatas : [];
    if (cachedDatas.find((el) => el.domain === this.domain)) {
      const checkLocalData = cachedDatas.find((el) => el.domain === this.domain);
      const checkLocalDataIndex = cachedDatas.findIndex((el) => el.domain === this.domain);
      if (!checkLocalData.lookupResponse) {
        sessionStorage.removeItem('domainsLookup');
        cachedDatas.splice(checkLocalDataIndex, 1);
      }
    }

    if (cachedDatas.find((el) => el.domain === this.domain)) {
      const localData = cachedDatas.find((el) => el.domain === this.domain);
      this.lookupResponse = new LookupResponse(localData.lookupResponse);
      this.displayView();
    } else {
      this.apiService.fetchRDAPRequest({domain: this.domain}).subscribe((config: {response: {entities: {}}, server: string}) => {
        this.lookupResponse = new LookupResponse(config);
        cachedDatas.push({domain: this.domain, lookupResponse: this.lookupResponse.rdapResponse});
        sessionStorage.setItem('domainsLookup', JSON.stringify(cachedDatas));
        this.displayView();
      }, (error) => {
        // TODO: set value directly on the error
        if (error && error.name === 'HttpErrorResponse') {
          if (error.status === 404) {
            this.setInfoMessage(`The requested domain was not found in the Registry or Registrar's RDAP server.`);
            this.isWorkingInprogress = false;
          } else {
            this.setErrorMessage(`We were unable to connect to the identified registry's RDAP server.`);
            this.isWorkingInprogress = false;
          }
        } else if (error === 'INVALID_BOOTSTRAP_FILE') {
          this.setErrorMessage(`Unable to get the bootstrap file: INVALID_BOOTSTRAP_FILE.`);

          this.isWorkingInprogress = false;
        } else if (error === 'NO_DOMAIN_FOUND_IANA') {
          this.setErrorMessage(`No registry RDAP server was identified for this domain.`);

          this.isWorkingInprogress = false;
        } else {
          // Last fallback
          this.setErrorMessage('The domain name entered is not valid');
          this.isWorkingInprogress = false;
        }
      });
    }
  }

  private displayView (): void {
    this.isWorkingInprogress = false;
    if (this.lookupResponse.authoritativeServer.rdapRelatedLink) {
      const relatedResponse = this.apiService.fetchRelatedLink(this.lookupResponse.authoritativeServer.rdapRelatedLink);
      if (!relatedResponse) {
        return;
      }
      relatedResponse.subscribe(
        (res: any) => {
          if (res) {
            const rdapObject = {response: res};
            this.lookupResponse = new LookupResponse(rdapObject, false, this.lookupResponse);
          }
        },
        () => {
          return;
        }
      );
    }
  }

  public cleanResponse (): void {
    this.messages = [];
    this.domain = null;
    this.lookupResponse = null;
  }


  private setErrorMessage (message: string): void {
    if (message !== null && message !== undefined) {
      this.messages.push({message, type: MessageTypes.Error});
    }
  }

  private setInfoMessage (message: string): void {
    if (message !== null && message !== undefined) {
      this.messages.push({message, type: MessageTypes.Info});
    }
  }

  private lookupValidator (): boolean {
    const testDomainCharSpecials = /[ !@#$%?&*()|/\,'"><;:]/;
    if (!this.domain || this.domain === '' || this.domain.length > 255 || testDomainCharSpecials.test(this.domain.trim())) {
      return false;
    } else {
      return true;
    }
  }

  isDomainLookupDisabled (): Boolean {
    const domainPart = this.apiService.domain.parts.reverse();
    for (const _value of Object.keys(this.apiService.domain.parts)) {
      if (this.apiService.domainsWhoisFallbackDisabled.includes(domainPart.join('.'))) {
        return true;
      }

      domainPart.splice(0, 1);
    }

    return false;
  }
}
