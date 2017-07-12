import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { PeopleService } from '../../providers/people-service'
import { Storage } from '@ionic/storage';
import { DiscoverPage } from '../discover/discover'
import { UploadPic } from '../uploadPic/uploadPic'

import md5 from 'md5';

@Component({
  selector: 'login',
  templateUrl: 'login.html',
  providers: [PeopleService]
})
export class LoginPage {
  phone: string;
  numberSent : boolean;
  otp : number;
  smses : any;
  otpField: any;
  appUser :any;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,public navParams: NavParams, public people : PeopleService, public storage: Storage) {
    this.numberSent = false;
    this.appUser = this.navParams.data
    // console.log(this.appUser)
  }
  sendNumber(){
    let loading = this.loadingCtrl.create({
        spinner:"crescent",
        content: 'Sending OTP to your phone..'
      });
    loading.present()
    this.otp = Math.floor(1000 + Math.random() * 9000)
    this.people.sendOtp(this.phone, this.otp, (response)=>{
      if(null!=response){
        this.numberSent = true;
        loading.dismiss()
      }
    })
  }
  validate(){
    let loading = this.loadingCtrl.create({
        spinner:"crescent",
        content: 'Validating OTP..'
      });
    loading.present()
    if(this.otpField.toString()===this.otp.toString()){
      loading.dismiss()
       this.appUser.uid = md5(this.phone)
       this.people.updateCurrentUser(this.appUser.uid,(response)=>{ 
        if(response.status===1){
          //if user already logged-in
          this.appUser = response.userObject
          this.storage.ready().then(()=>{
            this.storage.set('currentUser',JSON.stringify(this.appUser))
            this.navCtrl.push(DiscoverPage);
          })
        }
        else{
          this.storage.ready().then(()=>{
            //create a new user object locally
            this.storage.set('currentUser',JSON.stringify(this.appUser))
            this.navCtrl.push(UploadPic, this.appUser, { animate: true, direction: 'forward' });
          })
        }  
      })
    }
  }
}
