import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GymgoalsPage } from './gymgoals.page';

describe('GymgoalsPage', () => {
  let component: GymgoalsPage;
  let fixture: ComponentFixture<GymgoalsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GymgoalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
