import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TfmodelPage } from './tfmodel.page';

describe('TfmodelPage', () => {
  let component: TfmodelPage;
  let fixture: ComponentFixture<TfmodelPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TfmodelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
