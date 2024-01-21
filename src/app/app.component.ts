import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { IonicStorageService } from './ionicStorage';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userData: any;
  constructor(private ionStorage: IonicStorageService, private router: Router) {

    this.userData = localStorage.getItem('userData');
    console.log(this.userData);
    var userDetails = JSON.parse(this.userData);
    console.log(userDetails);
    if (this.userData != null) {
      this.router.navigate(['/tabs/tab3']);
    } else {
      this.router.navigate(['/splash']);
    }

  }
}
