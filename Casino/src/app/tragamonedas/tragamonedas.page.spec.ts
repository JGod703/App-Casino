import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TragamonedasPage } from './tragamonedas.page';

describe('TragamonedasPage', () => {
  let component: TragamonedasPage;
  let fixture: ComponentFixture<TragamonedasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TragamonedasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
