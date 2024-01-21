/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FitmantraService } from 'src/app/fitmantra.service';

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.page.html',
  styleUrls: ['./datasets.page.scss'],
})
export class DatasetsPage implements OnInit {
  email: any;
  title: any;
  description: any;
  level: any;
  selectedValue: any;
  public dataSetForm!: UntypedFormGroup;
  allDataSets: any;
  dataSetId: any;
  dataSetDetails: any;
  checked!:boolean;

  constructor(
    private fmService: FitmantraService,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    public activeRouter : ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit() {
    this.activeRouter.params.subscribe((id:any)=>{
      this.dataSetId = id;
      console.log(this.dataSetId.id);
    });


    this.fmService.getDataSet(this.dataSetId.id).subscribe((data:any)=>{
      this.dataSetDetails = data;
      console.log(this.dataSetDetails.dataSet);
    })




    this.dataSetForm = this.formBuilder.group({
      title: new UntypedFormControl('', Validators.required),
      description: new UntypedFormControl('', Validators.required),
      level: new UntypedFormControl(Validators.required),

      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email,
      ]),
    });

    this.getAllDataSets();
  }

  async update() {

    console.log(this.dataSetForm.value);

    var dataSetModel = {
        title: this.dataSetDetails.dataSet.title,
        description: this.dataSetDetails.dataSet.description,
        level:this.dataSetDetails.dataSet.level,
        userEmail:this.dataSetDetails.dataSet.userEmail,
        checked:this.dataSetDetails.dataSet.checked,
    }
    console.log(dataSetModel);
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
    });
    loading.present();
    this.fmService
      .putDataSets(this.dataSetDetails.dataSet._id,dataSetModel)
      .subscribe((data: any) => {
        console.log(data);
        this.loadingCtrl.dismiss("Dataset updated successfully");
        console.log('Dataset updated successfully');
        this.router.navigate(["/gymgoals"]);
      });
  }


  getAllDataSets(){
    console.log("Method Calling");
    this.fmService.getAllData().subscribe((data:any)=>{
      this.allDataSets = data.dataSets;
      console.log(this.allDataSets);
    })
  }


  refresh(){
    location.reload();
  }
}
