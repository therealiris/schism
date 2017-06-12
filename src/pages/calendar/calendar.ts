import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PlannerOne } from '../planner1/plannerOne'
import { Storage } from '@ionic/storage';
import { PeopleService } from '../../providers/people-service'

@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html',
  providers: [PeopleService]
})
export class Calendar {
  user: any;
  eventList : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public people : PeopleService, public storage: Storage) {
    // If we navigated to this page, we will have an item available as a nav param
    storage.ready().then(()=>{
      storage.get('currentUser').then((data)=>{
        if(data!=null)
          {
          	this.user = JSON.parse(data)
          	people.getEvents(this.user.uid,(events)=>{
          		this.eventList = events
          	})
          }
      })
  })
   
  }
  plan(){
  	this.navCtrl.push(PlannerOne)
  }
}
