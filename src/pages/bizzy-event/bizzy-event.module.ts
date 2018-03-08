import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BizzyEventPage } from './bizzy-event';
import { PipesModule } from '../../pipes/pipes.module';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
@NgModule({
  declarations: [
    BizzyEventPage,
  ],
  imports: [
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'bizzybody-ng' } as CloudinaryConfiguration),
    IonicPageModule.forChild(BizzyEventPage),
    PipesModule
  ],
  exports: [
    BizzyEventPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BizzyEventPageModule {}
