import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo () {
    return browser.get('/');
  }

  navigateTo404 () {
    return browser.get('/pagenotfound');
  }

  getParagraphText () {
    return element(by.css('rwc-root h1')).getText();
  }
}
