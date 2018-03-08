import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Common } from "../../providers/common";
import { PopoverController} from 'ionic-angular';

import { GhotsProvider } from '../../providers/ghots/ghots';


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
              private _ghotsPrv: GhotsProvider,
              public navParams: NavParams, 
              public restProvider: RestProvider,
              public common: Common) {
                const data = JSON.parse(localStorage.getItem("userData"));
                this.userDetails = data.userData;

                this._setLoaded()
    this.getTickets();
  }
  doRefresh(refresher) {
    this._setLoaded()
    this.getTickets();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 3000);
  }
  private _setLoaded() {
		setTimeout(() => {
			this._ghotsPrv.setLoading(false)
		}, 8000);
  }

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create('PopPage');
    popover.present({
      ev: myEvent
    });
  }
  getTickets() {
    this.restProvider.getTickets()
    .then(data => {
      this.tickets = data;
      this.lent = this.tickets.length;
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
