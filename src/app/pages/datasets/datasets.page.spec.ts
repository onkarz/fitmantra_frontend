import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatasetsPage } from './datasets.page';

describe('DatasetsPage', () => {
  let component: DatasetsPage;
  let fixture: ComponentFixture<DatasetsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DatasetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
