import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {


  dayWiseReport:any;

  constructor() { }

  ngOnInit() {
    this.dayWiseReport = JSON.parse(localStorage.getItem('daywise') || '');
    console.log(this.dayWiseReport);
  }

}
