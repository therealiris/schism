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
  	this.http.post('http://192.168.0.103:9003/users/data',userObject)
  	.map(response => response.json())
    .subscribe( response => {
     console.log(response)	
     callback(response);
    });
  }

  discover(uid, callback){
  	this.http.get('http://192.168.0.103:9003/users/discover?uid='+uid)
  	.map(response => response.json())
    .subscribe( response => {
     console.log(response)	
     callback(response);
    });
  }

  sendRequest(sender, sendee, reason, callback){
    var requestObject = {
      "uid":sender.uid,
      "id":sendee,
      "fullName":sender.fullName,
      "headline":sender.designation +" at "+sender.currentWorkplace,
      "reason": reason
    }
    this.http.put('http://192.168.0.103:9003/users/request',requestObject)
    .map(response => response.json())
    .subscribe( response => {
     console.log(response)  
     callback(response);
    });
  }
  updateCurrentUser(uid, callback){
    this.http.get('http://192.168.0.103:9003/users/user?uid='+uid)
    .map(response => response.json())
    .subscribe( response => {
     console.log(response)  
     callback(response);
    });
  }
  getNotifications(uid, callback){
    this.http.get('http://192.168.0.103:9003/users/notifications?uid='+uid)
    .map(response => response.json())
    .subscribe( response => { 
     callback(response);
    });
  }
  acceptConnect(uid,acceptId,callback){
    var acceptObject={"uid":uid,"acceptId":acceptId}
    this.http.post('http://192.168.0.103:9003/users/acceptConnect',acceptObject)
    .map(response => response.json())
    .subscribe( response => {
     console.log(response)  
     callback(response);
    });
  }
  getConnections(uid,callback){
    this.http.get('http://192.168.0.103:9003/users/connections?uid='+uid)
    .map(response => response.json())
    .subscribe( response => { 
     callback(response);
    });
  }
  updateLocation(uid,location,callback){
    let updateObject = {"uid":uid,"location":location}
    this.http.put('http://192.168.0.103:9003/users/updateLocation',updateObject)
    .map(response => response.json())
    .subscribe( response => { 
     callback(response);
    });
  }
  updateChatId(uid,chatid,callback){
    let updateObject = {"uid":uid,"chatid":chatid}
    this.http.put('http://192.168.0.103:9003/users/chatId',updateObject)
    .map(response => response.json())
    .subscribe( response => { 
     callback(response);
    });
  }
  getChatId(uid,callback){
    this.http.get('http://192.168.0.103:9003/users/chatId?uid='+uid)
    .map(response => response.json())
    .subscribe( response => { 
     callback(response);
    });
  }
  getEvents(uid,callback){
    this.http.get('http://192.168.0.103:9003/users/events?uid='+uid)
    .map(response => response.json())
    .subscribe( response => { 
     callback(response);
    });
  }

  pushEvent(meetingObject,callback){
    this.http.post('http://192.168.0.103:9003/users/events',meetingObject)
    .map(response => response.json())
    .subscribe( response => {
     console.log(response)  
     callback(response);
    });
  }
}
