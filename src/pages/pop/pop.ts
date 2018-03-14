import { Component } from '@angular/core';
import { AlertController, IonicPage, App, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

/**
 * Generated class for the PopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pop',
  templateUrl: 'pop.html',
})
export class PopPage {

  constructor(
    private toastCtrl:ToastController, public alert: AlertController, public modalCtrl: ModalController,
    public app: App, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController ) {
  }

  goToSettings() {
    this.navCtrl.push('SettingsPage');
  }

  editProfile() {
    this.navCtrl.push('EditProfilePage');
  }

  preference() {
    this.navCtrl.push('EditPrefPage');
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad PopPage');
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
