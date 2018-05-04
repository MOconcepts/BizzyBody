import { Component, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { SuperTabsController } from '../../ionic2-super-tabs/src';
import {SuperTabs} from "../../ionic2-super-tabs/src/components/super-tabs";
@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild(SuperTabs) superTabs: SuperTabs;

  tab1Root = 'HomePage';
  tab2Root = 'TicketPage';
  tab3Root = 'RoomPage';
  tab4Root = 'SearchPage';
  tab5Root = 'Profile';


  constructor() {

  }
}
