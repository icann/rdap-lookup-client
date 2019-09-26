import { LookupInformation } from './LookupInformation';

export class AuthoritativeServer extends LookupInformation {
  registryUrl: string;
  rdapRelatedLink: string;

  constructor (response: any, isWhoisFallback = false, mergeRegistrarInformations = null) {
    super(response, isWhoisFallback);

    if (!isWhoisFallback) {
      this.parseFromRdapResponse(response, mergeRegistrarInformations);
    }
  }

  parseFromRdapResponse (rdapResponse: any, mergeRegistrarInformations: any): void {
    if (mergeRegistrarInformations === null) {
      this.registryUrl = this.getSelfLink(rdapResponse.links);
      this.rdapRelatedLink = this.getRelatedLink(rdapResponse.links);
    } else {
      this.registryUrl = this.getSelfLink(mergeRegistrarInformations.links);
      this.rdapRelatedLink = this.getRelatedLink(mergeRegistrarInformations.links);
    }
  }

}
