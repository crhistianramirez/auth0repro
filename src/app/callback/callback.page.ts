import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

// this component is the only unauthenticated route in the application and is where
// users are redirected by auth0 after logging in via universal login
@Component({
  selector: 'app-callback',
  templateUrl: './callback.page.html',
  styleUrls: ['./callback.page.scss'],
})
export class CallbackPage implements OnInit {
  isError: boolean;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.error$.subscribe((error) => {
      this.isError = true;
      console.error(error);
    });
  }

  login() {
    // loginWithRedirect works as expected and brings user to the login page to log back in
    // whereas the buildAuthorizeUrl method logs the user in without presenting them the login screen option
    // this.authService.loginWithRedirect()
    this.authService
      .buildAuthorizeUrl()
      .pipe(mergeMap((url) => from(Browser.open({ url, windowName: '_self' }))))
      .subscribe();
  }
}
