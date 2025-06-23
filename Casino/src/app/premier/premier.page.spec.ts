import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PremierPage } from './premier.page';

describe('PremierPage', () => {
  let component: PremierPage;
  let fixture: ComponentFixture<PremierPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PremierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
