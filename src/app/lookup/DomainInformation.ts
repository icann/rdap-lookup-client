import { LookupInformation } from './LookupInformation';

interface NameServers {
  ipAddresses: object;
  objectClassName: string;
  port43: string;
  handle: string;
}

interface DomainStatus {
  type: string;
  link: string;
}

export class DomainInformation extends LookupInformation {
  ldhName: String;
  unicodeName: String;
  handle: String;
  domainStatus: Array<DomainStatus> = [];
  nameServers: Array<NameServers> = [];

  constructor (response: any, mergeRegistrarInformations = null) {
    super(response);

    this.parseFromRdapResponse(response, mergeRegistrarInformations);
  }

  parseFromRdapResponse (response: any, mergeRegistrarInformations: any) {
    if (mergeRegistrarInformations === null) {
      this.ldhName = response.ldhName;
      this.unicodeName = response.unicodeName;
      this.handle = response.handle;
      this.domainStatus = this.parseDomainStatus(response.status);
      this.nameServers = this.parseNameServers(response.nameservers);
    } else {
      this.ldhName = mergeRegistrarInformations.ldhName;
      this.unicodeName = mergeRegistrarInformations.unicodeName;
      this.handle = mergeRegistrarInformations.handle;
      this.domainStatus = this.parseDomainStatus(mergeRegistrarInformations.status);
      this.nameServers = this.parseNameServers(mergeRegistrarInformations.nameservers);
    }
  }

  private parseDomainStatus (status: any): Array<DomainStatus> {
    let statusString = '';
    if (!status) {
      return [];
    }

    for (const index of Object.keys(status)) {
      const strings = status[index].split(' ');
      for (const stringIndex in strings) {
        if (parseInt(stringIndex, null) + 1 !== strings.length) {
          statusString += (strings[stringIndex]) + ' ';
        } else {
          statusString += (strings[stringIndex]);
        }
      }
      statusString += ', ';
    }

    const tmpStatus = statusString.split(', ');
    const statusArray = [];
    for (const index in tmpStatus) {
      if (index !== null && tmpStatus[index]) {
        statusArray[index] = this.getDomainStatusLink(tmpStatus[index]);
      }
    }

    return statusArray;
  }

  private parseNameServers (namesServers: Array<any>): Array<NameServers> {
    if (!namesServers) {
      return [];
    }

    const nameServer: any = [];
    for (const index of namesServers) {
      let ips = [];
      if (index.ipAddresses && !index.ipAddresses.v4) {
        index.ipAddresses.v4 = [];
      }

      if (index.ipAddresses) {
        if (index.ipAddresses.v6 && index.ipAddresses.v6.length > 0) {
          ips = index.ipAddresses.v4.concat(index.ipAddresses.v6);
        } else {
          ips = index.ipAddresses.v4;
        }
      }
      nameServer.push({ldhName: index.ldhName, ips: ips});
    }

    return nameServer;
  }

  // TODO: move it into a helper
  private getDomainStatusLink (status: String) {
    const baseLink = 'https://icann.org/epp#';
    const statusArray = status.split(' ');
    let statusString: String = '';
    for (const index in statusArray) {
      if (parseInt(index, 2) !== 0) {
        statusString += statusArray[index].charAt(0).toUpperCase() + statusArray[index].slice(1);
      } else {
        statusString += statusArray[index];
      }
    }

    switch (status) {
      case 'add period':
        return {type: 'addPeriod', link: baseLink + statusString};
      case 'auto renew period':
        return {type: 'autoRenewPeriod', link: baseLink + statusString};
      case 'inactive':
        return {type: 'inactive', link: baseLink + statusString};
      case 'ok':
        return {type: 'ok', link: baseLink + statusString};
      case 'pending create':
        return {type: 'pendingCreate', link: baseLink + statusString};
      case 'pending delete':
        return {type: 'pendingDelete', link: baseLink + statusString};
      case 'pending renew':
        return {type: 'pendingRenew', link: baseLink + statusString};
      case 'pending restore':
        return {type: 'pendingRestore', link: baseLink + statusString};
      case 'pending transfer':
        return {type: 'pendingTransfer', link: baseLink + statusString};
      case 'pending update':
        return {type: 'pendingUpdate', link: baseLink + statusString};
      case 'redemption period':
        return {type: 'redemptionPeriod', link: baseLink + statusString};
      case 'renew period':
        return {type: 'renewPeriod', link: baseLink + statusString};
      case 'pending update':
        return {type: 'pendingUpdate', link: baseLink + statusString};
      case 'server delete prohibited':
        return {type: 'serverDeleteProhibited', link: baseLink + statusString};
      case 'server hold':
        return {type: 'serverHold', link: baseLink + statusString};
      case 'server renew prohibited':
        return {type: 'serverRenewProhibited', link: baseLink + statusString};
      case 'server transfer prohibited':
        return {type: 'serverTransferProhibited', link: baseLink + statusString};
      case 'server update prohibited':
        return {type: 'serverUpdateProhibited', link: baseLink + statusString};
      case 'transfer period':
        return {type: 'transferPeriod', link: baseLink + statusString};
      case 'client delete prohibited':
        return {type: 'clientDeleteProhibited', link: baseLink + statusString};
      case 'client hold':
        return {type: 'clientHold', link: baseLink + statusString};
      case 'client renew prohibited':
        return {type: 'clientRenewProhibited', link: baseLink + statusString};
      case 'client transfer prohibited':
        return {type: 'clientTransferProhibited', link: baseLink + statusString};
      case 'client update prohibited':
        return {type: 'clientUpdateProhibited', link: baseLink + statusString};
    }
  }

}
