import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { PeopleService } from '../../providers/people-service'
import { PlannerOne } from '../planner1/plannerOne'
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { Calendar } from '@ionic-native/calendar';

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
  minTime : string;
  eventDate : string;
  timeStarts : string;
  timeStops : string;
  venue : string;
  type : string;
  agenda : string;
  user : any;
  withUser:any;

  constructor(private calendar: Calendar,public viewCtrl:ViewController,public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams, public people: PeopleService, public storage: Storage) {
    storage.ready().then(()=>{
      storage.get('currentUser').then((data)=>{
        if(data!=null)
          {
            this.user = JSON.parse(data)
          }
        })
      })
    this.calendar.hasReadWritePermission().then(status=>{
      if(!status)
        this.calendar.requestReadWritePermission()
    })
    this.type = this.navParams.get("type")

    // If we navigated to this page, we will have an item available as a nav param
    this.minDate = moment().format('YYYY-MM-DD')
    this.maxDate = moment().add(30, 'days').format('YYYY-MM-DD');
    console.log(this.maxDate)

  }
  setupMeeting(){
    var meetingObject = {
      "uid":this.user.uid,
      "event":{
        "from":this.eventDate + " " +this.timeStarts,
        "to":this.eventDate + " " +this.timeStops,
        "type":this.type,
        "with": this.withObject,
        "venue":this.venue,
        "agenda":this.agenda,
        "pending":true
      }
    }
    
    // alert(JSON.stringify(meetingObject))
    this.people.pushEvent(meetingObject,(res)=>{
      if(res.status===1){
        this.viewCtrl.dismiss()
      }
    })

  }
  selectUser(){
    let planModal = this.modalCtrl.create(PlannerOne);
    planModal.present()
    planModal.onDidDismiss(data=>{
      if(data){
        console.log(data.withObject)
        this.withObject = data.withObject
        this.withUser = this.withObject.fullName
      }
      
    })
  }
  dismiss(){
    this.viewCtrl.dismiss()
  }
}
