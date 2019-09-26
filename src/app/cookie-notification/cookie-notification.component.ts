import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

const COOKIE_PRIVACY_NOTIFICATION = 'cookie_privacy';

@Component({
  selector: 'rwc-cookie-notification',
  templateUrl: './cookie-notification.component.html',
  styleUrls: ['./cookie-notification.component.scss']
})
export class CookieNotificationComponent implements OnInit {

  sawCookieNotification: string;

  constructor(private cookieService: CookieService) {
  }

  ngOnInit(): void {
   this.sawCookieNotification = this.cookieService.get(COOKIE_PRIVACY_NOTIFICATION);
  }

  // When key press to dismiss the success message
  onDismissNotifcation(keyCode: number = null): void {
    if (keyCode !== null && keyCode !== 13 && keyCode !== 32) {
      return;
    }

    this.sawCookieNotification = 'true';
    if (location.protocol === 'https:') {
      this.cookieService.set(COOKIE_PRIVACY_NOTIFICATION, this.sawCookieNotification, 365, '/', null, true, 'Strict');
    } else {
      this.cookieService.set(COOKIE_PRIVACY_NOTIFICATION, this.sawCookieNotification, 365, '/', null, false, 'Strict');
    }
  }

  showNotification(): boolean {
    return this.sawCookieNotification !== 'true';
  }
}
