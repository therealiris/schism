import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { sendRequest } from '../sendRequest/sendRequest'
import { FilterPage } from '../filterPage/filter'
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
  long: number;
  rate : number[];
  filter : any;
  constructor(public modalCtrl:ModalController,public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams,public people: PeopleService,public storage:Storage) {
    this.currentIndex = 0
    this.rate = []
    // If we navigated to this page, we will have an item available as a nav param
    this.showPoints = false

    storage.ready().then(()=>{
      storage.get('currentUser').then((data)=>{
        if(data!=null)
          {
            this.user = JSON.parse(data)
             people.updateCurrentUser(this.user.uid, (user)=>{
             this.user = user.userObject
             this.lat = this.user.lastLoginLocation.split(",")[0]
             this.long = this.user.lastLoginLocation.split(",")[1]
             this.startDiscover()
             this.locationUpdate()
           })
        }
      })
    })
    
  }
  startDiscover(){
    
    let loading = this.loadingCtrl.create({
        spinner:"crescent",
        content: 'Loading profiles..'
      });
    loading.present()
    this.people.discover(this.user.uid, this.filter,(discoverList)=>{
        this.items = discoverList
        for(var i=0;i<this.items.length;i++){
          var totalRating = 0
          this.items[i].skills.forEach(skill=>{
            totalRating+=skill.rating
          })
          var avgRating = totalRating/this.items[i].skills.length
          this.rate.push(avgRating)
          var locationArr = this.items[i].lastLoginLocation.split(",")
          var distance = this.getDistanceFromLatLonInKm(this.lat,this.long, parseFloat(locationArr[0]),parseFloat(locationArr[1]))
          var numDist  = distance.toFixed(2)
          this.items[i].distance = numDist
        }
        loading.dismiss();
        // this.locationUpdate()
        this.slides.lockSwipeToNext(false)
        this.slides.slideTo(0,500)
        console.log(this.currentIndex)
      })
  }
  locationUpdate(){
    console.log("updating location")
    Geolocation.getCurrentPosition().then(res => {
                // console.log(res.coords.latitude,res.coords.longitude)
        this.lat = res.coords.latitude
        this.long = res.coords.longitude  
        this.user.lastLoginLocation = this.lat+","+this.long
        this.people.updateLocation(this.user.uid,this.user.lastLoginLocation,(response)=>{
          // console.log("UPDATED LOGIN LOCATION")
        })
      }).catch((error) => {
        alert("error in locating")
        // loading.dismiss();
        // console.log('Error getting location', error);
      });
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
      this.currentIndex = this.slides.getActiveIndex();
      console.log(this.currentIndex)
      if(this.currentIndex === this.items.length-1)
        this.slides.lockSwipeToNext(true)
      else
        this.slides.lockSwipeToNext(false)
      // if(this.items[this.currentIndex])
      // if(this.user.requested.indexOf(this.items[this.currentIndex]['uid'])>-1)
      //   this.isConnected=true
      // else this.isConnected = false
    
  }
  connect(){
    let item = this.items[this.currentIndex]
    // console.log("hauchi")
    this.navCtrl.push(sendRequest, {
      item: item
    });

  }
  openNotifications(){
    this.navCtrl.push(NotificationPage,{"uid":this.user.uid})
  }
  search(fab){
    let filterModal = this.modalCtrl.create(FilterPage,{"filter":this.filter});
    // this.navCtrl.push(OnboardingTwo, {callback:this.fillIndustry})
    filterModal.present()
    filterModal.onDidDismiss(data => {
      console.log(data)

      this.filter = data.filter
      if(this.filter.type.length>0||this.filter.industry.length>0||this.filter.skills.length>0)
      {
        this.startDiscover()
        fab.close()
      }
      else{
        this.filter = undefined
        this.startDiscover()
      }

   });
  }
  clearFilter(fab){
    this.filter = undefined
    this.startDiscover()
    fab.close()
  }
}
