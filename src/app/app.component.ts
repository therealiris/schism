import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DiscoverPage } from '../pages/discover/discover';
import { Connections } from '../pages/connections/connections'
import { OnboardingOne } from '../pages/onboarding1/on1';
import { Calendar } from '../pages/calendar/calendar';
import { Profile } from '../pages/profile/profile';
import { Feedback } from '../pages/feedback/feedback';
import { NotificationPage } from '../pages/notification/notification';
import { UploadPic } from '../pages/uploadPic/uploadPic';
import { PlannerTwo } from '../pages/planner2/plannerTwo'
import { PlannerOne } from '../pages/planner1/plannerOne'
import { Storage } from '@ionic/storage';
import Peer from "../../node_modules/peerjs/lib/peer";
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { PeopleService } from '../providers/people-service'

@Component({
  templateUrl: 'app.html',
  providers: [PeopleService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any ;
  user : any;
  pages: Array<{title: string, component: any , iconName : string }>;
  constructor(public people: PeopleService,public platform: Platform, public push: Push, public statusBar: StatusBar, public splashScreen: SplashScreen, private toastCtrl: ToastController, public storage:Storage) {
    this.initializeApp();
    this.user = {fullName:'',pictureUrl:''}
    storage.ready().then(()=>{
      storage.get('currentUser').then((data)=>{
        if(data!=null)
          {
          this.rootPage = DiscoverPage
          this.user = JSON.parse(data)
          this.pushsetup();
        }
        else{
          this.rootPage = HomePage
          

        }
      })
    })
    
      
      
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Discover', component: DiscoverPage, iconName:'ios-search-outline' },
      { title: 'Profile', component: Profile, iconName:'md-person' },
      { title: 'My Connections', component: Connections, iconName:'ios-people-outline' },
      { title: 'Planner', component: Calendar, iconName:'ios-calendar-outline' },
      { title: 'Feedback', component: Feedback, iconName:'ios-settings' }

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
  }
  pushsetup() {
    const options: PushOptions = {
     android: {
         senderID: '1056346035559'
     },
     ios: {
         alert: 'true',
         badge: true,
         sound: 'false'
     },
     windows: {}
  };
 
  const pushObject: PushObject = this.push.init(options);
 
  pushObject.on('notification').subscribe((notification: any) => {
    if (notification.additionalData.foreground) {
      let toast = this.toastCtrl.create({
            message: notification.message,
            duration: 3000,
            position: 'top'
          });

        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });

        toast.present();
    }

  });
 
  pushObject.on('registration').subscribe((registration: any) => {
     //do whatever you want with the registration ID
     let key = {"key":registration.registrationId, "uid":this.user.uid}
     this.pushCall(key)

  });
 
  pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }
  pushCall(key){
    this.people.updatePushRegistration(key,(response)=>{
       if(response.status===-1)
         this.pushCall(key);
     })
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  getClicked(){
    let toast = this.toastCtrl.create({
      message: 'Upload and crop component on this action. Trying out android native toast',
      duration: 3000,
      position: 'top'
    });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
  }
}
