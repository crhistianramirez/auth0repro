import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { mergeMap } from 'rxjs/operators';
import { Browser } from '@capacitor/browser';
import { App } from '@capacitor/app';
import { callbackUri } from './auth.config';
import { Platform } from '@ionic/angular';
import { from, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService, private ngZone: NgZone, private platform: Platform, private router: Router) {}

  ngOnInit(): void {
    App.addListener('appUrlOpen', ({ url }) => {
      // Must run inside an NgZone for Angular to pick up the changes
      // https://capacitorjs.com/docs/guides/angular
      this.ngZone.run(() => {
        console.log({url})
        if (url?.startsWith(callbackUri)) {
          if (
            url.includes('state=') &&
            (url.includes('error=') || url.includes('code='))
          ) {
            console.log(`is callback url with state and code`)
            this.auth
              .handleRedirectCallback(url)
              .pipe(mergeMap(() => this.closeBrowser()))
              .subscribe();
          } else {
            this.closeBrowser();
          }
        }
        // enable deep linking
        const slug = url.split(".samples").pop();
        this.router.navigateByUrl(slug);
        console.log(`deep link to ${slug}`)
      });
    });
  }

  closeBrowser(): any {
    // only implemented on ios so add check to avoid error
    if(this.platform.is('ios')) {
      // browser close not implemented in android
      return from(Browser.close())
    }
    return of(null) // expects an observable
  }
}
