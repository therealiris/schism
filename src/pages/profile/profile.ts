import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PeopleService } from '../../providers/people-service'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'profile',
  templateUrl: 'profile.html',
  providers: [PeopleService]
})
export class Profile {
  user : {pictureUrl:string, fullName:string, gender:string,email:string,designation:string,dob:string,currentWorkplace:string,hobbies:string[], industry:string[], skill:any};
  profile : any;
  fullName : string;
  gender : string;
  dob : string;
  email : string;
  hobbies : string[];
  designation : string;
  currentWorkplace : string;
  industry : string[];
  pictureUrl : string;
  skill : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public people: PeopleService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.profile = "personal"
    this.user = {"pictureUrl":"", "fullName":"", "gender":"","dob":"","hobbies":[],"email":"","designation":"","currentWorkplace":"","industry":[],"skill":[]}
    storage.ready().then(()=>{
      storage.get('currentUser').then((data)=>{
        if(data!=null)
          {
            console.log("here now filling profile", data)
            this.user = JSON.parse(data)
        }
      })
    })
  }
}
