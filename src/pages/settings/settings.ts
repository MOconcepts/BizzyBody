import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, ViewController, App, AlertController, ModalController } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { AppRate } from '@ionic-native/app-rate';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  appName: any;
  versionNumber: any;
  userDetails: any;

  constructor(
    private iab: ThemeableBrowser, 
    public modal: ModalController,
    private toastCtrl:ToastController, public alert: AlertController, public app: App, public viewCtrl: ViewController,
    public appRate: AppRate,
    public platform: Platform,
    private appVersion: AppVersion, public navCtrl: NavController, public navParams: NavParams) { 
      const data = JSON.parse(localStorage.getItem("userData"));
      this.userDetails = data.userData;

    this.appVersion.getVersionNumber().then(version => { 
      this.versionNumber = version;
      console.log(this.versionNumber);
      });
      this.appVersion.getAppName().then(name => {
        this.appName = name;
        console.log(this.versionNumber);
        });

  }

  rateApp(){
        this.appRate.preferences = {
          displayAppName: 'The BizzyBody',
          usesUntilPrompt: 2,
          promptAgainForEachNewVersion: false,
          storeAppURL: {
            ios: '1354916921',
            android: 'market://details?id=ng.bizzybody.event'
          },
          customLocale: {
            title: 'Did you get the FUN?',
            message: 'If you enjoy using BizzyBody, would you mind taking a moment to rate it? Thanks so much!',
            cancelButtonLabel: 'No, Thanks',
            laterButtonLabel: 'Remind Me Later',
            rateButtonLabel: 'Rate It Now'
          },
          callbacks: {
            onRateDialogShow: function(callback){
              console.log('rate dialog shown!');
            },
            onButtonClicked: function(buttonIndex){
              console.log('Selected index: -> ' + buttonIndex);
            }
          }
        };

     this.appRate.promptForRating(true);
  }

  logout() {

    this.viewCtrl.dismiss();

    let alert = this.alert.create({
      title: "Log-out ?",
      message: 'Are you sure you want to log-out?',
      buttons: [{
        text: 'No',
        handler: () => {
          console.log('No clicked')
        }
      },
        {
          text: 'Yes',
          handler: () => {

    //Api Token Logout
    localStorage.clear();
    this.presentToast('See you soon! :)');
    this.app.getRootNavs()[0].setRoot('WelcomePage'); 
          }
        }
      ]
    });
    alert.present();
  }

  public openWithInAppBrowser(url : string){
    let target = "_system";

    const options: ThemeableBrowserOptions = {
      statusbar: {
          color: '#FECB00'
      },
      toolbar: {
          height: 40,
          color: '#FECB00'
      },
      title: {
          color: '#ffffff',
          showPageTitle: true
      },
      closeButton: {
        wwwImage: 'assets/images/close.png',
        wwwImagePressed: 'assets/images/close.png',
        wwwImageDensity: 3,
          align: 'left',
          event: 'closePressed'
      },
      backButtonCanClose: true,
    
    };
   //this.iab.create(url,target,this.options);

  const browser: ThemeableBrowserObject = this.iab.create(url,target,options);
    browser.close();
} 

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  showTermsModal() {
    let modal = this.modal.create('TermsPage');
    modal.present();
  }

  showPrivacyModal() {
    let modal = this.modal.create('PrivacyPage');
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

}
