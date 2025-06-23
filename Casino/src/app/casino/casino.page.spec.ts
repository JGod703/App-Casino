import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CasinoPage } from './casino.page';

describe('CasinoPage', () => {
  let component: CasinoPage;
  let fixture: ComponentFixture<CasinoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CasinoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
