import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { sendRequest } from '../sendRequest/sendRequest'
@Component({
  selector: 'discover-list',
  templateUrl: 'discover.html'
})
export class DiscoverPage {
  selectedItem: any;
  icons: string[];
  items: Array<{pictureUrl: string, fullName: string, headline:string}>;
  showPoints : boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.showPoints = false

    this.items = [{
        pictureUrl:'../assets/img/faces/marc.jpg',
        fullName: 'Mark Johnson',
        headline:'Ceo at New Fountain'
      },{
        pictureUrl:'../assets/img/faces/ash.jpg',
        fullName: 'Ash King',
        headline:'Business Developement Officer at Parkins '
      }];
  }

  slideChanged(){
      this.showPoints = true

      setTimeout(()=>{
        this.showPoints = false
      },800)
    
  }
  connect(){
    let item = {
        pictureUrl:'../assets/img/faces/ash.jpg',
        fullName: 'Ash King'
      }
    console.log("hauchi")
    this.navCtrl.push(sendRequest, {
      item: item
    });

  }
}
