import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

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
    public _SplashScreen: SplashScreen) {
    this.initializeApp();
  }
  initializeApp() {
    this._platform.ready().then(() => {
      // do whatever you need to do here.
      setTimeout(() => {
        this._SplashScreen.hide();
      }, 500);
    });
    firebase.initializeApp(config);
  }
}
