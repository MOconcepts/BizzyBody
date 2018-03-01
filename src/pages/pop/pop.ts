import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, ViewController } from 'ionic-angular';
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
    public modalCtrl: ModalController,
    public app: App, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController ) {
  }

  goToSettings() {
    this.navCtrl.push('ContactPage');
  }

  editProfile() {
    this.navCtrl.push('EditProfilePage');
  }

  logout() {

    this.viewCtrl.dismiss();
    //Api Token Logout
    localStorage.clear();

    this.app.getRootNavs()[0].setRoot('WelcomePage'); 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopPage');
  }

}
