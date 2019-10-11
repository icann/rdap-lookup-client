import { DomainInformation } from './DomainInformation';
import { Contact } from './Contact';
import { Registrar } from './Registrar';
import { DnsSec } from './Dnssec';
import { Reseller } from './Reseller';
import { AuthoritativeServer } from './AuthoritativeServer';
import { Event } from './Event';
import { Response } from './Response';

export class LookupResponse {
  domainInformation: DomainInformation;
  contact: Contact;
  reseller: Reseller;
  registrar: Registrar;
  dnsSec: DnsSec;
  authoritativeServer: AuthoritativeServer;
  rdapResponse: any;
  rdapJsonResponse: any;
  mergeRegistrarInformations: any;
  registrarResponse: object;
  response: object;
  whoisRawResponse: object;
  nonParsedResponse: object;

  public constructor (rdapResponse, mergeRegistrarInformations = null) {
    this.mergeRegistrarInformations = mergeRegistrarInformations;

    this.parseRdapResponse(rdapResponse);
  }

  public isEventExists (events: any, event: string) {
    return (events && events.findIndex((el) => el.eventAction === event && el.eventDate !== null) > -1);
  }

  private parseRdapResponse (rdapResponse: any): void {
    if (!rdapResponse || !rdapResponse.response) {
      return;
    }

    this.rdapResponse = JSON.parse(JSON.stringify(rdapResponse));
    if (this.mergeRegistrarInformations) {
      this.rdapJsonResponse = JSON.parse(JSON.stringify(this.mergeRegistrarInformations.nonParsedResponse.response));
      this.registrarResponse = JSON.parse(JSON.stringify(rdapResponse));
    } else {
      this.rdapJsonResponse = JSON.parse(JSON.stringify(rdapResponse.response));
    }

    const responseParser = new Response(rdapResponse.response, this.mergeRegistrarInformations);
    const response = responseParser.parseResponseFromRdap();

    if (this.mergeRegistrarInformations) {
      this.mergeRegistrarInformations.registrarEvents = response.registrarEvents;
      this.rdapResponse = this.mergeRegistrarInformations.nonParsedResponse;
      this.domainInformation = new DomainInformation(response);
      this.contact = new Contact(response);
      this.registrar = new Registrar(response);
      this.reseller = this.mergeRegistrarInformations.reseller;
      this.dnsSec = new DnsSec(response);
      this.authoritativeServer = new AuthoritativeServer(response, this.mergeRegistrarInformations.response);
    } else {
      this.nonParsedResponse = this.rdapResponse;
      this.domainInformation = new DomainInformation(response);
      this.contact = new Contact(response);
      this.registrar = new Registrar(response);
      this.reseller = new Reseller(response);
      this.dnsSec = new DnsSec(response);
      this.authoritativeServer = new AuthoritativeServer(response);
      this.response = rdapResponse.response;
    }
  }

  parseRegistrarEvents(response: any): any {
    response.parsedRegistrarEvents = [];

    if (response.events) {
      response.events.forEach((element: any) => response.parsedRegistrarEvents.push(new Event(element)));
    }

    return response;
  }

}
