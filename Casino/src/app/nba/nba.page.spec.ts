import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbaPage } from './nba.page';

describe('NbaPage', () => {
  let component: NbaPage;
  let fixture: ComponentFixture<NbaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NbaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
