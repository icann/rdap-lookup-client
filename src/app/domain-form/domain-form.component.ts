import { Component, Input, OnInit} from '@angular/core';
import { AcronymService } from '../services/acronym.service';
import { LookupService, MessageTypes } from '../services/lookup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'rwc-domain-form',
  templateUrl: './domain-form.component.html',
  styleUrls: ['./domain-form.component.scss'],
  providers: [AcronymService]
})

export class DomainFormComponent implements OnInit {
  @Input() isRedirectedResponse = false;
  @Input() touAnchorLink = false;
  domain: string;
  public messageTypes = MessageTypes;

  constructor (private router: Router, public acronymService: AcronymService, public lookupService: LookupService) {}

  ngOnInit () {
    if (this.lookupService.getDomain()) {
      this.domain = this.lookupService.getDomain();

      return this.submitRequest();
    }
  }

  submitLookupAction (): void {
    this.lookupService.setLookup(this.domain, this.isRedirectedResponse);
  }

  submitRequest (): void {
    this.lookupService.sendRequest();
  }

  goToHomeAnchorDomainTou (): void {
    // Prevent angular router not refreshing click for same route anchor
    const url = this.router.url.split('#');

    if (url[0] === '/') {
      window.location.hash = '';
      window.location.hash = '#domaintou';
    } else {
      this.router.navigate(['/'], { fragment: 'domaintou' });
    }
  }

  handleCorrectCaptcha (): void {
    this.lookupService.sendWhoisFallBack();
  }

}
