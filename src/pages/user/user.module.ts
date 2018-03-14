import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPage } from './user';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';

@NgModule({
  declarations: [
    UserPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(UserPage),
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'bizzybody-ng' } as CloudinaryConfiguration),
    PipesModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [
    UserPage
  ]
})
export class UserPageModule {}
