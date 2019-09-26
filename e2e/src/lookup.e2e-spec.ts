import { LookupPage } from './lookup.po';
import { HomePage } from './home.po';
import {element, by, browser, ElementFinder} from 'protractor';

describe('LookupPage', () => {
  let page: LookupPage;
  let home: HomePage;

  beforeEach(() => {
    browser.manage().addCookie({name: 'cookie_privacy', value: 'true'});

    page = new LookupPage();
    home = new HomePage();
  });
  afterEach(() => {
    browser.manage().deleteCookie('cookie_privacy');
  });

  it('Domain not found in the dns.json file should return an error', () => {
    home.navigateTo();
    page.disableCaptcha();
    const domainForm = element(by.id('domain-form'));
    const domainInput = element(by.css('.input-domain'));
    domainInput.sendKeys('domain.test-not-found');
    domainForm.submit();
    const divError = element(by.css('.notice'));
    expect(divError.getText()).toEqual(`The requested domain was not found in the Registry or Registrar's RDAP server.`);
  });

  it('Domain found should have a correct name', () => {
    home.navigateTo();
    page.disableCaptcha();
    const domains = page.getDomainsList();
    const domainForm = element(by.id('domain-form'));
    const domainInput = element(by.css('.input-domain'));
    domainInput.sendKeys(domains[0].toString());
    domainForm.submit();
    const divTitleName = element(by.css('.title-name'));
    expect(divTitleName.getText()).toEqual('xn--f6q70qepc5a.test');
  });

  it('com query should have a correct name', () => {
    home.navigateTo();
    page.disableCaptcha();
    const domainForm = element(by.id('domain-form'));
    const domainInput = element(by.css('.input-domain'));
    domainInput.sendKeys('com');
    domainForm.submit();
    const divTitleName = element(by.css('.title-name'));
    expect(divTitleName.getText()).toEqual('com');
  });

  it('.com query should have a correct name', () => {
    home.navigateTo();
    page.disableCaptcha();
    const domainForm = element(by.id('domain-form'));
    const domainInput = element(by.css('.input-domain'));
    domainInput.sendKeys('.com');
    domainForm.submit();
    const divTitleName = element(by.css('.title-name'));
    expect(divTitleName.getText()).toEqual('com');
  });

  it('Lookup should display remarks', () => {
    home.navigateTo();
    page.disableCaptcha();
    const domainForm = element(by.id('domain-form'));
    const domainInput = element(by.css('.input-domain'));
    domainInput.sendKeys('proor.test');
    domainForm.submit();

    const elements = element.all(by.css('.remarks--entity'));
    browser.wait(elements.count(), 5 * 1000, 'Server should start within 5 seconds');
    expect(elements.count()).toEqual(2);
  });

  it ('Dnssec toggle should not be visible at start', () => {
    home.navigateTo();
    page.disableCaptcha();
    const domainForm = element(by.id('domain-form'));
    const domainInput = element(by.css('.input-domain'));
    domainInput.sendKeys('com');
    domainForm.submit();

    expect(element.all(by.css('.flex')).count()).toEqual(1);
    expect(element.all(by.css('.view-more')).count()).toEqual(0);
    expect(element.all(by.css('.dnssec-loop')).count()).toEqual(0);
    expect(element(by.css('.delegation-signed')).getText()).toBe('Unsigned');
  });

  it ('Dnssec should have a correct number', () => {
    home.navigateTo();
    page.disableCaptcha();
    const domainForm = element(by.id('domain-form'));
    const domainInput = element(by.css('.input-domain'));
    domainInput.sendKeys('example-dnssec.test');
    domainForm.submit();

    expect(element.all(by.css('.flex')).count()).toEqual(1);
    expect(element.all(by.css('.view-more')).count()).toEqual(1);
    expect(element.all(by.css('.dnssec-loop')).count()).toEqual(2);
    expect(element(by.css('.delegation-signed')).getText()).toBe('Signed');
  });

  it ('Dnssec should be expanded properly after click', () => {
    home.navigateTo();
    page.disableCaptcha();
    const domainForm = element(by.id('domain-form'));
    const domainInput = element(by.css('.input-domain'));
    domainInput.sendKeys('example-dnssec.test');
    domainForm.submit();

    element(by.css('.view-more')).click();
    expect(element.all(by.css('.dnssec-loop')).count()).toEqual(6);
  });


  it ('Displayed dates should be formatted', () => {
    element.all(by.css('.date')).each((elt: ElementFinder) => {
      elt.getText().then((text) => {
        if (text === '') {
          return true;
        }

        const dateValidator =
          /^\d\d\d\d-(0[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (0[0-9]|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9]) UTC$/g
          .test(text);

        expect(dateValidator).toBeTruthy();
      });
    });
  });
});
