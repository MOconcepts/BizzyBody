import {Component} from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";

/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({selector: 'page-signup', templateUrl: 'signup.html'})
export class Signup {
  resposeData : any;
  userData = {"username":"", "password":"","email":"","fname":"","lname":"","where":""};
  constructor(public navCtrl : NavController, public authService : AuthService, private toastCtrl:ToastController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

  signup() {
    if(this.userData.username && this.userData.password && this.userData.email && this.userData.fname && this.userData.lname && this.userData.where){
      //Api connections
    this.authService.postData(this.userData, "signup").then((result) =>{
      this.presentToast("Connecting...");
    this.resposeData = result;
    if(this.resposeData.userData){
      console.log(this.resposeData);
      localStorage.setItem('userData', JSON.stringify(this.resposeData) )
      this.navCtrl.push('TabsPage');
    }
    else{
      this.presentToast("Please provide valid data");
    }
    
    }, (err) => {
      //Connection failed message
    this.presentToast(err);
    });
  }
  else {

    this.presentToast("All form fields are required - Please check and try again.");
    console.log("All form fields are required - Please check and try again.");
  }
  
  }

  login() {
    this
      .navCtrl
      .push('Login');
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 8000
    });
    toast.present();
  }

}
