import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ModalController } from 'ionic-angular';
import { OnboardingTwo } from '../onboarding2/on2';
import { Storage } from '@ionic/storage';
import { PeopleService } from '../../providers/people-service'


@Component({
  selector: 'on-one',
  templateUrl: 'on1.html',
  providers: [PeopleService]
})
export class OnboardingOne {
  icons: string[];
  user: any;
  rangeVal : any;
  form:any;
  gender: string;
  fullName:string;
  dob:string;
  email:string;
  ent:any;
  pr:any;
  designation:string;
  currentWorkplace:string;
  industry:any[] = [];
  type:string;
  skills: any[] = [];
  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public people: PeopleService, public loadingCtrl: LoadingController) {
    this.form = 'on1'
    this.rangeVal = 0
    this.skills = []
    // this.user = {
    // "uid" : "", 
    // "email" : "", 
    // "pictureUrl" : "../assets/img/faces/sid.jpg",
    // "fullName":"",
    // "dob":"",
    // "gender":"",
    // "type":"",
    // "industry":[],
    // "designation":"",
    // "currentWorkplace":"",
    // "skills":[],
    // "connections" : [], 
    // "requested" : [], 
    // "requests" : [], 
    // "lastLoginLocation" : "", 
    // "chatId" : "",
    // "rating":0,
    // "ranking":0,
    // "score":0
    // }
    
    this.user = this.navParams.data
    console.log(this.user)
    // If we navigated to this page, we will have an item available as a nav param

    // Let's populate this page with some filler content for funzies

  }
 fillIndustry(data){

   // let me = this
   // data.forEach((skill)=>{
   //   me.industry.push({"skill":skill,"rating":0})
   // })
   console.log(data,this)
  }
  selectIndustry(){
    let industryModal = this.modalCtrl.create(OnboardingTwo);
    // this.navCtrl.push(OnboardingTwo, {callback:this.fillIndustry})
    industryModal.present()
    industryModal.onDidDismiss(data => {
     this.industry = data.industryList
   });
  }
  itemTapped(event) {
    if(event.keyCode == 13)
    {
      if(this.skills.length<=2)
        {
          this.skills.push({skill:event.target.value,rating:0})
          event.target.value = ""
          console.log(this.skills)
        }
      else alert("You can add a maximum of three skills")
    }
      
  }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      spinner:"crescent",
      content: 'Configuring account..Please wait...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      window.location.reload()
    }, 2000);
    
  }
  removeHobby(index){
    console.log(index)
    this.skills.splice(index,1)
  }
  removeIndustry(index){
    console.log(index)
    this.industry.splice(index,1)
  }
  nextClick(){
    if(this.form==='on1')
    {
      this.user.fullName = this.fullName
      this.user.dob = this.dob
      this.user.gender = this.gender
      this.user.email = this.email
      this.form = 'on2'
      this.rangeVal = 40
    }
    else if(this.form==='on2')
    {
      this.user.designation = this.designation
      this.user.industry = this.industry
      this.user.type = this.ent?"entrepreneur":"professional"
      this.user.designation = this.designation
      this.user.currentWorkplace = this.currentWorkplace
      this.form= 'on3'
      this.rangeVal = 80 
    }
    else
      {
        this.user.skills = this.skills
        console.log(this.user)
        this.people.sendData(this.user,(response)=>{
          console.log(response)
          this.storage.ready()
          .then(()=>{
            this.storage.set('currentUser',JSON.stringify(this.user))
            this.presentLoadingDefault()
          })
        })
        this.rangeVal = 100
      }
    
    // this.navCtrl.push(OnboardingTwo, {
    //   item: 40,
    //   userObject : JSON.stringify(this.user)
    // });
  }
}
