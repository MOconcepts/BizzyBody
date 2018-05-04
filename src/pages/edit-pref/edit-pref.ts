import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the EditPrefPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-pref',
  templateUrl: 'edit-pref.html',
})
export class EditPrefPage {
  @ViewChild("updatebox") updatebox;

public userDetails: any;
  userPostData = {
    user_id: "",
    token: ""
  };
  
  prefData: any;
  resposeData : any;
 
 public pref: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService : AuthService, private toastCtrl:ToastController, private _FB: FormBuilder){  
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;

      this.pref = _FB.group({
        'where'        : ['', Validators.required],
        'user'         : [''],
        'uid'          : ['']
     });
  }

  updatePref() {
    this.presentToast("Updating...");
    //Api connections
  this.authService.postData(this.pref.value, "updatePref").then((result) =>{
  this.prefData = result;
  this.presentToast("Preference update was successful");
  if(this.prefData){
    localStorage.setItem('userData', JSON.stringify(this.prefData) )
    this.navCtrl.push('TabsPage');
  }
  
  }, (err) => {
    //Connection failed message
  });

}

presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 5000
  });
  toast.present();
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPrefPage');
  }

}
