import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { RestProvider } from '../../providers/rest/rest';
import { PopoverController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";

import { SocialSharing } from '@ionic-native/social-sharing';
import moment from 'moment'
/**
 * Generated class for the BizzyEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bizzy-event',
  templateUrl: 'bizzy-event.html',
})
export class BizzyEventPage implements OnInit {

  private _trialEndsAt;
  
  private _diff: number;
  
  private _days: number;
  
  private _hours: number;
  
  private _minutes: number;
  
  private _seconds: number;

  event: any;
  params: any = {};
  cId: any;
  eId: any;
  similarE: any;
  getCheck: any;
  tabBarElement: any;
  userDetails: any;
  data: any;
  uid: any;
  resposeData : any;
  resposeData2 : any;
  data2: any;
  ffId: any;
  checkLent: any;
  ffLent: any;
  getFollow: any;
  disableButton;
  
  //apiUrl = 'https://rest.bizzybody.ng/api/v1/events/';

  constructor(
    private sharingVar: SocialSharing,
    public popoverCtrl: PopoverController,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public events: Events, public http: HttpClient, public restProvider: RestProvider, public authService : AuthService, private toastCtrl:ToastController) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;
    this.uid = this.userDetails.user_id;

 /*   this.eventId = this.navParams.get('eventId');

    this.eventData = this.http.get(this.apiUrl+this.eventId);
    this.eventData
    .subscribe(data => {

      this.eventData = data;
      console.log(this.eventData);
    }) */
    this.event = this.navParams.get('event');
    this.cId = this.event.category;
    this.eId = this.event.id;
    this.ffId = this.event.user_id;
    this.data = {"u_id": this.uid, "e_id": this.eId};
    this.data2 = {"ff_id": this.ffId, "ffn_id": this.uid};
    
    this.smEvents();
    this.getCheckIn();
    this.getFollowIn();

  } 

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create('PopPage');
    popover.present({
      ev: myEvent
    });
  }
    smEvents() {
    this.restProvider.smEvents(this.cId, this.eId)
    .then(data => {
      this.similarE = data;
      console.log(this.similarE);
    })
    .catch(err => {
      console.error(err)
    })
    ;
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 8000
    });
    toast.present();
  }

  getCheckIn() {
    this.restProvider.getCheckIn(this.uid, this.eId)
    .then(data => {
      this.getCheck = data;
      this.checkLent = this.getCheck.length;
    })
  }

  getFollowIn() {
    this.restProvider.getFollowIn(this.uid, this.ffId)
    .then(data => {
      this.getFollow = data;
      this.ffLent = this.getFollow.length;
      console.log(this.ffLent);
    })
  }

  checkIn() {
    this.disableButton = true;
    this.authService.postData(this.data, "checkIn").then((result) =>{
    this.resposeData = result;
    this.getCheckIn();
    console.log(this.resposeData);

    this.presentToast("Event checkin was successful");
    
    }, (err) => {
      this.presentToast(err);
      //Connection failed message
    });
  
  }


  followIn() {
    this.authService.postData(this.data2, "followIn").then((result) =>{
    this.resposeData2 = result;
    this.getFollowIn();
    console.log(this.resposeData2);

    this.presentToast("You are now following " + this.event.username);
    
    }, (err) => {
      this.presentToast(err);
      //Connection failed message
    });
  
  }

  
 whatsappShare(){
  this.sharingVar.shareViaWhatsApp(this.event.title , "https://bizzybody.ng/uploads/events/"+this.event.image,  "https://bizzybody.ng/event/"+this.event.slug)
    .then(()=>{
      alert("Success");
    },
    ()=>{
       alert("failed")
    })
}

twitterShare(){
  this.sharingVar.shareViaTwitter(this.event.title , "https://bizzybody.ng/uploads/events/"+this.event.image,  "https://bizzybody.ng/event/"+this.event.slug)
  .then(()=>{
      alert("Success");
    },
    ()=>{
       alert("failed")
    })
}

facebookShare(){
  this.sharingVar.shareViaFacebook(this.event.title , "https://bizzybody.ng/uploads/events/"+this.event.image,  "https://bizzybody.ng/event/"+this.event.slug)
  .then(()=>{
      alert("Success");
    },
    ()=>{
       alert("failed")
    })
}

goTicketInfo(event) {
  this.navCtrl.push('TicketInfoPage', {ticket: event});
}

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
  ngOnInit() {

    let count = moment(this.event.countdown).format('ddd MMM DD YYYY HH:mm')

    this._trialEndsAt = count;

    Observable.interval(1000).map((x) => {
            this._diff = Date.parse(this._trialEndsAt) - Date.parse(new Date().toString());
        }).subscribe((x) => {           
            this._days = this.getDays(this._diff);
            this._hours = this.getHours(this._diff);
            this._minutes = this.getMinutes(this._diff);
            this._seconds = this.getSeconds(this._diff);
        });
}
goBizzyEvent(event) {
  this.navCtrl.push('BizzyEventPage', {event: event});
}

getDays(t){
  return Math.floor( t/(1000*60*60*24) );
}

getHours(t){
  return Math.floor( (t/(1000*60*60)) % 24 );
}

getMinutes(t){
  return Math.floor( (t/1000/60) % 60 );
}

getSeconds(t){
  return Math.floor( (t/1000) % 60 );
}

  ionViewDidLoad() {
    console.log( this.navParams.get('event'));
  }

}
