import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import { PopoverController} from 'ionic-angular';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage { 
  searchData : any;
  search = {"key": "", "what": "", "where": ""};
  public userDetails: any;

  constructor(
    public popoverCtrl: PopoverController,
    public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, private toastCtrl:ToastController) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;
  }
  openPopover(myEvent) {
    let popover = this.popoverCtrl.create('PopPage');
    popover.present({
      ev: myEvent
    });
  }
  goToProfile() {
    this.navCtrl.parent.select(4);
  }


  searchDb(){
    if(this.search.key || this.search.what || this.search.where){
      this.presentToast("Waiting for the fun!");
     this.authService.postData(this.search, "search").then((result) =>{
     this.searchData = result;
     this.navCtrl.push('ResultPage', {srch: this.searchData});
     console.log(this.searchData);
     }, (err) => {
       //Connection failed message
     });
    }
    else{
     this.presentToast("All fields can't be empty");
    }
   
   }
   presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
