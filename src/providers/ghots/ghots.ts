import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

/*
  Generated class for the GhotsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GhotsProvider {
	private _isLoading = new BehaviorSubject<Object>(false);
	public isLoading = this._isLoading.asObservable();

	public setLoading(isLoading: boolean) {
		this._isLoading.next({
			isLoading: isLoading
		})
	}
  constructor(public http: HttpClient) {
    console.log('Hello GhotsProvider Provider');
  }

}
