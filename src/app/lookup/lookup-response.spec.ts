import { LookupResponse } from './lookup-response';

describe('LookupResponseComponent', () => {
  const incompleteRdapResponse = {response: {}};
  const validRdapResponse = {response: {ldhName: 'testdomain.com'}};

  it ('Empty rdapResponse object should instantiate the component properly', () => {
    const response = new LookupResponse({}, false);
    expect(response.rdapResponse).toBe(undefined);
  });
  it ('RdapResponse should be same as the given', () => {
    const rdapResponse = new LookupResponse(validRdapResponse);
    expect(rdapResponse.domainInformation.ldhName).toBe('testdomain.com');
  });
  it ('secureDns not set should return isDnsSecEnabled to false', () => {
    const rdapValidWithoutSecureDns = {response: {ldhName: 'testdomain.com', secureDNS: {}}};
    const rdapValidMissformedSecureDns2 = {response: {ldhName: 'testdomain.com', secureDNS: {'delegationSigned': false}}};
    const response = new LookupResponse(validRdapResponse);
    const response2 = new LookupResponse(rdapValidWithoutSecureDns);
    const response3 = new LookupResponse(rdapValidMissformedSecureDns2);
    expect(response.dnsSec.delegation).toBe('Unsigned');
    expect(response2.dnsSec.delegation).toBe('Unsigned');
    expect(response3.dnsSec.delegation).toBe('Unsigned');
  });
  it ('secureDns set should return isDnsSecEnabled to true', () => {
    const rdapValidSecureDns = {response: {ldhName: 'testdomain.com', secureDNS: {'delegationSigned': true}}};
    const response = new LookupResponse(rdapValidSecureDns);
    expect(response.dnsSec.delegation).toBe('Signed');
  });
  it ('Valid RdapResponse should not set whoisResponse fallback', () => {
    const rdapResponse = new LookupResponse(validRdapResponse);
    expect(rdapResponse.whoisRawResponse).toBe(undefined);
  });
  it ('ParseDomainStatus should return empty array for empty status', () => {
    const response = new LookupResponse(incompleteRdapResponse);
    expect(response.domainInformation.domainStatus.length).toBe(0);
  });
  it ('ParseDomainStatus should return array length 0 for missing status', () => {
    const invalidResponseStatusAsArray = {response: {status: []}};
    const invalidResponseStatusAsNull = {response: {status: null}};
    const response = new LookupResponse(invalidResponseStatusAsArray);
    const response2 = new LookupResponse(invalidResponseStatusAsNull);
    expect(response.domainInformation.domainStatus.length).toBe(0);
    expect(response2.domainInformation.domainStatus.length).toBe(0);
  });
  it ('ParseDomainStatus should return array length 1 for valid status', () => {
    const validResponseStatusArray = {response: {status: ['client transfer prohibited']}};
    const response = new LookupResponse(validResponseStatusArray);
    expect(response.domainInformation.domainStatus.length).toBe(1);
  });
  it ('ParseNameServers should set array empty if no nameServers is given', () => {
    const rdapResponse = new LookupResponse(validRdapResponse);
    expect(rdapResponse.domainInformation.nameServers.length).toBe(0);
  });
  it ('ParseNameServers should set array length 2 if 2 nameServers is given', () => {
    const rdapResponseNameServers = {response: {'nameservers': [
      {'ipAddresses': {'v4': ['00.00.00.01']}},
      {'ipAddresses': {'v4': ['00.00.00.02']}}
    ]}};
    const rdapResponse = new LookupResponse(rdapResponseNameServers);
    expect(rdapResponse.domainInformation.nameServers.length).toBe(2);
  });
});
