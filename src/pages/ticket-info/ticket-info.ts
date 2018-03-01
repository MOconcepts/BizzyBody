import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Platform } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { HttpClient } from '@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';
import { PopoverController} from 'ionic-angular';

import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
//import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';
/**
 * Generated class for the TicketInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ticket-info',
  templateUrl: 'ticket-info.html',
})
export class TicketInfoPage {
  @Input() data: any;
  @Input() events: any;
  @ViewChild(Content)
  content: Content;

  active: boolean;

  ticket: any;
  ticketId: any;
  ticketType: any;
  browser: any;
  tabBarElement: any;
  userDetails: any;
  
// options : InAppBrowserOptions = {
//   location : 'yes',//Or 'no' 
//   hidden : 'no', //Or  'yes'
//   clearcache : 'yes',
//   clearsessioncache : 'yes',
//   zoom : 'no',//Android only ,shows browser zoom controls 
//   hardwareback : 'yes',
//   mediaPlaybackRequiresUserAction : 'no',
//   shouldPauseOnSuspend : 'no', //Android only 
//   closebuttoncaption : 'Close', //iOS only
//   disallowoverscroll : 'no', //iOS only 
//   toolbar : 'yes', //iOS only 
//   enableViewportScale : 'no', //iOS only 
//   allowInlineMediaPlayback : 'no',//iOS only 
//   presentationstyle : 'pagesheet',//iOS only 
//   fullscreen : 'yes',//Windows only    
// };

  
  // apiUrl = 'https://rest.bizzybody.ng/api/v1/tickets/';

  constructor(
    public popoverCtrl: PopoverController, private iab: ThemeableBrowser, public platform: Platform, public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public http: HttpClient, public restProvider: RestProvider) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;
    this.ticket = this.navParams.get('ticket');

    this.ticketId = this.ticket.id;
    this.getTypes();

  /*  this.ticketType = this.http.get(this.apiUrl+this.ticketId);
    this.ticketType.subscribe(data => {
      this.ticketType = data;
      console.log(this.ticketType);
    }) */
  }

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create('PopPage');
    popover.present({
      ev: myEvent
    });
  }
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
  getTypes() {
    this.restProvider.getTypes(this.ticketId)
    .then(data => {
      this.ticketType = data;
      console.log(this.ticketType);
    })
    .catch(err => {
      console.error(err)
    })
    ;
  }

//   public openWithInAppBrowser(url : string){
//     let target = "_self";
//     this.iab.create(url,target,this.options);
// } 

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
    
} 

  ionViewDidLoad() {
    console.log(this.ticketId);
  }

}