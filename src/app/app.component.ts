import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController, ViewController, Events, NavController } from 'ionic-angular';
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
import { ChatsPage } from '../pages';
import { CallService, LoginService } from '../services';
import { CallModalTrigger } from '../components';
import * as moment from 'moment';
import { LocalNotifications } from '@ionic-native/local-notifications';

declare var cordova:any;

@Component({
  templateUrl: 'app.html',
  providers: [PeopleService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any ;
  user : any;
  pages: Array<{title: string, component: any , iconName : string }>;
  isInCall = false
  constructor(public localNotifications:LocalNotifications,callService: CallService, private loginService: LoginService, events: Events, callModal: CallModalTrigger,public people: PeopleService,public platform: Platform, public push: Push, public statusBar: StatusBar, public splashScreen: SplashScreen, private toastCtrl: ToastController, public storage:Storage) {
    moment.locale('en', {
      relativeTime: {
        future: 'now',
        past: '%s',
        s: 'now',
        m: '1 m',
        mm: '%d m',
        h: '1 h',
        hh: '%d h',
        d: '1 d',
        dd: '%d d',
        M: '1 m',
        MM: '%d m',
        y: '1 y',
        yy: '%d y'
      }
    });
    this.initializeApp();
    this.user = {fullName:'',pictureUrl:''}
    this.loginService.logout()
    storage.ready().then(()=>{
      storage.get('currentUser').then((data)=>{
        if(data!=null)
          {
          this.rootPage = DiscoverPage
          this.user = JSON.parse(data)
          this.pushsetup();
          this.loginService.login({"username":this.user.uid,"password":"apptoken"}).then(() => {
            this.loginService.complete.then(user => {})
          }, data => {
              console.log(data);
            });
        }
        else{
          this.rootPage = HomePage
          // this.loginService.login({"username":"c0668107c590e75bb5c5361c6347e9a9","password":"apptoken"}).then(() => {
          //   this.loginService.complete.then(user => {
          //   })
          // }, data => {
          //     console.log("1",data);
          //   });
          
          

        }
      })
    })
    
    this.localNotifications.on('click', (notification, state) => {
      this.nav.setRoot(ChatsPage)
    })  
      
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Discover', component: DiscoverPage, iconName:'ios-search-outline' },
      { title: 'Profile', component: Profile, iconName:'md-person' },
      { title: 'My Connections', component: ChatsPage, iconName:'ios-people-outline' },
      { title: 'Planner', component: Calendar, iconName:'ios-calendar-outline' },
      { title: 'Feedback', component: Feedback, iconName:'ios-settings' }

    ];
    events.subscribe('call.status.isincall', status => {
      console.debug('call status changed to ', status);
      this.isInCall = status;
    });

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
