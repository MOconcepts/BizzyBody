import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostPage } from './post';

// Import Froala Editor.
import "froala-editor/js/froala_editor.pkgd.min.js";

// Import Angular2 plugin.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  declarations: [
    PostPage,
  ],
  imports: [
    IonicPageModule.forChild(PostPage),
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class PostPageModule {}
