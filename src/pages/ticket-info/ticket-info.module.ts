import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TicketInfoPage } from './ticket-info';

@NgModule({
  declarations: [
    TicketInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(TicketInfoPage),
  ],
  exports: [
    TicketInfoPage
  ]
})
export class TicketInfoPageModule {}
