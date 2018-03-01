import { Component, NgZone} from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';

declare var google: any;
/**
 * Generated class for the AutocompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-autocomplete',
  templateUrl: 'autocomplete.html',
})
export class AutocompletePage {
  autocompleteItems;
  autocomplete;
  service = new google.maps.places.AutocompleteService();


  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private zone: NgZone) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }
  
  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: {country: 'NG'} }, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
        predictions.forEach(function (prediction) {
          me.autocompleteItems.push(prediction);
        });
      });
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AutocompletePage');
  }
}

