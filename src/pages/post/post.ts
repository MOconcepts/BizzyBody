import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, Loading, ModalController, ToastController, Platform  } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

declare var cordova: any;

declare var google: any;

/**
 * Generated class for the PostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  tabBarElement: any;
  resposeData: any;

  lastImage: string = null;
  loading: Loading;

  public userDetails: any;
  public post: FormGroup;

  address:any = {
    place: '',
    set: false,
};
placesService:any;
map: any;
markers = [];
placedetails: any;

latitude: number = 0;
longitude: number = 0;
eventPlace: any;
geo: any

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private camera: Camera,
    private transfer: Transfer, 
    private file: File, 
    public platform: Platform,
    private filePath: FilePath,  
    public actionSheetCtrl: ActionSheetController, 
    private modalCtrl: ModalController, 
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    private toastCtrl:ToastController,
    private _FB: FormBuilder) { 
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
      const data = JSON.parse(localStorage.getItem("userData"));
      this.userDetails = data.userData;
    this.post	 = _FB.group({
      'title'       : ['', Validators.required],
      'what'        : ['', Validators.required],
      'where'       : ['', Validators.required],
      'timeStarts'  : ['', Validators.required],
      'timeStops'   : [''],
      'about'       : [''],
      'web'         : [''],
      'phone'       : [''],
      'twt'         : [''],
      'fb'          : [''],
      'place'       : [''],
      'lng'         : [''],
      'lat'         : [''],
      'map'         : [''],
      'pub'         : ['']
   });
  }
 
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        // {
        //   text: 'Use Camera',
        //   handler: () => {
        //     this.takePicture(this.camera.PictureSourceType.CAMERA);
        //   }
        // },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  public takePicture(sourceType) {
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
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  "BB_" + n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}
 
// private presentToast(text) {
//   let toast = this.toastCtrl.create({
//     message: text,
//     duration: 3000,
//     position: 'top'
//   });
//   toast.present();
// }
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}

public postEvent(){
  // Destination URL
  var url = "https://bizzybody.ng/appSubmitEvent.php";
 
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
 
  // File name only
  var filename = this.lastImage;
 
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : this.post.value
  };
 
  const fileTransfer: TransferObject = this.transfer.create();
 
  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.resposeData = JSON.stringify(data);
    this.loading.dismissAll()
    this.presentToast('Event Upload was successful and awaiting approval');
    this.navCtrl.parent.select(4);
  }, err => {
    this.loading.dismissAll()
    this.presentToast("Event Upload was not successful");
  });
}

  showAddressModal () {
    let modal = this.modalCtrl.create('AutocompletePage');
    let me = this;
    modal.onDidDismiss(data => {
      this.address.place = data;
      
    this.geo = this.address.place;
    this.geoCode(this.geo);//convert Address to lat and long
    });
    modal.present();
  }

  //convert Address string to lat and long
  geoCode(address:any) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
    this.latitude = results[0].geometry.location.lat();
    this.longitude = results[0].geometry.location.lng();
    this.eventPlace = results[0].formatted_address;
   });
 }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 8000
    });
    toast.present();
  }
}
