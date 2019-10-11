import { LookupInformation } from './LookupInformation';

export class DnsSec extends LookupInformation {
  remarks: any[];
  delegation: string;
  dsdataDisplayed: any[];
  dsdata: any[] = [];
  keyData: any[] = [];
  maxSigLife: number;
  zoneSigned: string;
  isDnssecPanelVisibled = true;

  constructor (response: any) {
    super(response);

    this.parseFromRdapResponse(response);
  }

  private isDnsSecEnabled (rdapResponse): boolean {
    return rdapResponse.secureDNS && rdapResponse.secureDNS.delegationSigned;
  }

  private parseFromRdapResponse (response: any): void {
    this.delegation = (this.isDnsSecEnabled(response)) ? 'Signed' : 'Unsigned';
    if (response.secureDNS && response.secureDNS.dsData) {
      this.dsdata = response.secureDNS.dsData;
      if (response.secureDNS.dsData.length > 2) {
        this.dsdataDisplayed = [...response.secureDNS.dsData.slice(0, 2)];
      } else {
        this.dsdataDisplayed = response.secureDNS.dsData;
      }
    }
    if (response.secureDNS && response.secureDNS.maxSigLife) {
      this.maxSigLife = response.secureDNS.maxSigLife;
    }
    if (response.secureDNS && response.secureDNS.zoneSigned) {
      this.zoneSigned = 'Signed';
    }
    if (response.secureDNS && response.secureDNS.keyData) {
      this.keyData = response.secureDNS.keyData;
    }
    if (response.secureDNS && response.secureDNS.remarks) {
      this.remarks = response.secureDNS.remarks;
    }

    // Hide dnssec panel if we don't have the data
    if (response.secureDNS === undefined || response.secureDNS === null) {
     this.isDnssecPanelVisibled = false;
    } else {
      this.isDnssecPanelVisibled = true;
    }
  }

}
