import { FitmantraService } from 'src/app/fitmantra.service';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { IonicStorageService } from 'src/app/ionicStorage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    lastName: any;
    email: any;
    password: any;
    confirmPassword: any;
    phone: any;
    address: any;
    firstName:any;
    public registerForm!: UntypedFormGroup;

    isEnabled!: boolean;
    isDisable!: boolean;

    photo = "one.jpg";

    constructor(
      private formBuilder: UntypedFormBuilder,
      private fitMantraService: FitmantraService,
      private router: Router,
      public toastController: ToastController,
      private ionStorage: IonicStorageService,
      private camera: Camera,
      private alertCtrl : AlertController,
      private loadingCtrl: LoadingController


    ) {}

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        firstName: new UntypedFormControl('', Validators.required),
        lastName: new UntypedFormControl('', Validators.required),
        photo: new UntypedFormControl('', Validators.required),
        password: new UntypedFormControl(
          Validators.minLength(8),
          Validators.required
        ),
        confirmPassword: new UntypedFormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        email: new UntypedFormControl('', [
          Validators.required,
          Validators.email,
        ]),
      });
    }



    async userSignUp() {
      console.log(this.registerForm.value);

      var registerModel = {
        email: this.email,
        password: this.password,
        firstname: this.firstName,
        lastname: this.lastName,
        profileImage:this.photo
      };

      console.log(registerModel);
      const loading = await this.loadingCtrl.create({
        message: 'Please Wait...',
      });
      loading.present();
      this.fitMantraService.signUp(registerModel).subscribe((res: any) => {
        this.loadingCtrl.dismiss();
        console.log(res);
        console.log('Sign up successfully', res);
        this.router.navigate(["/login"]);
      });
    }



    cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    };

    galleryOptions: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    };

    async presentAlert() {
      const alert = await this.alertCtrl.create({
        header: 'Choose photo from',
        cssClass: 'custom-alert',
        buttons: [
          {
            text: 'Camera',
            handler: () => {
              this.camera.getPicture(this.cameraOptions).then((res) => {
                let finalImage = WebView.convertFileSrc(res);
                this.photo = finalImage;
                console.log('Using camera result :', finalImage);
              });

              this.isEnabled = true;
              this.isDisable = false;
            },
          },
          {
            text: 'Gallery',
            handler: () => {
              this.camera.getPicture(this.galleryOptions).then((res) => {
                let finalImage = WebView.convertFileSrc(res);
                this.photo = finalImage;
                console.log('Using camera result :', finalImage);
              });

              this.isEnabled = false;
              this.isDisable = true;
            },
            cssClass: 'alert-button-confirm',
          },
        ],
      });

      await alert.present();
    }


    removeImage() {
      location.reload();
    }
}
