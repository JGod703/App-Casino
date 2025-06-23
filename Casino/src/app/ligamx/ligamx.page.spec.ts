import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LigamxPage } from './ligamx.page';

describe('LigamxPage', () => {
  let component: LigamxPage;
  let fixture: ComponentFixture<LigamxPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LigamxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
