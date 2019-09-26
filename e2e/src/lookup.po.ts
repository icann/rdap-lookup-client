import { browser } from 'protractor';

export class LookupPage {

  private domainsList: String[] = [
    '大兵小將.test',
    '大兵小將.test-not-found',
    'xn--noc6ci4b4b3a.test',
    'nic.how',
    'nic.career',
    'nic.br',
    'dominio.com.ar',
    'nic.com',
    'example.net',
    'videos.neustar',
    'videos.app'
  ];

  disableCaptcha (): void {
    browser.executeScript('return window.localStorage.setItem("CAPTCHA", "3");');
  }

  enableCaptcha  (): void {
    browser.executeScript('return window.localStorage.removeItem("CAPTCHA");');
  }

  getDomainsList () {
    return this.domainsList;
  }


  navigateTo () {
    return browser.get(`lookup`);
  }
}
