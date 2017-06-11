import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PeopleService } from '../../providers/people-service'
import { Storage } from '@ionic/storage';
import { PlannerTwo } from '../planner2/plannerTwo'


@Component({
  selector: 'plannerOne',
  templateUrl: 'plannerOne.html',
  providers: [PeopleService]
})
export class PlannerOne {
  user: any;
  connections: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public people: PeopleService, public storage: Storage) {
    // If we navigated to this page, we will have an item available as a nav param
    storage.ready().then(()=>{
      storage.get('currentUser').then((data)=>{
        if(data!=null)
          {
            this.user = JSON.parse(data)
            people.getConnections(this.user.uid,(connections)=>{
            	this.connections = connections;
            })    
        }
      })
    })
  }
  selectUser(index){
  	let withObject = this.connections[index]
  	delete withObject["_id"]
  	this.navCtrl.push(PlannerTwo, withObject)
  }
}
