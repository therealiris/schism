// long press for small contact modal

import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { PeopleService } from '../../providers/people-service'
import { Storage } from '@ionic/storage';


@Component({
	templateUrl: 'rating-modal.html',
	selector: 'rating-modal',
	providers: [PeopleService]
})
export class RatingModal {
	user : any;
	rate : any;
	allowed : boolean;
	currentUser :any;
	constructor(public storage: Storage,private peopleService: PeopleService,private viewCtrl: ViewController, private params: NavParams, private navCtrl: NavController) {
		this.allowed = false
		this.rate = []
		this.user = params.get("userObject")
		console.log(this.user)
		this.user.skills.forEach(skill=>{
			this.rate.push({"skill":skill,"rating":0})
		})
		storage.ready().then(()=>{
	      storage.get('currentUser').then((data)=>{
	        if(data!=null)
	          {
	            console.log("here now filling profile", data)
	            this.currentUser = JSON.parse(data)
	        }
	      })
	    })

	}
	modified(){
		console.log("logging")
		this.allowed = true
	}
	submitRating(){
		this.rate.forEach(r=>{
			if(r.rating>0)
				this.allowed=true
		})
		console.log(this.rate)
		if(this.allowed){
			this.peopleService.pushRating({"uid":this.user.uid,"ratings":this.rate, "user":this.currentUser.uid},(status)=>{
					this.viewCtrl.dismiss()
			})
			
		}
		
		else
			alert("Please rate atleast one skill")
	}
	rateLater(){
		{
			this.peopleService.pushPendingRating({"uid":this.currentUser.uid,"user":this.user.uid}	,(status)=>{
					this.viewCtrl.dismiss()
			})
			
		}
	}
}