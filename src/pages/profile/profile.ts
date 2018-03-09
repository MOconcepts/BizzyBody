import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController, LoadingController, Loading, ToastController, Platform } from 'ionic-angular';

import { AuthService } from "../../providers/auth-service";
import { RestProvider } from '../../providers/rest/rest';
import { Common } from "../../providers/common";
import { PopoverController} from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { GhotsProvider } from '../../providers/ghots/ghots'; 

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {

  @ViewChild("updatebox") updatebox;
  public userDetails: any;
  public resposeData: any;
  public dataSet: any;
  public noRecords: boolean;
  lastImage: string = null;
  loading: Loading;
  userPostData = {
    user_id: "",
    token: ""
  };

  usr: any;
  evnt: any;
  lent: any;
  lentIn: any;
  lentff: any;
  lentffMe: any;
  evntIn: any;
  ffMe: any;
  Iff: any;

  public profile_segment:string;

  constructor(
    public popoverCtrl: PopoverController, 
    private camera: Camera, 
    private transfer: Transfer, 
    private file: File, 
    private filePath: FilePath, 
    public actionSheetCtrl: ActionSheetController, 
    public toastCtrl: ToastController, 
    public platform: Platform,
    private iab: ThemeableBrowser, 
		private _ghotsPrv: GhotsProvider,
    public common: Common,
    public authService: AuthService,
    public restProvider: RestProvider,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {  
      const data = JSON.parse(localStorage.getItem("userData"));
      this.userDetails = data.userData;
      this.userPostData.token = this.userDetails.token;
      this.usr = this.userDetails.user_id;

      this._setLoaded()
      this.reload();
      
      this.myEvents();
      this.myCheckIn();
      this.Ifollow();
      this.followingMe();
      // this.lnt = this.evnt.length;
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
  newFileName =  "Usr_" + this.usr + "_" + n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;


  // Destination URL
  var url = "http://bizzybody.ng/appUpload.php";
 
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
 
  // File name only
  var filename = this.lastImage;
 
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };
 
  const fileTransfer: TransferObject = this.transfer.create();
 
  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()
    
    this.presentToast(data+' Profile Picture has been updated.');
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.');
  });
  
  }, error => {
    this.presentToast('Error while storing file.');
  });
}
 
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}

	refresh() {
		this._setLoaded()
		this.reload();
	}
	reload() {
		this._ghotsPrv.setLoading(true)
		this._setLoaded()
	}

	private _setLoaded() {
		setTimeout(() => {
			this._ghotsPrv.setLoading(false)
		}, 8000);
	}

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create('PopPage');
    popover.present({
      ev: myEvent
    });
  }
  myEvents() {
    //this.common.presentLoading();
    this.restProvider.myEvents(this.usr)
    .then(data => {
      this.evnt = data;
      this.lent = this.evnt.length;
      this.noRecords = false
      
     // this.common.closeLoading();
      console.log(this.lent);
    })
    .catch(err => {
      console.error(err)
    });
  } 

  myCheckIn() {
    this.restProvider.myCheckIn(this.usr)
    .then(data => {
      this.evntIn = data;
      this.lentIn = this.evntIn.length;
      console.log(this.lentIn);
    })
    .catch(err => {
      console.error(err)
    });
  } 

  
  followingMe() {
    this.restProvider.followingMe(this.usr)
    .then(data => {
      this.ffMe = data;
      this.lentffMe = this.ffMe.length;
    })
    .catch(err => {
      console.error(err)
    });
  } 

  Ifollow() {
    this.restProvider.Ifollow(this.usr)
    .then(data => {
      this.Iff = data;
      this.lentff = this.Iff.length;
    })
    .catch(err => {
      console.error(err)
    });
  } 
  // Define segment for everytime when profile page is active
  ionViewWillEnter() {
    this.profile_segment = 'myEvent';
  }

  postPage() {
    this.navCtrl.push('PostPage');
  }

  public openWithInAppBrowser(url : string){
    let target = "_system";

    const options: ThemeableBrowserOptions = {
      statusbar: {
          color: '#FECB00'
      },
      toolbar: {
          height: 40,
          color: '#FECB00'
      },
      title: {
          color: '#ffffff',
          showPageTitle: true
      },
      closeButton: {
        wwwImage: 'assets/images/close.png',
        wwwImagePressed: 'assets/images/close.png',
        wwwImageDensity: 3,
          align: 'left',
          event: 'closePressed'
      },
      backButtonCanClose: true,
    
    };
   //this.iab.create(url,target,this.options);

  const browser: ThemeableBrowserObject = this.iab.create(url,target,options);
    browser.close();
} 

goToSearch() {
  this.navCtrl.parent.select(3);
} 

}
