import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TicketPage } from './ticket';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TicketPage,
  ],
  imports: [
    ComponentsModule,
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'bizzybody-ng' } as CloudinaryConfiguration),
    IonicPageModule.forChild(TicketPage),
  ],
  exports: [
    TicketPage
  ]
})
export class TicketPageModule {}
