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

});
