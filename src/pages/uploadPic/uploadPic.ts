import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path'; 
import { Camera } from '@ionic-native/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';
import firebase from 'firebase'
import { OnboardingOne } from '../onboarding1/on1';

declare var cordova: any;

@Component({
  selector: 'uploadPic',
  templateUrl: 'uploadPic.html'
})
export class UploadPic {
	lastImage: string = null;
  	loading: Loading;
    appUser :any;
  constructor(private localNotifications: LocalNotifications,public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
    this.appUser = this.navParams.data
    const firebaseConfig = {
    apiKey: "AIzaSyD8WClRJ9k5cFOxFJLR_Eh6ah4wPWX1suE",
    authDomain: "iris-b029c.firebaseapp.com",
    databaseURL: "https://iris-b029c.firebaseio.com",
    projectId: "iris-b029c",
    storageBucket: "iris-b029c.appspot.com",
    messagingSenderId: "1056346035559"
  }

      firebase.initializeApp(firebaseConfig);
  }
 
presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
 
  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library

    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          this.localNotifications.schedule({
			  id: 1,
			  text: 'Notifi the user someway'
			});
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}
// Create a new name for the image
createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}
getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    console.log(img.naturalWidth)
    canvas.width = img.width
    canvas.height = img.width;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img,0,0,img.width, img.height);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/jpg");
    console.log(dataURL)
    return dataURL
}
// Copy the image to a local folder
copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}
 
presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
 
// Always get the accurate path to your apps folder
pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}


uploadFirebase(){
  let loading = this.loadingCtrl.create({
    spinner:'crescent',
    content: 'One moment..!! Uploading picture'
  });
  loading.present()
  let img = document.getElementById('userPic')
  let imageStr = this.getBase64Image(img)
  let storageRef = firebase.storage().ref();
  // Create a timestamp as filename
  console.log(storageRef)
  const filename = Math.floor(Date.now() / 1000);

  // Create a reference to 'images/todays-date.jpg'
  const imageRef = storageRef.child(`${filename}.jpg`);
  console.log(imageRef)
  imageRef.putString(imageStr, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
     // Do something here when the data is succesfully uploaded!
     // alert("Set your profile picture successfully")
     let pictureUrl = "https://firebasestorage.googleapis.com/v0/b/iris-b029c.appspot.com/o/"+filename+".jpg?alt=media"
     this.appUser.pictureUrl = pictureUrl
     loading.dismiss()
     this.navCtrl.push(OnboardingOne, this.appUser, { animate: true, direction: 'forward' })
    });
}
}
