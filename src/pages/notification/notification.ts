import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PeopleService } from '../../providers/people-service'

@Component({
  selector: 'notification',
  templateUrl: 'notification.html',
  providers: [PeopleService]
})
export class NotificationPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  uid: string;
  notifications: any;
  notificationType : any;
  requests : any;
  meetings : any;
  general :any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public people: PeopleService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.notificationType = "connections"
   	this.uid = this.navParams.data.uid
     this.requests = new Array();
     this.meetings = new Array();
     this.general = new Array();
     // this.uid = "758118e811e19b9ee236d467838a977a"
    this.people.getNotifications(this.uid,(response)=>{
      this.notifications = response.notifications
      this.notifications.forEach(notification=>{
        if(notification.type === 1)
          this.requests.push(notification)
        if(notification.type === 2)
          this.meetings.push( notification )
        if(notification.type === 3)
          this.general.push(notification)
      })
      console.log(this.notifications)
    })
   	
  }
  acceptConnect(e){
    let index = e.target.dataset.index
    console.log(index)
    let acceptId = e.target.dataset.uid
    this.people.acceptConnect(this.uid,acceptId,(response)=>{
      if(response.status==1)
        this.requests.splice(index,1)
    })
    
  }
  rejectConnect(e){
    let index = e.target.dataset.index
    let uid = e.target.dataset.uid
    this.requests.splice(index,1)
    console.log("remove"+e.target.dataset.uid)
  }
  dismiss(){
    this.navCtrl.popToRoot()
  }
}