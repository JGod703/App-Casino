import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BjinfoPage } from './bjinfo.page';

describe('BjinfoPage', () => {
  let component: BjinfoPage;
  let fixture: ComponentFixture<BjinfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BjinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
