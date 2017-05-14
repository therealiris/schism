import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OnboardingOne } from '../onboarding1/on1';
import { Auth, User } from '@ionic/cloud-angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  appUser:any;
  constructor(public navCtrl: NavController, public auth: Auth, public user: User, public storage: Storage) {

    this.appUser = {
    "uid" : "", 
    "email" : "", 
    "pictureUrl" : "",
    "fullName":"",
    "dob":"",
    "gender":"",
    "type":"",
    "industry":[],
    "designation":"",
    "currentWorkplace":"",
    "hobbies":[],
    "connections" : [], 
    "requested" : [], 
    "requests" : [], 
    "lastLoginLocation" : "", 
    "chatId" : "",
    "rating":0,
    "ranking":0,
    "score":0
    }
  }
  login(){
  	// this.navCtrl.push(OnboardingOne,{
   //      name:'Sidhaf Sahu',
   //      pictureUrl:'../assets/img/faces/sid.jpg'
   //    });
  	this.auth.login('linkedin').then(()=>{
      this.appUser.fullName = this.user.social.linkedin.data.full_name;
      this.appUser.pictureUrl = this.user.social.linkedin.data.profile_picture;
      this.appUser.uid = this.user.social.linkedin.uid;

      // this.navCtrl.push(OnboardingOne, {
      //   userObject : JSON.stringify(this.appUser)
      // });
      this.storage.ready().then(()=>{
        this.storage.set('currentUser',JSON.stringify(this.appUser))
        this.navCtrl.push(OnboardingOne, {
          userObject : JSON.stringify(this.appUser)
        });
      })
    });
  }
}
