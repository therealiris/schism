import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PeopleService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PeopleService {

  constructor(public http: Http) {
    console.log('Hello PeopleService Provider');
  }

  sendData(userObject, callback){
  	this.http.post('http://192.168.0.104:9000/users/data/',userObject)
  	.map(response => response.json())
    .subscribe( response => {
     console.log(response)	
     callback(response);
    });
  }
}
