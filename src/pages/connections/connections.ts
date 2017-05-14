import { Component } from '@angular/core';
import { NavController, NavParams, Nav, App, ViewController } from 'ionic-angular';

@Component({
  selector: 'connections',
  templateUrl: 'connections.html'
})
export class Connections {
   
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public appCtrl: App) {
    // If we navigated to this page, we will have an item available as a nav param
    
  }

  
}
