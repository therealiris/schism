import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OnboardingTwo } from '../onboarding2/on2';
import { Storage } from '@ionic/storage';
import { PeopleService } from '../../providers/people-service'


@Component({
  selector: 'on-one',
  templateUrl: 'on1.html',
  providers: [PeopleService]
})
export class OnboardingOne {
  icons: string[];
  user: any;
  rangeVal : any;
  form:any;
  gender: string;
  fullName:string;
  dob:string;
  email:string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public people: PeopleService) {
    this.rangeVal = 0
    // this.user = {
    // "uid" : "", 
    // "email" : "", 
    // "pictureUrl" : "../assets/img/faces/sid.jpg",
    // "fullName":"",
    // "dob":"",
    // "gender":"",
    // "type":"",
    // "industry":[],
    // "designation":"",
    // "currentWorkplace":"",
    // "hobbies":[],
    // "connections" : [], 
    // "requested" : [], 
    // "requests" : [], 
    // "lastLoginLocation" : "", 
    // "chatId" : "",
    // "rating":0,
    // "ranking":0,
    // "score":0
    // }
    this.user = JSON.parse(this.navParams.data.userObject)
    
    // If we navigated to this page, we will have an item available as a nav param

    // Let's populate this page with some filler content for funzies

  }

  itemTapped(event) {
    console.log(event.target.value)
    // That's right, we're pushing to ourselves!
    console.log("tried tap")
  }
  nextClick(){
    this.rangeVal = 40
    this.user.fullName = this.fullName
    this.user.dob = this.dob
    this.user.gender = this.gender
    this.user.email = this.email
    this.navCtrl.push(OnboardingTwo, {
      item: 40,
      userObject : JSON.stringify(this.user)
    });
  }
}
