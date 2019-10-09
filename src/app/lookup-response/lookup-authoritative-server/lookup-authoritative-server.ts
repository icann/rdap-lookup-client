import { Component, Input } from '@angular/core';
import { AuthoritativeServer } from 'src/app/lookup/AuthoritativeServer';

@Component({
  selector: 'rwc-lookup-authoritative-server',
  templateUrl: './lookup-authoritative-server.html'
})
export class  LookupAuthoritativeServerComponent {
  @Input() authoritativeServer: AuthoritativeServer;

  constructor () {

  }

  isAuthoritativePanelEmpty () {
    return (
      !this.authoritativeServer.registryUrl &&
      !this.authoritativeServer.rdapRelatedLink &&
      !this.authoritativeServer.isEventExists(this.authoritativeServer.events, 'last update of RDAP database') &&
      !this.authoritativeServer.isEventExists(this.authoritativeServer.registrarEvents, 'last update of RDAP database')
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
