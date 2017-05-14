import { Component } from '@angular/core';
import { NavController, NavParams, Nav, App, ViewController, LoadingController } from 'ionic-angular';
import { DiscoverPage } from '../discover/discover';
import { PeopleService } from '../../providers/people-service'
import { Storage } from '@ionic/storage';


@Component({
  selector: 'on-three',
  templateUrl: 'on3.html',
  providers:[PeopleService]
})
export class OnboardingThree {
   rangeVal: any;
   hobbies: string[];
   user:any;
  constructor( public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, public people: PeopleService, public storage: Storage) {
    // If we navigated to this page, we will have an item available as a nav param
    this.rangeVal = this.navParams.data.item
    this.hobbies = []
    this.user = JSON.parse(this.navParams.data.userObject)
  }

  itemTapped(event) {
    if(event.keyCode == 13)
    {
      this.hobbies.push(event.target.value)
      event.target.value = ""
      console.log(this.hobbies)
    }
    
    // That's right, we're pushing to ourselves!
    // this.navCtrl.push(ListPage, {
    //   item: item
    // });
    console.log("tried tap")
  }
  nextClick(){
    this.user.hobbies = this.hobbies
    console.log(this.user)
    this.people.sendData(this.user,(response)=>{
      console.log(response)
      this.storage.ready().then(()=>{
        this.storage.set('currentUser',JSON.stringify(this.user))
        this.presentLoadingDefault()
        window.location.reload()
      })
      
      
    })
    // this.navCtrl.setRoot(DiscoverPage)
  }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      spinner:"crescent",
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }
}
