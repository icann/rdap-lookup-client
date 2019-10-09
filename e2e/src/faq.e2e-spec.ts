import { FaqPage } from './faq.po';
import { element, by, browser } from 'protractor';

describe('FaqPage', () => {
  let page: FaqPage;

  beforeEach(() => {
    page = new FaqPage();
  });

  it('Should have a good structure', () => {
    page.navigateTo();

    expect(element(by.css('.menu')).isPresent()).toBeTruthy();
    expect(element(by.css('.content')).isPresent()).toBeTruthy();
    expect(element(by.css('.footer')).isPresent()).toBeTruthy();
  });

  it('Url should be correct', () => {
    page.navigateTo();

    expect(browser.getCurrentUrl()).toMatch(/\/faq$/);
  });

  it('Should have a correct title', () => {
    page.navigateTo();

    expect(element(by.css('rwc-root h1')).getText()).toBe('Domain Name Registration Data Lookup Frequently Asked Questions (FAQs)');
  });
});
