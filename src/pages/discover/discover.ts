import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { sendRequest } from '../sendRequest/sendRequest'
import { NotificationPage } from '../notification/notification'
import { PeopleService } from '../../providers/people-service'
import { Storage } from '@ionic/storage';
import { Slides } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

@Component({
  selector: 'discover-list',
  templateUrl: 'discover.html',
  providers: [PeopleService]
})
export class DiscoverPage {
  @ViewChild(Slides) slides: Slides;
  selectedItem: any;
  icons: string[];
  items: any;
  showPoints : boolean;
  user:any;
  currentIndex: number;
  isConnected : boolean;
  lat: number;
  long: number
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams,public people: PeopleService,public storage:Storage) {
    this.currentIndex = 0
    
    // If we navigated to this page, we will have an item available as a nav param
    this.showPoints = false
    let loading = this.loadingCtrl.create({
        spinner:"crescent",
        content: 'Loading profiles..'
      });
    loading.present()
    storage.ready().then(()=>{
      storage.get('currentUser').then((data)=>{
        if(data!=null)
          {
            this.user = JSON.parse(data)
             people.updateCurrentUser(this.user.uid, (user)=>{
             this.user = user.userObject
             Geolocation.getCurrentPosition().then(res => {
                console.log(res.coords.latitude,res.coords.longitude)
                this.lat = res.coords.latitude
                this.long = res.coords.longitude  
                this.user.lastLoginLocation = this.lat+","+this.long
                people.updateLocation(this.user.uid,this.user.lastLoginLocation,(response)=>{
                  console.log("UPDATED LOGIN LOCATION")
                })
                people.discover(this.user.uid, (discoverList)=>{
                  this.items = discoverList
                  for(var i=0;i<this.items.length;i++){
                    var locationArr = this.items[i].lastLoginLocation.split(",")
                    var distance = this.getDistanceFromLatLonInKm(this.lat,this.long, parseFloat(locationArr[0]),parseFloat(locationArr[1]))
                    var numDist  = distance.toFixed(2)
                    this.items[i].distance = numDist
                  }
                  loading.dismiss();
                })
              }).catch((error) => {
                alert("error in locating")
                loading.dismiss();
                console.log('Error getting location', error);
              });
           })
        }
      })
    })
    
  }
  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  var dLon = this.deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  slideChanged(){
      // this.showPoints = true

      // setTimeout(()=>{
      //   this.showPoints = false
      // },800)
      // this.currentIndex = this.slides.getActiveIndex();
      // if(this.items[this.currentIndex])
      // if(this.user.requested.indexOf(this.items[this.currentIndex]['uid'])>-1)
      //   this.isConnected=true
      // else this.isConnected = false
    
  }
  connect(){
    let item = this.items[this.currentIndex]
    console.log("hauchi")
    this.navCtrl.push(sendRequest, {
      item: item
    });

  }
  openNotifications(){
    this.navCtrl.push(NotificationPage,{"uid":this.user.uid})
  }
}
