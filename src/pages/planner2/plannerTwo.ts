import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PeopleService } from '../../providers/people-service'
import { Calendar } from '../calendar/calendar'
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

@Component({
  selector: 'plannerTwo',
  templateUrl: 'plannerTwo.html',
  providers: [PeopleService]
})
export class PlannerTwo {
  withObject: any;
  connections: any;
  minDate : string;
  maxDate : string;
  eventDate : string;
  timeStarts : string;
  timeStops : string;
  venue : string;
  type : string;
  agenda : string;
  user : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public people: PeopleService, public storage: Storage) {
    storage.ready().then(()=>{
      storage.get('currentUser').then((data)=>{
        if(data!=null)
          {
            this.user = JSON.parse(data)
          }
        })
      })
    // If we navigated to this page, we will have an item available as a nav param
    this.minDate = moment().format('YYYY-MM-DD')
    this.maxDate = moment().add(30, 'days').format('YYYY-MM-DD');
    console.log(this.maxDate)
    this.withObject = this.navParams.data
  }
  setupMeeting(){
    var meetingObject = {
      "uid":this.user.uid,
      "event":{
        "from":this.eventDate + " " +this.timeStarts,
        "to":this.eventDate + " " +this.timeStops,
        "type":"chat",
        "with": this.withObject,
        "venue":this.venue,
        "agenda":this.agenda,
        "pending":true
      }
    }
    alert(JSON.stringify(meetingObject))
    this.people.pushEvent(meetingObject,(res)=>{
      if(res.status===1){
        this.navCtrl.setRoot(Calendar);
      }
    })
  }
}
