import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {  
  
  @ViewChild("updatebox") updatebox;
public userDetails: any;
  userPostData = {
    user_id: "",
    token: ""
  };
  passData: any;
  prefData: any;
  resposeData : any;
 userData: any;
 pass: any;
 public profile_segment:string;

 pref = {"where":""};
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService : AuthService, private toastCtrl:ToastController){  
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;

    this.userData = {"fname":this.userDetails.name,
                      "lname":this.userDetails.surname,
                      "gender":this.userDetails.gender,
                      "bd":this.userDetails.birthday,
                      "phone":this.userDetails.number,
                      "fb":this.userDetails.fb,
                      "twt":this.userDetails.twt,
                      "ig":this.userDetails.ig,
                      "web":this.userDetails.web,
                      "user":this.userDetails.username,
                      "uid":this.userDetails.user_id };
      
 this.pass = {"p1":"","p2":"",
 "user":this.userDetails.username,
 "uid":this.userDetails.user_id };
  }

  editProfile() {
    if(this.userData.fname && this.userData.lname){
      //Api connections
      console.log(this.userData);
    this.authService.postData(this.userData, "editProfile").then((result) =>{
      this.presentToast("Connecting...");
    this.resposeData = result;
    if(this.resposeData.userData){
      this.presentToast("Account update was successful");
      localStorage.setItem('userData', JSON.stringify(this.resposeData) )
      this.navCtrl.push('TabsPage');
    }
    else{
      this.presentToast("Please provide valid username, password and email");
    }
    
    }, (err) => {
      //Connection failed message
    });
  }
  else {
    this.presentToast("Give valid information.");
  }
  
  }

  updatePref() {
      //Api connections
    this.authService.postData(this.pref, "updatePref").then((result) =>{
      this.presentToast("Connecting...");
    this.prefData = result;
    if(this.passData){
      this.presentToast("Preference change was successful");
    }
      localStorage.setItem('userData', JSON.stringify(this.prefData) )
      this.navCtrl.push('Profile');
 
    
    }, (err) => {
      //Connection failed message
    });
  
  }

  updatePass() {
    if(this.pass.p1 == this.pass.p2){
      //Api connections
    this.authService.postData(this.pass, "updatePass").then((result) =>{
      this.presentToast("Connecting...");
    this.passData = result;
    if(this.passData){
      this.presentToast("Password change was successful");
    }
      this.navCtrl.push('Profile');
   
    }, (err) => {
      //Connection failed message
    });
  }
  else {
    this.presentToast("Password do not match");
  }
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  ionViewWillEnter() {
    this.profile_segment = 'main';
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 8000
    });
    toast.present();
  }
}
