import { Injectable } from '@angular/core';
import * as cocoSsd from '@tensorflow-models/coco-ssd';


@Injectable({
  providedIn: 'root'
})
export class TfService {

  constructor() { }


  private model: any;

  async loadModel() {
    this.model = await cocoSsd.load();
  }

  async detectObjects(imageElement: HTMLImageElement) {
    return this.model.detect(imageElement);
  }
}
