import { browser } from 'protractor';

export class FaqPage {
  navigateTo() {
    return browser.get('/faq');
  }
}
