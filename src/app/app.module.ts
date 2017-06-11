import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DiscoverPage } from '../pages/discover/discover';
import { OnboardingOne } from '../pages/onboarding1/on1';
import { OnboardingTwo } from '../pages/onboarding2/on2';
import { OnboardingThree } from '../pages/onboarding3/on3';
import { sendRequest } from '../pages/sendRequest/sendRequest';
import { Connections } from '../pages/connections/connections';
import { NotificationPage } from '../pages/notification/notification';
import { IonicStorageModule } from '@ionic/storage';    
import { HttpModule } from '@angular/http';
import { PeopleService } from '../providers/people-service'
import { ChatPage } from '../pages/chat/chat'
import { Calendar } from '../pages/calendar/calendar'
import { PlannerOne } from '../pages/planner1/plannerOne'
import { PlannerTwo } from '../pages/planner2/plannerTwo'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '30636649'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DiscoverPage,
    OnboardingOne,
    OnboardingTwo,
    OnboardingThree,
    sendRequest,
    Connections,
    ChatPage,
    NotificationPage,
    Calendar,
    PlannerOne,
    PlannerTwo
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DiscoverPage,
    OnboardingOne,
    OnboardingTwo,
    OnboardingThree,
    sendRequest,
    Connections,
    ChatPage,
    NotificationPage,
    Calendar,
    PlannerOne,
    PlannerTwo

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
