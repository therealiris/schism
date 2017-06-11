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
  constructor(public navCtrl: NavController, public navParams: NavParams,public people: PeopleService) {
    // If we navigated to this page, we will have an item available as a nav param
   	this.uid = this.navParams.data.uid
    this.people.getNotifications(this.uid,(response)=>{
      this.notifications = response.notifications
      console.log(this.notifications)
    })
   	
  }
  acceptConnect(e){
    let index = e.target.dataset.index
    let acceptId = e.target.dataset.uid
    this.people.acceptConnect(this.uid,acceptId,(response)=>{
      if(response.status==1)
        this.notifications.splice(index,1)
    })
    
  }
  rejectConnect(e){
    let index = e.target.dataset.index
    let uid = e.target.dataset.uid
    this.notifications.splice(index,1)
    console.log("remove"+e.target.dataset.uid)
  }
}