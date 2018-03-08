import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {AuthService} from "../../providers/auth-service";

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
  address: any;
  lat: any;
  lng: any;
  resposeID : any;

  imageURI:any;
  imageFileName:any;

  public userDetails: any;

  post = { "title": "", "what": "", "where": "", "loc": "", "start": "", "stop": "", "map": "", "lng": "", "lat": "", "tags": "", "info": "", "web": "", "phone": "", "twt": "", "fb": "", "pub": "" };


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private transfer: FileTransfer,
    private camera: Camera, private modalCtrl: ModalController, public authService: AuthService, private nativeGeocoder: NativeGeocoder, private toastCtrl:ToastController) { 
    this.address = {
    place: ''
  };
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    const data = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = data.userData;

    this.post.pub = this.userDetails.id;
    this.post.loc = this.address.place;
  }

 
  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
      this.presentToast('Image Has been added');
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  postEvent(){
    if(this.post.title){
     this.authService.postData(this.post, "postEvent").then((result) =>{
     this.resposeID = result;
     console.log(this.resposeID);
     if(this.resposeID){

      let options = {

        quality: 100
         };


    const fileTransfer: FileTransferObject = this.transfer.create();

   let options1: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.jpg',
      headers: {}
   
   }

fileTransfer.upload(this.imageURI, 'http://bizzybody.ng/rest/upload.php?id='+this.resposeID, options1)
.then((data) => {
  this.presentToast("Event Upload was successful");
  this.navCtrl.push('Profile');
}, (err) => {
  // error
  alert("error"+JSON.stringify(err));
});


   }
   else{
     this.presentToast("Event Upload was not successful");
   }
 
     }, (err) => {
       //Connection failed message
     });
    }
    else{
     this.presentToast("Add Event Title and any Other ");
    }
   
   }

  showAddressModal () {
    let modal = this.modalCtrl.create('AutocompletePage');
    let me = this;
    modal.onDidDismiss(data => {
      this.address.place = data.description;
      this.locConvert(this.address.place);
      console.log(data);
    });
    modal.present();
  }

  locConvert(loc) {

    // this.presentToast(loc);
      
      this.nativeGeocoder.forwardGeocode('loc')
    .then((coordinates: NativeGeocoderForwardResult)=>{

      this.lat = coordinates.latitude;
      this.lng = coordinates.longitude;

      this.display(this.lat, this.lat);

  }).catch((error: any) => console.log(error));
  }

  display(loc1, loc2) {

    this.presentToast('The coordinates are latitude=' + loc1 + ' and longitude=' + loc2);
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
      duration: 2000
    });
    toast.present();
  }
}
