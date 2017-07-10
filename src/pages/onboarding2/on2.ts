import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { OnboardingOne } from '../onboarding1/on1';

@Component({
  selector: 'on-two',
  templateUrl: 'on2.html'
})
export class OnboardingTwo {
  items : string[]
  searchQuery: string = '';
  selectedList: string[];
  filler : any
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.initializeItems();
    this.selectedList = []
    // this.filler = this.navParams.data.callback
    console.log(this)
  }
  initializeItems() {
    this.items = ["Fashion","Information Technology","UI Design","UX Design","Language Technology",
    "Hybrid Apps","Reactive WebApps","Cloud Services","Android Apps"]
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  updateList(item, value){
    let check = value.checked
    if(!check)
      {
      let index = this.selectedList.indexOf(item)
      if(index!=-1)
      this.selectedList.splice(index,1)
    }
    else
      {
      if(this.selectedList.length<=2)
        this.selectedList.push(item)
      else{
          value.checked = false
          alert("You can select maximum three skills")
      }
    }
    
      console.log(this.selectedList) 
    }
    passSkills(){
      this.viewCtrl.dismiss({"industryList":this.selectedList})
    }
}
