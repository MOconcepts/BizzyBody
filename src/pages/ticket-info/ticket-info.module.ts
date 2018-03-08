import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TicketInfoPage } from './ticket-info';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';

@NgModule({
  declarations: [
    TicketInfoPage,
  ],
  imports: [
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'bizzybody-ng' } as CloudinaryConfiguration),
    IonicPageModule.forChild(TicketInfoPage),
  ],
  exports: [
    TicketInfoPage
  ]
})
export class TicketInfoPageModule {}
