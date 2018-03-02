import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BizzyEventPage } from './bizzy-event';
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
  declarations: [
    BizzyEventPage,
  ],
  imports: [
    IonicPageModule.forChild(BizzyEventPage),
    PipesModule
  ],
  exports: [
    BizzyEventPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BizzyEventPageModule {}
