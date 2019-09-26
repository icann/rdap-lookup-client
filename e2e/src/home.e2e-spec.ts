import { HomePage } from './home.po';
import { element, by, browser } from 'protractor';

describe('Home', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it ('Form should be valid', () => {
    page.navigateTo();
    const domainInput = element(by.css('.input-domain'));
    expect(domainInput.getAttribute('value')).toBe('');
    domainInput.sendKeys('icann.com');

    const lookupSubmit = element(by.css('.submit-lookup'));
    expect(lookupSubmit.getAttribute('type')).toBe('submit');
    lookupSubmit.click();
    expect(browser.getCurrentUrl()).toMatch(/\/lookup$/);
  });

  it ('Should contain about part', () => {
    page.navigateTo();

    expect(element(by.css('.lookup-tool-informations--title')).getText()).toBe('About ICANN’s Domain Name Registration Data Lookup');
  });

  it ('Should contain the FAQ link', () => {
    page.navigateTo();
    const faqLink = element(by.css('.faq-link'));
    faqLink.click();

    expect(browser.getCurrentUrl()).toMatch(/\/faq$/);
  });

  it('Should have a good structure', () => {
    page.navigateTo();

    expect(element(by.css('.menu')).isPresent()).toBeTruthy();
    expect(element(by.css('.content')).isPresent()).toBeTruthy();
    expect(element(by.css('.footer')).isPresent()).toBeTruthy();
  });

});
