import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AcronymService {
  static acronym: string = null;
  static acronymDescription: string = null;

  constructor () {  }

  setAcronym (acronym: string) {
    AcronymService.acronym = acronym;
    AcronymService.acronymDescription = this.getDefinition(acronym);
  }

  getDefinition (acronym: string): string {
    switch (acronym) {
      case 'Domain Name Registration':
        return `<p>The process of selecting a domain name and registering it in a top-level domain.
        Domain name registration typically involves a:</p>
        <ul>
          <li>Registrant: the individual or entity who wants to register a domain name</li>
          <li>Registrar: an entity that processes domain name registrations</li>
          <li>Registry operator: the entity that maintains the master database (the registry) of domain names registered in a particular
          top-level domain (TLD)</li>
        </ul>
        <p>
          To complete a domain name registration, the registrant registers the domain name with a
          registrar. The registrar verifies that the domain name is available in the
          requested TLD and submits the registration request to the registry operator for
          that TLD. The registry operator then adds the new domain to the TLD’s registry.
          A registrant can optionally register a domain name through a reseller.
          Resellers are third-party companies that offer domain name registration services through
          a registrar.</p>`;
      case 'Domain Name':
        return `<p>A unique name that forms the basis of the uniform resource locators (URLs) that
          people use to find resources on the Internet (e.g., web pages, email servers, images,
          and videos). The domain name itself identifies a specific address on the Internet that
          belongs to an entity such as a company, organization, institution, or individual.
          For example, in the URL https://www.icann.org/public-comments, the domain name icann.org
          directs a browser to the ICANN organization’s domain. The rest of the URL directs the
          browser to a specific resource on the www server within ICANN’s domain (in this case,
          the Public Comments page on the ICANN org website).</p>

          <p>A domain name consists of two or more textual segments separated by dots. For example,
          in the domain name icann.org, the first part of the name, icann,
          represents a second-level domain within the top-level domain org.
          Domain names can also have more than two segments, as in bbc.co.uk. In this example,
          bbc represents a subdomain within the second-level domain co, which resides in the
          top-level domain uk.</p>`;
        case 'Registry Operators':
          return `
          <p>The organization that maintains the master database (registry) of all domain names
          registered in a particular top-level domain (TLD). ROs receive requests from registrars
          to add, delete, or modify domain names, and they make the requested changes in the
          registry.</p>

          <p>An RO also operates the TLD’s authoritative name servers and generates the zone file.
          This information enables recursive name servers across the Internet to translate domain
          names into Internet Protocol (IP) addresses, so devices on the Internet can connect to
          one another.</p>`;

        case 'Registrars':
          return `
          <p>An organization through which individuals and entities (registrants) register domain
          names. During the registration process, a registrar verifies that the requested domain
          name meets registry requirements, and submits the name to the appropriate registry
          operator. Registrars are also responsible for collecting required information from
          registrants. After registration, registrants can make updates to their domain name settings through their registrars.
          </p>

          <p>A registrar that has entered into a Registrar Accreditation Agreement with ICANN is
          referred to as an ICANN-accredited registrar. A listing of ICANN-accredited registrars
          appears on the ICANN website.</p>`;
    }

    return '';
  }


}
