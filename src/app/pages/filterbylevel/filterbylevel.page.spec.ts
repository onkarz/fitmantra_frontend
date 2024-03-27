import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterbylevelPage } from './filterbylevel.page';

describe('FilterbylevelPage', () => {
  let component: FilterbylevelPage;
  let fixture: ComponentFixture<FilterbylevelPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FilterbylevelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
