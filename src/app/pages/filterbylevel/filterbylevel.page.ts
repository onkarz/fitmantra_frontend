/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FitmantraService } from 'src/app/fitmantra.service';

@Component({
  selector: 'app-filterbylevel',
  templateUrl: './filterbylevel.page.html',
  styleUrls: ['./filterbylevel.page.scss'],
})
export class FilterbylevelPage implements OnInit {
  selectedLevel: any;
  filteredLevels: any;
  allDataSets: any;
  level: any;
  userData: any;
  firstName: any;
  lastName: any;
  email: any;
  userId: any;
  checkboxValues: any = [];
  selectedValues: any = [];
  showLevelStatus!: boolean;

  constructor(private fmService: FitmantraService, public router: Router) {
    this.userData = localStorage.getItem('userData');

    var userData = JSON.parse(this.userData);
    console.log(userData);
    this.firstName = userData.user.firstname;
    this.lastName = userData.user.lastname;
    this.email = userData.user.email;
    this.userId = userData.user._id;
  }

  ngOnInit() {
    this.getAllDataSets();
    this.showLevelStatus = false;
  }

  filterByLevel(level: any) {
    this.showLevelStatus = true;
    console.log(level.detail.value);
    this.selectedLevel = level.detail.value;
    console.log(this.selectedLevel);
    this.filteredLevels = this.allDataSets.filter(
      (level: any) => level.level === this.selectedLevel
    );
    console.log(this.filteredLevels);

    this.level = level;
    console.log(this.level);
  }

  getAllDataSets() {
    console.log('Method Calling');
    this.fmService.getAllData().subscribe((data: any) => {
      this.allDataSets = data.dataSets;
      console.log(this.allDataSets);
    });
  }


  schedule(){
    console.log(
      'AuthorId',
      'DayWise Workout',
      this.userId,
      this.selectedValues
    );

    var DWModel = {
      authorId: this.userId,
      authorEmail: this.email,
      dayWiseWorkout: this.selectedValues,
    };

    console.log(DWModel);

    // localStorage.setItem('daywise', JSON.stringify(this.selectedValues));

    // this.router.navigate(["/schedule"]);

    this.fmService.postDayWiseWorkout(DWModel).subscribe((res: any) => {
      console.log(res);

      this.router.navigate(["/gymgoals"]);
    });

    // this.savePreferences();
  }



  updateSelectedValues(option: any) {
    if (option.checked == true) {
      this.selectedValues.push(option);
      console.log(this.selectedValues);
    } else if (option.checked == false) {
      const index = this.selectedValues.indexOf(option);
      console.log(index);

      if (index !== -1) {
        this.selectedValues.splice(index, 1);
      }

      console.log(this.selectedValues);
    } else {
      this.selectedValues = this.selectedValues.filter(
        (value: any) => value.id !== option.id
      );
    }
  }
}
