import { TfService } from './../../tf.service';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import * as tf from '@tensorflow/tfjs';


@Component({
  selector: 'app-tfmodel',
  templateUrl: './tfmodel.page.html',
  styleUrls: ['./tfmodel.page.scss'],
})
export class TfmodelPage implements OnInit {
  img: any;
  userData: any;

  constructor(private tf: TfService) {


    this.userData = localStorage.getItem('userData');

    var userData = JSON.parse(this.userData)
    console.log(userData);


   }

  ngOnInit() {
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


  removeImage(){
    location.reload();
  }


  async detectObjects() {



    const imageElement = new Image();
    imageElement.src = this.img;
    console.log(this.img.dataUrl);



    if (!this.img) {
      console.error('No image captured');
      return;
    }



    const tensor = tf.browser.fromPixels(this.img.webPath);

    // Now you can do further processing with the tensor
    // For example, you can resize the image
    const resizedTensor = tf.image.resizeBilinear(tensor, [300, 300]);

    // You can convert the tensor to a NumPy-like array using tensor.array()
    const arrayData = resizedTensor.array();

    console.log(arrayData);

    // Do something with the processed data...

    // Remember to dispose of tensors when you're done to free up resources
    tensor.dispose();
    resizedTensor.dispose();

    await this.tf.loadModel();
    const results = await this.tf.detectObjects(this.img.dataUrl);



    console.log('Object detection results:', results);

    // Process the results and update the UI as needed
  }

}
