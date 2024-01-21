/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FitmantraService } from '../fitmantra.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  allPosts: any;

  constructor(
    private fmService: FitmantraService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  async loadPosts() {
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
    });
    loading.present();
    this.fmService.getAllPosts().subscribe((res: any) => {
      this.loadingCtrl.dismiss();
      this.allPosts = res.posts;
      console.log(this.allPosts);
    });
  }
}
