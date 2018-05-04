import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/**
 * Generated class for the MomentPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'togo',
})
export class TogoPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  
transform(date, format) {
  return moment(date).fromNow(format);
}

}