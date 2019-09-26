import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CookieNotificationComponent} from './cookie-notification.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

class CookieServiceStub {
  get(_name: string): string {
    return null;
  }

  set(_name: string, _value: string, _expires?: number | Date, _path?: string, _domain?: string, _secure?: boolean): void {
  }
}

describe('CookieNotificationComponent', () => {
  let component: CookieNotificationComponent;
  let fixture: ComponentFixture<CookieNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CookieNotificationComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: CookieService, useClass: CookieServiceStub},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct content', () => {
    const notification = fixture.debugElement.nativeElement.querySelector('.cookie-notification');
    expect(notification.textContent).toContain(
      'This site uses cookies to deliver an efficient user experience and to help us see how the site is used');
  });

  it('should contain the dismiss button', () => {
    const dismissBtn = fixture.debugElement.nativeElement.querySelector('.cookie-notification');
    expect(dismissBtn.textContent).toContain('Ok');
  });
});
