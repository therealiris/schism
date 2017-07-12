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
import { Profile } from '../pages/profile/profile'
import { PlannerOne } from '../pages/planner1/plannerOne'
import { PlannerTwo } from '../pages/planner2/plannerTwo'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Feedback } from '../pages/feedback/feedback';
import { LoginPage } from '../pages/login/login';
import { UploadPic } from '../pages/uploadPic/uploadPic';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Push } from '@ionic-native/push';
import { Ionic2RatingModule } from 'ionic2-rating';

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
    PlannerTwo,
    Profile,
    Feedback,
    LoginPage,
    UploadPic
  ],
  imports: [
    BrowserModule,
    Ionic2RatingModule,
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
    PlannerTwo,
    Profile,
    Feedback,
    LoginPage,
    UploadPic

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    File,
    Transfer,
    Camera,
    FilePath,
    LocalNotifications,    
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    
  ]
})
export class AppModule {}
