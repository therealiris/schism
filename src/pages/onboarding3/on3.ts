import { Component } from '@angular/core';
import { NavController, NavParams, Nav, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PeopleService } from '../../providers/people-service'


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
      this.storage.ready()
      .then(()=>{
        this.storage.set('currentUser',JSON.stringify(this.user))
        this.presentLoadingDefault()
      })
    })
    // this.navCtrl.setRoot(DiscoverPage)
  }
  removeHobby(index){
    console.log(index)
    this.hobbies.splice(index,1)
  }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      spinner:"crescent",
      content: 'Configuring account..Please wait...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      window.location.reload()
    }, 2000);
    
  }
}
