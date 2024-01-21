/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { FitmantraService } from 'src/app/fitmantra.service';
import { IonicStorageService } from 'src/app/ionicStorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'], 
})
export class LoginPage implements OnInit {
  email: any;
  password: any;

  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', Validators.required),
  });
  userData: any;

  constructor(
    private router: Router,
    public formbuilder: UntypedFormBuilder,
    private fitService: FitmantraService,
    private ionStorage: IonicStorageService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit(): void {}

  async userSignIn() {
    console.log(this.loginForm.value);

    var loginModel = {
        email:this.email,
        password:this.password
    }
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',

    });

    loading.present();
    this.fitService.signIn(loginModel).subscribe((res: any) => {
      console.log('Sign In successfully', res);
      loading.dismiss();
      this.userData = res;
      console.log(this.userData);
      localStorage.setItem('userData', JSON.stringify(this.userData));
      this.router.navigate(['/tabs/tab3']);
    });
  }

  addLocalStorage() {
    this.ionStorage.store('userData', this.userData).then((res) => {
      this.fitService.sendMessage({ fitMantraLoggedInUser: this.userData });
      this.router.navigate(['/tabs/tab3']);
    });
  }
}
