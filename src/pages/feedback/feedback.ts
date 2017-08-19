import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'feedback',
  templateUrl: 'feedback.html'
})
export class Feedback {

	times : any;
	changes :any;
	beneficials :any;
	friends :any;
	motivation : any;
	anonymous : any;
	money: any
  constructor(public navCtrl: NavController, public navParams: NavParams){

  }
  submitFeedback(){
  	let feed = {"times":this.times, "changes":this.changes, "beneficials":this.beneficials, "friends":this.friends,"motivation":this.motivation, "anonymous":this.anonymous,"money":this.money}
  	console.log(JSON.stringify(feed))
  	alert("Thank You for your valuable feedback. We have notified our team.")
  }
  
}
