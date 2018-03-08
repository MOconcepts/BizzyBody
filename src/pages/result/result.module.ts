import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultPage } from './result';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';

@NgModule({
  declarations: [
    ResultPage,
  ],
  imports: [
    ComponentsModule,
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'bizzybody-ng' } as CloudinaryConfiguration),
    IonicPageModule.forChild(ResultPage),
    PipesModule
  ],
})
export class ResultPageModule {}
