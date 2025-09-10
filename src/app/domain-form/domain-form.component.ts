import { Component, Input, OnInit} from '@angular/core';
import { LookupService, MessageTypes } from '../services/lookup.service';

@Component({
    selector: 'rwc-domain-form',
    templateUrl: './domain-form.component.html',
    styleUrls: ['./domain-form.component.scss'],
    standalone: false
})

export class DomainFormComponent implements OnInit {
  @Input() isRedirectedResponse = false;
  @Input() touAnchorLink = false;
  domain: string;
  public messageTypes = MessageTypes;

  constructor (public lookupService: LookupService) {}

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

}
