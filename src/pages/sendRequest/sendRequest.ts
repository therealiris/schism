import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PeopleService } from '../../providers/people-service'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'sendRequest',
  templateUrl: 'sendRequest.html',
  providers: [PeopleService]
})
export class sendRequest {
  selectedItem: any;
  icons: string[];
  item: any;
  showPoints : boolean;
  allow : boolean;
  reasons : any;
  user : {"uid": string};
  constructor(public navCtrl: NavController, public navParams: NavParams,public people: PeopleService,public storage:Storage) {
    // If we navigated to this page, we will have an item available as a nav param
    storage.ready().then(()=>{
      storage.get('currentUser').then((data)=>{
        if(data!=null)
          {
          this.user = JSON.parse(data)
        }
      })
    })
    // this.user = {"uid":'GYILtCA0OJ'}   //local testing
    this.selectedItem = navParams.get('item');
    this.showPoints = false
    this.allow = false
    this.item = this.navParams.data.item
  }

  enableConnect(){
    if(this.reasons.length>0)
      this.allow=true;
  }
  cancel(){
    this.navCtrl.pop()
  }
  connect(){
    var reasonString = ""
    for(var i=0;i<this.reasons.length;i++)
        reasonString += this.reasons[i] + ", " 
    this.people.sendRequest(this.user,this.item.uid, reasonString,(res)=>{
      if(res.status==1)
        this.navCtrl.pop()
    })
  }
}
