import { NgModule } from '@angular/core';
import { MomentPipe } from './moment/moment';
import { TogoPipe } from './moment/togo';
@NgModule({
	declarations: [MomentPipe, TogoPipe],
	imports: [],
	exports: [MomentPipe, TogoPipe],
})
export class PipesModule {}
