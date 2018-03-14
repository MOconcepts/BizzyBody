import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
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
  resposeData : any;
 pass: any;
 
 public userData: FormGroup;
 public profile_segment:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService : AuthService, private toastCtrl:ToastController, private _FB: FormBuilder){  
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;

    this.userData	 = _FB.group({
      'fname'       : ['', Validators.required],
      'lname'       : ['', Validators.required],
      'gender'      : [''],
      'phone'       : [''],
      'fb'          : [''],
      'twt'         : [''],
      'ig'          : [''],
      'web'         : [''],
      'user'        : [''],
      'uid'         : ['']
      // 'birthday'          : [''],
   });
      
 this.pass = {"p1":"","p2":"",
 "user":this.userDetails.username,
 "uid":this.userDetails.user_id };
  }

  editProfile() {
    this.presentToast("Updating...");
      //Api connections
    this.authService.postData(this.userData.value, "editProfile").then((result) =>{
    this.resposeData = result;
    this.presentToast("Account update was successful");
    if(this.resposeData.userData){
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
