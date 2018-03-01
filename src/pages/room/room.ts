import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';
import { PopoverController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {

  public userDetails: any;
  rooms = [];
  ref = firebase.database().ref('chatrooms/');

  constructor(
    public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
    });
  }

  goToProfile() {
    this.navCtrl.parent.select(4);
  }


  openPopover(myEvent) {
    let popover = this.popoverCtrl.create('PopPage');
    popover.present({
      ev: myEvent
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }

  addRoom() {
    this.navCtrl.push('AddRoomPage');
  }

  joinRoom(key, name) {
    this.navCtrl.setRoot('LivePage', {
      key:key,
      name:name,
      nickname:this.userDetails.username
    });
  }

}

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};
