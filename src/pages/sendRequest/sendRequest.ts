import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'sendRequest',
  templateUrl: 'sendRequest.html'
})
export class sendRequest {
  selectedItem: any;
  icons: string[];
  item: any;
  showPoints : boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.showPoints = false

    this.item = this.navParams.data.item
  }

  connect(){
    console.log("hauchi")
  }
}
