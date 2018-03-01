import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Common } from "../../providers/common";
import { PopoverController} from 'ionic-angular';


/**
 * Generated class for the TicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html',
})
export class TicketPage {

  tickets: any;
  public userDetails: any;
  lent: any;

  constructor(
    public popoverCtrl: PopoverController,
    public navCtrl: NavController, 
              public app: App, 
              public navParams: NavParams, 
              public restProvider: RestProvider,
              public common: Common) {
                const data = JSON.parse(localStorage.getItem("userData"));
                this.userDetails = data.userData;
    this.getTickets();
  }

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create('PopPage');
    popover.present({
      ev: myEvent
    });
  }
  getTickets() {
    this.common.presentLoading();
    this.restProvider.getTickets()
    .then(data => {
      this.tickets = data;
      this.lent = this.tickets.length;
      this.common.closeLoading();
      console.log(this.lent);

    })
    .catch(err => {
      console.error(err)
    })
    ;
  } 

  goTicketInfo(ticket) {
    this.navCtrl.push('TicketInfoPage', {ticket: ticket});
  }
  
  goToProfile() {
    this.navCtrl.parent.select(4);
  }
}
