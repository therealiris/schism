import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OnboardingThree } from '../onboarding3/on3';

@Component({
  selector: 'on-two',
  templateUrl: 'on2.html'
})
export class OnboardingTwo {
   
   rangeVal: any;
   user:any; 
   storage:any;
   ent:any;
   pr:any;
   designation:string;
   currentWorkplace:string;
   industry:any;
   type:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.rangeVal = this.navParams.data.item
    this.user = JSON.parse(this.navParams.data.userObject)
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    // this.navCtrl.push(ListPage, {
    //   item: item
    // });
    console.log("tried tap")
  }
  nextClick(){
    this.rangeVal = 80
    console.log(this.ent)
    this.user.designation = this.designation
    this.user.industry = this.industry
    this.user.type = this.ent?"entrepreneur":"professional"
    this.user.designation = this.designation
    this.user.currentWorkplace = this.currentWorkplace
    this.navCtrl.push(OnboardingThree, {
      item: 80,
      userObject : JSON.stringify(this.user)

    });
  }
  checkType(type){
    console.log(type)
  }
}
