import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CreatepostPage } from './createpost.page';

describe('CreatepostPage', () => {
  let component: CreatepostPage;
  let fixture: ComponentFixture<CreatepostPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreatepostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
