import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  getPage: any;

  constructor(public navCtrl: NavController, public http: HttpClient, public restProvider: RestProvider) {

    this.Privacy();
  } 

  Privacy() {
    this.restProvider.getPage()
    .then(data => {
      this.getPage = data;
      console.log(this.getPage);
    })
    .catch(err => {
      console.error(err)
    })
    ;
  } 
  
showPage(show) {
  this.navCtrl.push('ShowPage', {show: show});
}

}
