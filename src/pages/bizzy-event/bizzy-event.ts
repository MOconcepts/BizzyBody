import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, ToastController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { RestProvider } from '../../providers/rest/rest';
import { PopoverController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import { Calendar } from '@ionic-native/calendar';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import moment from 'moment'
/**
 * Generated class for the BizzyEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare const google;

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

  @ViewChild('map') mapElement: ElementRef;
   map: any;

   labels: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   labelIndex = 0;

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
  disableSave;
  
  public date: string = new Date().toISOString();
  
  //apiUrl = 'https://rest.bizzybody.ng/api/v1/events/';

  constructor(
    public alertCtrl: AlertController,
    private calendar: Calendar,
    private sharingVar: SocialSharing,
    private iab: ThemeableBrowser,
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

  saveEvent(){
    this.disableSave = true;
    this.calendar.createEvent(this.event.title, this.event.place, this.event.tags, 
    new Date(this.event.countdown), 
    new Date(this.event.stop)).then(
      (msg) => {
    this.presentToast("Success! " + this.event.title + " has been added to your calender");
      },
      (err) => {
        let alert = this.alertCtrl.create({
          title: 'Failed!',
          subTitle: err,
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }

  ionViewDidLoad() {
    this.startMap();
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

  OpenUber(){
    let url= 'https://m.uber.com/ul/?client_id=OxE042bv6gc_ZYQfftrBGEyf0UkQs4Gy&action=setPickup&dropoff[latitude]='+this.event.lat+'&dropoff[longitude]='+this.event.lng+'&dropoff[nickname]='+this.event.place+'&dropoff[formatted_address]='+this.event.place;
    let target = "_system";

    const options: ThemeableBrowserOptions = {
      statusbar: {
          color: '#FECB00'
      },
      toolbar: {
          height: 50,
          color: '#FECB00'
      },
      title: {
          color: '#ffffff',
          showPageTitle: true
      },
      closeButton: {
        wwwImage: 'assets/images/close.png',
        wwwImagePressed: 'assets/images/close.png',
        wwwImageDensity: 2,
          align: 'left',
          event: 'closePressed'
      },
      backButtonCanClose: true,
    
    };

    const browser: ThemeableBrowserObject = this.iab.create(url,target,options);
    browser.show()
  }

  share(){
    this.sharingVar.share("", this.event.title , "https://bizzybody.ng/uploads/events/"+this.event.image,  "https://bizzybody.ng/event/"+this.event.slug)
      .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed")
      })

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

goToUser(pub) {
  this.navCtrl.push('UserPage', {pub: this.event.publisher});
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

startMap() {
  let posMaceio = { lat: parseFloat(this.event.lat), lng: parseFloat(this.event.lng) }
  this.map = new google.maps.Map(this.mapElement.nativeElement, {
    zoom: 14,
    center: posMaceio,
    mapTypeId: 'roadmap'
  });
  
  let marker = new google.maps.Marker({
    position: posMaceio,
    map: this.map
  });

  var infowindow = new google.maps.InfoWindow({
    content: "<strong><ion-icon name='navigate' style='font-size: unset;'></ion-icon> Event Location</strong><br> "+ this.event.place
  });

  marker.addListener('click', function() {
    infowindow.open(this.map, marker);
  });

  infowindow.open(this.map,marker);

  this.map.set('styles', [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]);

}

}
