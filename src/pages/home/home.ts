import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { OnboardingOne } from '../onboarding1/on1';
import { LoginPage } from '../login/login';
import { Auth, User } from '@ionic/cloud-angular';
import { Storage } from '@ionic/storage';
import { PeopleService } from '../../providers/people-service'
import { DiscoverPage } from '../discover/discover'
import { AccountKit, AuthResponse } from 'ng2-account-kit';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [PeopleService]
})
export class HomePage {

  appUser:any;
  constructor(public navCtrl: NavController, public people: PeopleService, public auth: Auth, public user: User, public storage: Storage, public loadingCtrl: LoadingController) {

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
    "score":0
    }
  }
  login(){
    this.navCtrl.push(LoginPage,this.appUser)
    // this.auth.login('linkedin').then(()=>{
   //    this.appUser.fullName = this.user.social.linkedin.data.full_name;
   //    this.appUser.pictureUrl = this.user.social.linkedin.data.profile_picture;
   //    this.appUser.uid = this.user.social.linkedin.uid;
      // this.people.updateCurrentUser(this.appUser.uid,(response)=>{ 
      //   if(response.status===1){
      //     //if user already logged-in
      //     this.appUser = response.userObject
      //     this.storage.ready().then(()=>{
      //       this.storage.set('currentUser',JSON.stringify(this.appUser))
      //       this.navCtrl.push(DiscoverPage);
      //     })
      //   }
      //   else{
      //     this.storage.ready().then(()=>{
      //       //create a new user object locally
      //       this.storage.set('currentUser',JSON.stringify(this.appUser))
      //       this.navCtrl.push(OnboardingOne, {
      //         userObject : JSON.stringify(this.appUser)
      //       });
      //     })
      //   }  
      // })
   //  });
  }
}
