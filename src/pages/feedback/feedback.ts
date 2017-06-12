import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'feedback',
  templateUrl: 'feedback.html'
})
export class Feedback {

  constructor(public navCtrl: NavController, public navParams: NavParams){

  }
  submitFeedback(){
  	alert("Thank You for your valuable feedback. We have notified our team.")
  }
  
}
