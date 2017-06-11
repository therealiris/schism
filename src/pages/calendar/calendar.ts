import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PlannerOne } from '../planner1/plannerOne'

@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html'
})
export class Calendar {
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    
  }
  plan(){
  	this.navCtrl.push(PlannerOne)
  }
}
