import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController} from 'ionic-angular';
import { GhotsProvider } from '../../providers/ghots/ghots';
		

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  srch: any;
  lent: any;
  public userDetails: any;

  constructor(
    private _ghotsPrv: GhotsProvider,
    public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;

    this._setLoaded()
    this.reload();
    this.srch = this.navParams.get('srch');
    this.lent = this.srch.length;
  }
	refresh() {
		this._setLoaded()
		this.reload();
	}
	reload() {
		this._ghotsPrv.setLoading(true)
		this._setLoaded()
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

  ionViewDidLoad() {
    console.log(this.srch);
  }
  goBizzyEvent(i) {
    this.navCtrl.push('BizzyEventPage', {event: i});
  }
}
