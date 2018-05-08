import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, Platform, AlertController } from 'ionic-angular';

import { AuthService } from "../../providers/auth-service";
import { HttpClient } from '@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';
import { Common } from "../../providers/common";
import { PopoverController} from 'ionic-angular';
import { GhotsProvider } from '../../providers/ghots/ghots'; 

import * as numeral from 'numeral';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage implements OnInit {
  public userDetails: any;
  publisher: any;
  user: any;
  usr: any;
  usrImg: any;
  evnt: any;
  lent: any;
  ffMe: any;
  lentffMe: any;
  ffLent: any;
  getFollow: any;
  uid: any;
  resposeData2 : any;
  data2: any;

  public date: string = new Date().toISOString();

  constructor(
    public popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController, 
    public toastCtrl: ToastController, 
    public platform: Platform, 
    public http: HttpClient,
		private _ghotsPrv: GhotsProvider,
    public common: Common,
    public authService: AuthService,
    public restProvider: RestProvider,
    public navCtrl: NavController, public navParams: NavParams) {   
      const data = JSON.parse(localStorage.getItem("userData"));
      this.userDetails = data.userData;
      this.uid = this.userDetails.user_id;

  }
  ngOnInit() {
    this._setLoaded();
  }

  getFollowIn() {
    this.restProvider.getFollowIn(this.uid, this.publisher)
    .then(data => {
      this.getFollow = data;
      this.ffLent = this.getFollow.length;
      console.log(this.ffLent);
      this.followingMe();
    })
  }
	private _setLoaded() {
		setTimeout(() => {
			this._ghotsPrv.setLoading(false)
		}, 8000);
	}

  goBizzyEvent(i) {
    this.navCtrl.push('BizzyEventPage', {event: i});
  }

  usrEvents() {
    //this.common.presentLoading();
    this.restProvider.myEvents(this.publisher)
    .then(data => {
      this.evnt = data;
      this.lent = this.evnt.length;
      
     // this.common.closeLoading();
      console.log(this.evnt);
    })
    .catch(err => {
      console.error(err)
    });
  } 
  followingMe() {
    this.restProvider.followingMe(this.publisher)
    .then(data => {
      this.ffMe = data;
     var count = this.ffMe.length;

        var number = numeral(count);
        this.lentffMe = number.format('0a');

        console.log(this.lentffMe)


    })
    .catch(err => {
      console.error(err)
    });
  } 
  ionViewWillEnter() {
    var pub = this.navParams.get('pub');
    this.restProvider.getUser(pub)
    .then(data => {
      this.user = data;
      this.usr = this.user.user.username;
      this.usrImg = this.user.user.img;
      this.publisher = this.user.user.user_id;

    console.log(this.publisher);
    })
    .catch(err => {
      console.error(err)
    });

  }

  ionViewDidEnter(){

    this.usrEvents();

    this.data2 = {"ff_id": this.publisher, "ffn_id": this.uid};
    this.followingMe();
    this.getFollowIn();
  }

  followIn() {
    this.authService.postData(this.data2, "followIn").then((result) =>{
    this.resposeData2 = result;
    this.getFollowIn();
    console.log(this.resposeData2);

    this.presentToast("You are now following " + this.usr);
    
    }, (err) => {
      this.presentToast(err);
      //Connection failed message
    });
  
  }

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create('PopPage');
    popover.present({
      ev: myEvent
    });
  }
  
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 8000
    });
    toast.present();
  }
}
