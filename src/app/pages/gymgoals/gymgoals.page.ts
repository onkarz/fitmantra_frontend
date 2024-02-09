import { map } from 'rxjs/operators';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FitmantraService } from 'src/app/fitmantra.service';

@Component({
  selector: 'app-gymgoals',
  templateUrl: './gymgoals.page.html',
  styleUrls: ['./gymgoals.page.scss'],
})
export class GymgoalsPage implements OnInit {
  public progress = 0;
  allDataSets: any;
  checkboxValues: any = [];
  selectedValues: any = [];
  userData: any;
  firstName: any;
  lastName: any;
  email: any;
  userId: any;
  level: any;
  filteredLevels: any;
  selectedLevel: any;
  isdataSetChecked: boolean = false;
  collection: any;
  singleDayWiseWorkout: any;
  myTillWorkOut: any = [];

  constructor(private fmService: FitmantraService, public router: Router) {
    setInterval(() => {
      this.progress += 0.01;

      // Reset the progress bar when it reaches 100%
      // to continuously show the demo
      if (this.progress > 1) {
        setTimeout(() => {
          this.progress = 0;
        }, 1000);
      }
    }, 50);

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
    this.getDataSetsByItsUserID();
    // this.loadPreferences();
  }

  getAllDataSets() {
    console.log('Method Calling');
    this.fmService.getAllData().subscribe((data: any) => {
      this.allDataSets = data.dataSets;
      console.log(this.allDataSets);
    });
  }

  schedule() {
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
    });

    // this.savePreferences();
  }

  getDataSetsByItsUserID() {
    this.fmService.getDataSetByUserID(this.userId).subscribe((data: any) => {
      console.log(data.dayWise);

      data.dayWise.map((data: any) => {
        this.collection = data.dayWiseWorkout;
        this.collection.map((data: any[]) => {
          this.singleDayWiseWorkout = data;
          console.log(this.singleDayWiseWorkout);
          this.fmService
            .getDataSetByID(this.singleDayWiseWorkout)
            .subscribe((data: any) => {
              console.log(data);

              this.myTillWorkOut.push(data.dataSet);
              console.log(this.myTillWorkOut);
            });
        });
      });
      // let dayWiseReport = data.dayWise.dayWiseWorkout.map((data: any) => {
      //   return data;
      // });

      // console.log(dayWiseReport);
    });
  }

  // getDataSetsById(){
  //   this.fmService.getDataSetByUserID(this.userId).subscribe((data:any)=>{
  //     console.log(data);
  //   })
  // }

  likeBlog(id: any) {
    console.log(id);
    var DWModel = {
      authorId: this.userId,
      authorEmail: this.email,
      dayWiseWorkout: this.selectedValues,
    };

    if (!this.isdataSetChecked) {
      this.fmService.postDayWiseWorkout(DWModel).subscribe((res: any) => {
        console.log('Checked', res);
        this.isdataSetChecked = true;
        let dayWise = this.allDataSets.map((data: any) => {
          if (data._id == id) {
            data = res.dataSet;
            console.log(data);
          }
          return data;
        });
        console.log('DayWise Workout', dayWise);
        this.allDataSets = dayWise;
      });
    } else {
      this.fmService.postDayWiseWorkout(DWModel).subscribe((res: any) => {
        console.log('UnChecked', res);
        this.isdataSetChecked = false;
        let dayWise = this.allDataSets.map((data: any) => {
          if (data._id == id) {
            data = res.dataSet;
            console.log(data);
          }
          return data;
        });
        console.log('Blogs', dayWise);
        this.allDataSets = dayWise;
      });
    }
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

  printSelectedValues() {
    console.log('Selected Values:', this.selectedValues);
  }

  update(id: any) {
    this.router.navigate(['/datasets', id]);
  }

  refresh() {
    location.reload();
  }

  loadPreferences() {
    this.fmService.getUserPreferences(this.userId).subscribe((preferences) => {
      this.selectedValues = preferences.checkboxValues;
      console.log(this.selectedValues);
    });
  }

  savePreferences() {
    this.fmService
      .saveUserPreferences(this.userId, this.selectedValues)
      .subscribe(() => {
        console.log('Preferences saved successfully');
      });
  }

  filterByLevel(level: any) {
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
}
