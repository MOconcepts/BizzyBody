import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Profile } from './profile';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';

@NgModule({
  declarations: [
    Profile,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(Profile),
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'bizzybody-ng' } as CloudinaryConfiguration),
    PipesModule
  ],
  exports: [
    Profile
  ]
})
export class ProfileModule {}
