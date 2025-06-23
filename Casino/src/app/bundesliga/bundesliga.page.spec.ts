import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BundesligaPage } from './bundesliga.page';

describe('BundesligaPage', () => {
  let component: BundesligaPage;
  let fixture: ComponentFixture<BundesligaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BundesligaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
