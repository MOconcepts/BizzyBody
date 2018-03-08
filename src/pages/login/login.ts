import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  @ViewChild('input') myInput ;
  
  resposeData : any;
  public userData: FormGroup;
  // userData = {"username":"", "password":""};

  constructor(public navCtrl: NavController, public authService: AuthService, private toastCtrl:ToastController,
    private _FB: FormBuilder) {


      this.userData	 = _FB.group({
        'username'        : ['', Validators.required],
        'password'        : ['', Validators.required]
     });

  }
  ionViewLoaded() {

    setTimeout(() => {
      this.myInput.setFocus();
    },150);

 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  login(){
   if(this.userData.value){
    this.presentToast("Connecting...");
    this.authService.postData(this.userData.value, "login").then((result) =>{
    this.resposeData = result;
    console.log(this.resposeData);
    if(this.resposeData.userData){
     localStorage.setItem('userData', JSON.stringify(this.resposeData) )
     this.navCtrl.setRoot('TabsPage');
  }
  else{
    this.presentToast(this.resposeData.error.text);
  }
    
    }, (err) => {
      //Connection failed message
    this.presentToast('Username is incorrect, please check again or create an account');
    });
   }
   else{
    this.presentToast("Enter your username and password");
   }
  
  }

  signup(){
    this.navCtrl.push('Signup', {}, {
      animate: true,
      direction: 'forward'});
   }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 8000
    });
    toast.present();
  }

}