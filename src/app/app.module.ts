import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler, Picker } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthService } from '../providers/auth-service';
import { Common } from '../providers/common';
import { NgxContentLoadingModule } from 'ngx-content-loading';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FormsModule } from '@angular/forms';

import 'intl';
import 'intl/locale-data/jsonp/en';
import { GhotsProvider } from '../providers/ghots/ghots';
import { ComponentsModule } from '../components/components.module';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { AppVersion } from '@ionic-native/app-version';
import { AppRate } from '@ionic-native/app-rate';
import { OneSignal } from '@ionic-native/onesignal';

import { SuperTabsModule } from '../ionic2-super-tabs/src';
import { Calendar } from '@ionic-native/calendar';
// import { SuperTabsModule } from 'ionic2-super-tabs';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgxContentLoadingModule,
    SuperTabsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ComponentsModule,
    IonicModule.forRoot(MyApp),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    RestProvider,
    Common,
    SocialSharing,
    AuthService,
    OneSignal,
    ThemeableBrowser,
    File,
    Calendar,
    AppVersion,
    AppRate,
    Transfer,
    Camera,
    FilePath,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GhotsProvider,
  ]
})
export class AppModule { }