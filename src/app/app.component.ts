import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { OneSignal } from '@ionic-native/onesignal';

const config = {
  apiKey: "AIzaSyDjAnrTy0sjq877krPMtUKfkbjhMK84u0w",
  authDomain: "bizzybody-3c9cc.firebaseapp.com",
  databaseURL: "https://bizzybody-3c9cc.firebaseio.com",
  projectId: "bizzybody-3c9cc",
  storageBucket: "bizzybody-3c9cc.appspot.com",
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'TutorialPage';

  constructor(
    public _platform: Platform,
    private _notification: OneSignal,
    public _SplashScreen: SplashScreen) {
    this.initializeApp();
  }
  // initializeApp() {
  //   this._platform.ready().then(() => {

  //     this._notification.startInit("1fa83f96-658f-4c5a-807a-3c76d19738be", "180160240530");
  //     this._notification.inFocusDisplaying(this._notification.OSInFocusDisplayOption.Notification);
  //     this._notification.setSubscription(true);
  //     this._notification.handleNotificationReceived().subscribe(() => {
  //         // your code after Notification received.
  //     });
  //     this._notification.handleNotificationOpened().subscribe(() => {
  //         // your code to handle after Notification opened
  //     });
  //     this._notification.endInit();
  // })

  //     // do whatever you need to do here.
  //     setTimeout(() => {
  //       this._SplashScreen.hide();
  //     }, 500);
  //   });
  //   firebase.initializeApp(config);
  // }

  initializeApp() {
    this._platform.ready().then(() => {
        // this._notification.startInit("1fa83f96-658f-4c5a-807a-3c76d19738be", "180160240530");
        // this._notification.inFocusDisplaying(this._notification.OSInFocusDisplayOption.Notification);
        // this._notification.setSubscription(true);
        // this._notification.handleNotificationReceived().subscribe(() => {
        //     // your code after Notification received.
        // });
        // this._notification.handleNotificationOpened().subscribe(() => {
        //     // your code to handle after Notification opened
        // });
        // this._notification.endInit();

              // do whatever you need to do here.
      setTimeout(() => {
        this._SplashScreen.hide();
      }, 500);
    });
    firebase.initializeApp(config);
  }
}