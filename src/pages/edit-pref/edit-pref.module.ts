import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPrefPage } from './edit-pref';

@NgModule({
  declarations: [
    EditPrefPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPrefPage),
  ],
  exports: [
    EditPrefPage
  ]
})
export class EditPrefPageModule {}
