import { Component, OnInit  } from '@angular/core';
import { ViewController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";

/**
 * Generated class for the PrivacyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyPage implements OnInit {
  title: any;
  info: any;
  mod: any;
  resposeData2 : any;

  constructor( public authService: AuthService, public view: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.authService.postData({"app": 1, "slug": "privacy"}, "getPage").then((result) =>{
      this.resposeData2 = result[0];
      this.title = this.resposeData2.info_title;
      this.info = this.resposeData2.info_content;
      this.mod = this.resposeData2.date_modified;
      console.log(this.resposeData2);
      
      }, (err) => {
        //Connection failed message
      });
  }
  dismiss() {
    this.view.dismiss();
  }
}
