import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TfPage } from './tf.page';

describe('TfPage', () => {
  let component: TfPage;
  let fixture: ComponentFixture<TfPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
