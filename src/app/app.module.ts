import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import {  HttpClient, HttpClientModule } from '@angular/common/http';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthService } from '../providers/auth-service';
import { Common } from '../providers/common';
import { NgxContentLoadingModule } from 'ngx-content-loading';
import { MomentModule } from 'angular2-moment';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FormsModule } from '@angular/forms';
 


// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgxContentLoadingModule,
    MomentModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    RestProvider,
    Common,
    SocialSharing,
    AuthService,
    ThemeableBrowser,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }