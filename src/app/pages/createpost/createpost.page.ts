/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { FitmantraService } from 'src/app/fitmantra.service';
import { IonicStorageService } from 'src/app/ionicStorage';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.page.html',
  styleUrls: ['./createpost.page.scss'],
})
export class CreatepostPage implements OnInit {
  email: any;
  title: any;
  description: any;
  public createPostForm!: UntypedFormGroup;
  img: any;
  isEnabled!: boolean;
  isDisable!: boolean;
  userData: any;
  authorName: any;
  authorEmail: any;
  authorId: any;

  image = 'one.jpg';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private fitMantraService: FitmantraService,
    private router: Router,
    public toastController: ToastController,
    private ionStorage: IonicStorageService,
    private webView: WebView,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private ds: DomSanitizer
  ) {
    this.userData = localStorage.getItem('userData');

    var userData = JSON.parse(this.userData);
    console.log(userData);
    this.authorName = userData.user.firstname + '' + userData.user.lastname;
    this.authorEmail = userData.user.email;
    this.authorId = userData.user._id;

    console.log(
      'User Details',
      this.authorId,
      this.authorName,
      this.authorEmail
    );
  }

  ngOnInit() {
    this.createPostForm = this.formBuilder.group({
      img: new UntypedFormControl('', Validators.required),
      title: new UntypedFormControl(Validators.required),
      description: new UntypedFormControl('', [Validators.required]),
    });
  }

  async post() {
    var userPostModel = {
      title: this.title,
      description: this.description,
      postImage: this.img.dataUrl,
      authorName: this.authorName,
      authorEmail: this.authorEmail,
      authorId: this.authorId,
    };

    console.log(userPostModel);
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
    });
    loading.present();
    this.fitMantraService.postOfPost(userPostModel).subscribe((res: any) => {
      this.loadingCtrl.dismiss();
      console.log(res);
      console.log('Post Created Successfully', res);
      this.router.navigate(['/posts']);
    });
  }

  // cameraOptions: CameraOptions = {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.FILE_URI,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE,
  //   correctOrientation: true,
  // };

  // galleryOptions: CameraOptions = {
  //   quality: 100,
  //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //   destinationType: this.camera.DestinationType.FILE_URI,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE,
  //   correctOrientation: true,
  // };

  // async presentAlert() {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Choose photo from',
  //     cssClass: 'custom-alert',
  //     buttons: [
  //       {
  //         text: 'Camera',
  //         handler: () => {
  //           this.camera.getPicture(this.cameraOptions).then((res) => {
  //             let finalImage = this.webView.convertFileSrc(res);
  //             this.img = finalImage;
  //             console.log('Using camera result :', finalImage);
  //           });

  //           this.isEnabled = true;
  //           this.isDisable = false;
  //         },
  //       },
  //       {
  //         text: 'Gallery',
  //         handler: () => {
  //           this.camera.getPicture(this.galleryOptions).then((res) => {
  //             let finalImage = this.webView.convertFileSrc(res);
  //             this.img = finalImage;
  //             console.log('Using camera result :', finalImage);
  //           });

  //           this.isEnabled = false;
  //           this.isDisable = true;
  //         },
  //         cssClass: 'alert-button-confirm',
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }

  removeImage() {
    location.reload();
  }

  checkPlatformForWeb() {
    if (Capacitor.getPlatform() == 'web') return true;
    return false;
  }

  async getPic() {
    console.log('method calling');

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: this.checkPlatformForWeb()
        ? CameraResultType.DataUrl
        : CameraResultType.Uri,
      source: CameraSource.Prompt,
      saveToGallery: true,
    });

    this.img = image;

    if(this.checkPlatformForWeb()) this.img.webPath = image.dataUrl;

    // this.img = this.ds.bypassSecurityTrustUrl(
    //   image.webPath ? image.webPath : ''
    // );
    
    console.log(this.img);
  }

  getPicture() {
    return this.img;
  }
}
