import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';

  constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService, public platform: Platform) {   
    if(localStorage.getItem('userData')){
    this.navCtrl.setRoot('TabsPage');
  }
    this.dir = platform.dir();
    translate.get(["TUTORIAL_SLIDE1_TITLE",
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "TUTORIAL_SLIDE2_TITLE",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "TUTORIAL_SLIDE3_TITLE",
      "TUTORIAL_SLIDE3_DESCRIPTION",
      "TUTORIAL_SLIDE4_TITLE",
      "TUTORIAL_SLIDE4_DESCRIPTION",
      "TUTORIAL_SLIDE5_TITLE",
      "TUTORIAL_SLIDE5_DESCRIPTION",
    ]).subscribe(
      (values) => {
        this.slides = [
          {
            title: "For You",
            description: "Find events closest to you at any time.",
            image: 'assets/img/ica-slidebox-img-1.png',
          },
          {
            title: "For You",
            description: "Get tickets at discounted prices",
            image: 'assets/img/ica-slidebox-img-2.png',
          },
          {
            title: "For You",
            description: "Chat in real time with other event attendees",
            image: 'assets/img/ica-slidebox-img-3.png',
          },
          {
            title: "Dear Event Owner,",
            description: "Publish and promote your own events",
            image: 'assets/img/ica-slidebox-img-3.png',
          },
          {
            title: "Dear Event Owner,",
            description: "Sell tickets and monitor sales.",
            image: 'assets/img/ica-slidebox-img-3.png',
          }
       
        ];
      });
  }

  startApp() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

}
