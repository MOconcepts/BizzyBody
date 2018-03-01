import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { AuthService } from "../../providers/auth-service";
import { RestProvider } from '../../providers/rest/rest';
import { Common } from "../../providers/common";
import { PopoverController} from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {

  @ViewChild("updatebox") updatebox;
  public userDetails: any;
  public resposeData: any;
  public dataSet: any;
  public noRecords: boolean;
  userPostData = {
    user_id: "",
    token: ""
  };

  usr: any;
  evnt: any;
  lent: any;
  lentIn: any;
  lentff: any;
  lentffMe: any;
  evntIn: any;
  ffMe: any;
  Iff: any;

  public profile_segment:string;

  constructor(
    public popoverCtrl: PopoverController, 
    private iab: ThemeableBrowser,
    public common: Common,
    public authService: AuthService,
    public restProvider: RestProvider, 
    public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {  
      const data = JSON.parse(localStorage.getItem("userData"));
      this.userDetails = data.userData;
      this.userPostData.token = this.userDetails.token;
      this.usr = this.userDetails.user_id;
      this.myEvents();
      this.myCheckIn();
      this.Ifollow();
      this.followingMe();
      // this.lnt = this.evnt.length;
  }

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create('PopPage');
    popover.present({
      ev: myEvent
    });
  }
  myEvents() {
    this.common.presentLoading();
    this.restProvider.myEvents(this.usr)
    .then(data => {
      this.evnt = data;
      this.lent = this.evnt.length;
      this.noRecords = false
      
      this.common.closeLoading();
      console.log(this.lent);
    })
    .catch(err => {
      console.error(err)
    });
  } 

  myCheckIn() {
    this.restProvider.myCheckIn(this.usr)
    .then(data => {
      this.evntIn = data;
      this.lentIn = this.evntIn.length;
      console.log(this.lentIn);
    })
    .catch(err => {
      console.error(err)
    });
  } 

  
  followingMe() {
    this.restProvider.followingMe(this.usr)
    .then(data => {
      this.ffMe = data;
      this.lentffMe = this.ffMe.length;
    })
    .catch(err => {
      console.error(err)
    });
  } 

  Ifollow() {
    this.restProvider.Ifollow(this.usr)
    .then(data => {
      this.Iff = data;
      this.lentff = this.Iff.length;
    })
    .catch(err => {
      console.error(err)
    });
  } 
  // Define segment for everytime when profile page is active
  ionViewWillEnter() {
    this.profile_segment = 'myEvent';
  }

  postPage() {
    this.navCtrl.push('PostPage');
  }

  public openWithInAppBrowser(url : string){
    let target = "_self";

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

goToSearch() {
  this.navCtrl.parent.select(3);
} 

}
