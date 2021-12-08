import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthConfig, AuthModule } from '@auth0/auth0-angular';
import { callbackUri } from './auth.config';
import { environment } from '../environments/environment';

const config: AuthConfig = {
  domain: environment.domain,
  clientId: environment.clientId,
  redirectUri: callbackUri,
  cacheLocation: "localstorage",
  useRefreshTokens: true
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AuthModule.forRoot(config),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
