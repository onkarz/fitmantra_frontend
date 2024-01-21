import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicStorageService } from '../ionicStorage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  userData: any;
  firstName: any;
  lastName: any;
  email: any;
  constructor(private ionStorage: IonicStorageService, private router: Router) {


    this.userData = localStorage.getItem('userData');

    var userData = JSON.parse(this.userData)
    console.log(userData);
    this.firstName = userData.user.firstname;
    this.lastName = userData.user.lastname;
    this.email = userData.user.email;

  }


  refresh(){
    location.reload();
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here

      this.userData = localStorage.getItem('userData');

      var userData = JSON.parse(this.userData)
      console.log(userData);
      this.firstName = userData.user.firstname;
      this.lastName = userData.user.lastname;
      this.email = userData.user.email;
      
      event.target.complete();
    }, 2000);
  }

  logout() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.userData = '';
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }


  gymGoals(){
    this.router.navigate(["/gymgoals"]);
  }

  achievements(){
    this.router.navigate(["/achievements"]);
  }

  reminders(){
    this.router.navigate(["/reminders"]);
  }

  credits(){
    this.router.navigate(["/credits"]);
  }
}
