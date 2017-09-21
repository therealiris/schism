var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CloudModule } from '@ionic/cloud-angular';
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
import { FilterPage } from '../pages/filterPage/filter';
import { RatingModal } from '../pages/rating-modal/rating-modal';
import { Tutorial } from '../pages/tutorial/tutorial';
import { CalendarPage } from '../pages/calendar/calendar';
import { UserDetail } from '../pages/userDetail/userDetail';
import { Profile } from '../pages/profile/profile';
import { Ranking } from '../pages/ranking/ranking';
import { PlannerOne } from '../pages/planner1/plannerOne';
import { PlannerTwo } from '../pages/planner2/plannerTwo';
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
import { ChatsPage, ChatPage, AccountPage, ContactsPage } from '../pages';
import { PeopleService } from '../providers/people-service';
import { CallModal, ContactModal, UserImage, CallModalTrigger, ContactAddModal, KeyboardAttach } from '../components';
import { AttachmentService, AudioService, CallService, ChatService, ContactService, LoginService, SocketService, VideoService } from '../services';
import { MomentModule } from 'angular2-moment';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { BackgroundMode } from '@ionic-native/background-mode';
import { NativeAudio } from '@ionic-native/native-audio';
import { Calendar } from '@ionic-native/calendar';
var cloudSettings = {
    'core': {
        'app_id': '30636649'
    }
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
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
            CalendarPage,
            PlannerOne,
            PlannerTwo,
            Profile,
            Feedback,
            LoginPage,
            UploadPic,
            ChatsPage,
            AccountPage,
            CallModal,
            ContactModal,
            UserImage,
            ContactsPage,
            ContactAddModal,
            KeyboardAttach,
            FilterPage,
            UserDetail,
            RatingModal, Ranking, Tutorial
        ],
        imports: [
            BrowserModule,
            Ionic2RatingModule,
            IonicModule.forRoot(MyApp),
            CloudModule.forRoot(cloudSettings),
            IonicStorageModule.forRoot(),
            HttpModule,
            MomentModule
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
            NotificationPage,
            CalendarPage,
            PlannerOne,
            PlannerTwo,
            Profile,
            Feedback,
            LoginPage,
            UploadPic,
            ChatsPage,
            ChatPage,
            AccountPage,
            CallModal,
            ContactModal,
            UserImage,
            ContactsPage,
            ContactAddModal,
            FilterPage,
            UserDetail,
            RatingModal, Ranking, Tutorial
        ],
        providers: [
            Calendar,
            BackgroundMode, NativeAudio,
            PeopleService,
            AttachmentService, CallModalTrigger, LoginService, AudioService, SocketService, CallService, ContactService, VideoService, ChatService,
            StatusBar,
            SplashScreen,
            Push,
            File,
            Transfer,
            Camera,
            FilePath,
            LocalNotifications,
            AndroidPermissions,
            { provide: ErrorHandler, useClass: IonicErrorHandler }
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map