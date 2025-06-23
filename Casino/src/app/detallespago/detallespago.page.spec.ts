import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallespagoPage } from './detallespago.page';

describe('DetallespagoPage', () => {
  let component: DetallespagoPage;
  let fixture: ComponentFixture<DetallespagoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetallespagoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
