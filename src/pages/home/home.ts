import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  appUser:any;
  constructor(public navCtrl: NavController, public storage: Storage, public loadingCtrl: LoadingController) {

    this.appUser = {
    "uid" : "",
    "username":"", 
    "email" : "", 
    "pictureUrl" : "",
    "image":"",
    "fullName":"",
    "dob":"",
    "gender":"",
    "type":[],
    "industry":[],
    "designation":"",
    "currentWorkplace":"",
    "skills":[],
    "connections" : [], 
    "requested" : [], 
    "requests" : [],
    "notifications":[],
    "events":[], 
    "lastLoginLocation" : "", 
    "chatId" : "",
    "pushId":"",
    "rating":0,
    "ranking":0,
    "score":0,
    "password":"",
    "pendingRatings":[],
    "unread":[]
    }
  }
  login(){
    this.navCtrl.push(LoginPage,this.appUser,{ animate: true, direction: 'forward' })
  }
}
