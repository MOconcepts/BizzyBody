import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BizzyEventPage } from './bizzy-event';
@NgModule({
  declarations: [
    BizzyEventPage,
  ],
  imports: [
    IonicPageModule.forChild(BizzyEventPage),
  ],
  exports: [
    BizzyEventPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BizzyEventPageModule {}
