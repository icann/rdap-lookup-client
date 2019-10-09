import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it ('404 should be redirected to the homepage', () => {
    page.navigateTo404();
    expect(browser.getCurrentUrl()).toMatch(/\/$/);
  });

});
