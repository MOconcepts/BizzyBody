import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';

import {SharedModule} from "../../app/shared.module";
@NgModule({
  declarations: [TabsPage],
  imports: [IonicPageModule.forChild(TabsPage),
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [TabsPage]
})
export class TabsPageModule { }
