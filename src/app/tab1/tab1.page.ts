import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GestureController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private gestureCtrl: GestureController, private router: Router) {}


  ionViewDidEnter() {
    const gesture = this.gestureCtrl.create({
      el: document.querySelector('#my-element'), // Replace 'my-element' with the ID or class of the element you want to make swipeable
      gestureName: 'swipe-right-to-left',
      onStart: () => {
        // You can add any actions you want to perform when the swipe starts

      },
      onMove: (ev) => {
        // You can add any actions you want to perform as the user is swiping
      },
      onEnd: (ev) => {
        if (ev.deltaX < -100) { // Adjust the threshold as needed
          // Swipe right detected, navigate to the new page
          this.navigateToNewPage();
        }
      },
    });
    gesture.enable();
  }


  navigateToNewPage(){
    this.router.navigate(["/posts"]);
  }

}
