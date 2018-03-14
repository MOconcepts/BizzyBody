import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabsController } from '../../ionic2-super-tabs/src';
import {SuperTabs} from "../../ionic2-super-tabs/src/components/super-tabs";

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {

  @ViewChild(SuperTabs) superTabs: SuperTabs;

  tab1Root = 'HomePage';
  tab2Root = 'TicketPage';
  tab3Root = 'RoomPage';
  tab4Root = 'SearchPage';
  tab5Root = 'Profile';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
  }

}
