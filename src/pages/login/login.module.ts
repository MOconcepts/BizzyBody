import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Login } from './login';

@NgModule({
  declarations: [
    Login,
  ],
  imports: [
    IonicPageModule.forChild(Login),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [
    Login
  ]
})
export class LoginModule {}
