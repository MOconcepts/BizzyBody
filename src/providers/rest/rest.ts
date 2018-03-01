import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  //private apiUrl2 = 'http://bizzybody.ng:5000/api/';

  private apiUrl = 'https://rest.bizzybody.ng/api/v1';

  constructor(public http: Http, public httpc: HttpClient) {
    console.log('Hello RestProvider Provider');
  }
  
  getEvents(page): Observable<string[]> {
    return this.http.get(this.apiUrl+"/events?page="+page)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getTypes(ticketId) {
    return new Promise(resolve => {
      this.httpc.get(this.apiUrl+'/tickets/'+ticketId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

 smEvents(cId, eId) {
    return new Promise(resolve => {
      this.httpc.get(this.apiUrl+'/smEvents/'+cId+'/'+eId).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  tixEvents() {
    return new Promise(resolve => {
      this.httpc.get(this.apiUrl+'/tixEvents').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  locEvents(locId) {
     return new Promise(resolve => {
       this.httpc.get(this.apiUrl+'/locEvents/'+locId).subscribe(data => {
         resolve(data);
       }, err => {
         console.log(err);
       });
     });
   }

  myEvents(usr) {
    return new Promise(resolve => {
      this.httpc.get(this.apiUrl+'/events/'+usr).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


  myCheckIn(usr) {
    return new Promise(resolve => {
      this.httpc.get(this.apiUrl+'/myCheckIn/'+usr).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  followingMe(usr) {
    return new Promise(resolve => {
      this.httpc.get(this.apiUrl+'/followingMe/'+usr).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  Ifollow(usr) {
    return new Promise(resolve => {
      this.httpc.get(this.apiUrl+'/myFollow/'+usr).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


  getPage() {
    return new Promise(resolve => {
      this.httpc.get(this.apiUrl+'/getPage').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getTickets() {
    return new Promise(resolve => {
      this.httpc.get(this.apiUrl+'/tickets').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }




}
