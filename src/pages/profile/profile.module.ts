import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Profile } from './profile';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Profile,
  ],
  imports: [
    IonicPageModule.forChild(Profile),
    PipesModule
  ],
  exports: [
    Profile
  ]
})
export class ProfileModule {}
