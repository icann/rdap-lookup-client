import { Component, Input } from '@angular/core';
import { DomainInformation } from '../../lookup/DomainInformation';

@Component({
  selector: 'rwc-lookup-domain-information',
  templateUrl: './lookup-domain-information.html'
})
export class  LookupDomainInformationComponent {
  @Input() domainInformation: DomainInformation;

  constructor () {

  }

  isSubPanelDatesEmpty () {
    return (
      !this.domainInformation.isEventExists(this.domainInformation.events, 'expiration') &&
      !this.domainInformation.isEventExists(this.domainInformation.registrarEvents, 'expiration') &&
      !this.domainInformation.isEventExists(this.domainInformation.events, 'last changed') &&
      !this.domainInformation.isEventExists(this.domainInformation.events, 'registration')
    );
  }

  getEventDate (event, events) {
    if (!Array.isArray(events)) {
      return;
    }

    return events.find((el) => el.eventAction === event)
      ? events.find((el) => el.eventAction === event).eventDate
      : null;
  }
}
